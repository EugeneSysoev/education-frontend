import test from "node:test";
import assert from "node:assert/strict";

import { loadOptionalWidgets } from "../src/loadOptionalWidgets.js";

function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

test("starts all loaders before waiting and groups all results", async () => {
  const calls = [];
  const weather = createDeferred();
  const news = createDeferred();
  const expectedError = new Error("News unavailable");

  const resultPromise = loadOptionalWidgets([
    {
      name: "weather",
      load() {
        calls.push("weather");
        return weather.promise;
      },
    },
    {
      name: "news",
      load() {
        calls.push("news");
        return news.promise;
      },
    },
  ]);

  assert.deepEqual(calls, ["weather", "news"]);

  news.reject(expectedError);
  weather.resolve({ temperature: 24 });

  assert.deepEqual(await resultPromise, {
    successful: [{ name: "weather", data: { temperature: 24 } }],
    failed: [{ name: "news", error: expectedError }],
  });
});

test("preserves loader order inside result groups", async () => {
  const result = await loadOptionalWidgets([
    { name: "first", async load() { return 1; } },
    { name: "second", async load() { throw new Error("second failed"); } },
    { name: "third", async load() { return 3; } },
    { name: "fourth", async load() { throw new Error("fourth failed"); } },
  ]);

  assert.deepEqual(result.successful.map(({ name }) => name), ["first", "third"]);
  assert.deepEqual(result.failed.map(({ name }) => name), ["second", "fourth"]);
});

test("returns empty groups for an empty input", async () => {
  assert.deepEqual(await loadOptionalWidgets([]), { successful: [], failed: [] });
});
