import test from 'node:test';
import assert from 'node:assert/strict';
import { setImmediate as nextTurn } from 'node:timers/promises';
import {
  getStory,
  getTopStories,
} from '../src/exercises/hacker-news/api.ts';

const rankedIds = [42, 17, 91, 8, 66, 24, 75, 39, 10, 58, 99, 100];
const selectedIds = rankedIds.slice(0, 10);
const json = (value, status = 200) => new Response(JSON.stringify(value), { status });
const story = (id) => ({ id, score: id + 1000, title: `Story ${id}`, by: `author-${id}`, url: `https://example.com/${id}` });
const isList = (url) => String(url).endsWith('/topstories.json');
const itemId = (url) => Number(String(url).match(/\/item\/(\d+)\.json$/)?.[1]);
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
};

test('dependent stages, first ten, parallel details, complete result, ranked order and score mapping', async (t) => {
  const listGate = deferred();
  const allStarted = deferred();
  const detailGates = new Map();
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    calls.push(String(url));
    if (isList(url)) return listGate.promise;
    const id = itemId(url);
    const gate = deferred();
    detailGates.set(id, gate);
    if (detailGates.size === 10) allStarted.resolve();
    return gate.promise;
  });
  let finished = false;
  const loading = getTopStories();
  const observed = loading.then((result) => { finished = true; return result; });
  assert.equal(calls.length, 1, 'details must wait for identifiers');
  listGate.resolve(json(rankedIds));
  await allStarted.promise;
  assert.deepEqual([...detailGates.keys()], selectedIds, 'all ten details start before any completes');
  for (const id of selectedIds.slice(1).reverse()) detailGates.get(id).resolve(json(story(id)));
  await nextTurn();
  assert.equal(finished, false, 'nine completed requests must not resolve the list');
  detailGates.get(selectedIds[0]).resolve(json(story(selectedIds[0])));
  const result = await observed;
  assert.deepEqual(result.map((item) => item.id), selectedIds);
  assert.deepEqual(result.map((item) => item.score), selectedIds.map((id) => id + 1000));
  assert.deepEqual(result.map((item) => item.url), selectedIds.map((id) => story(id).url));
  assert.equal(calls.length, 11);
});

test('empty list succeeds without requesting details', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url) => { calls.push(url); return json([]); });
  assert.deepEqual(await getTopStories(), []);
  assert.equal(calls.length, 1);
});

test('HTTP failure of the identifier list rejects the load', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => json(null, 503));
  await assert.rejects(getTopStories(), /503/);
});

test('non-array identifiers and non-number identifiers are rejected', async (t) => {
  for (const invalid of [null, { ids: [1] }, [1, '2']]) {
    const mocked = t.mock.method(globalThis, 'fetch', async () => json(invalid));
    await assert.rejects(getTopStories());
    mocked.mock.restore();
  }
});

test('one null item rejects the whole list', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (isList(url)) return json(selectedIds);
    const id = itemId(url);
    return json(id === 91 ? null : story(id));
  });
  await assert.rejects(getTopStories(), /not valid/);
});

test('HTTP failure of one detail rejects the whole list', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (isList(url)) return json(selectedIds);
    const id = itemId(url);
    return json(story(id), id === 91 ? 500 : 200);
  });
  await assert.rejects(getTopStories(), /500/);
});

test('absent URL is accepted and a present non-string URL is rejected', async (t) => {
  const noUrl = { id: 7, score: 1007, title: 'Text story', by: 'author-7' };
  const mocked = t.mock.method(globalThis, 'fetch', async () => json(noUrl));
  assert.deepEqual(await getStory(7), noUrl);
  mocked.mock.restore();
  t.mock.method(globalThis, 'fetch', async () => json({ ...noUrl, url: 42 }));
  await assert.rejects(getStory(7), /Invalid story url/);
});

test('missing required fields and incorrect field types are rejected', async (t) => {
  for (const invalid of [{ id: 7 }, { ...story(7), score: '1007' }, { ...story(7), title: null }, { ...story(7), by: 42 }]) {
    const mocked = t.mock.method(globalThis, 'fetch', async () => json(invalid));
    await assert.rejects(getStory(7));
    mocked.mock.restore();
  }
});

test('malformed JSON rejects the load', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{broken', { status: 200 }));
  await assert.rejects(getTopStories(), SyntaxError);
});
