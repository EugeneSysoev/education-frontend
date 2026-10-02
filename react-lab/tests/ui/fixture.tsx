import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { HackerNewsApp } from '../../src/exercises/hacker-news/HackerNewsApp';

// Test-only entry: use the actual component and API functions with controlled responses.
const scenario = new URLSearchParams(location.search).get('scenario') ?? 'retry';
let listRequests = 0;
let completedDetails = 0;
let mounted = true;
const ids = Array.from({ length: 10 }, (_, index) => index + 1);
const pause = (milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const requestLog = document.createElement('p');
requestLog.setAttribute('aria-label', 'Запросы списка');
document.body.append(requestLog);
const detailLog = document.createElement('p');
if (scenario === 'unmount') document.body.append(detailLog);

globalThis.fetch = async (input) => {
  const url = String(input);
  if (url.endsWith('/topstories.json')) {
    listRequests += 1;
    requestLog.textContent = `Запросов списка: ${listRequests}`;
    await pause(200);
    if (scenario === 'empty') return json([]);
    if (scenario === 'retry' && listRequests === 1) return json(null, 503);
    if (scenario === 'invalid') return json({ ids });
    return json(ids);
  }
  const id = Number(url.match(/\/item\/(\d+)\.json$/)?.[1]);
  if (!ids.includes(id)) throw new Error(`Unexpected fixture request: ${url}`);
  await pause(id === 10 ? (scenario === 'unmount' ? 15000 : 2500) : 100);
  completedDetails += 1;
  detailLog.textContent = `Завершено деталей: ${completedDetails}`;
  if (scenario === 'item-error' && id === 3) return json(null, 500);
  const story = { id, score: id + 1000, title: `Проверочная публикация ${id}`, by: `author-${id}` };
  return json(id === 2 ? story : { ...story, url: `https://example.com/story/${id}` });
};

const client = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
const root = createRoot(document.getElementById('root')!);
const render = () => root.render(
  <QueryClientProvider client={client}>
    {mounted ? <HackerNewsApp /> : <p>Компонент размонтирован</p>}
  </QueryClientProvider>,
);
if (scenario === 'unmount') {
  const button = document.createElement('button');
  button.textContent = 'Размонтировать';
  button.onclick = () => { mounted = false; render(); };
  document.body.append(button);
}
render();
