/**
 * Параллельно загружает независимые необязательные виджеты.
 *
 * Требования:
 * - вызвать все load-функции, не ожидая завершения предыдущих;
 * - дождаться завершения всех операций, включая отклонённые;
 * - вернуть объект `{ successful, failed }`;
 * - successful содержит `{ name, data }` для успешных загрузок;
 * - failed содержит `{ name, error }` для неуспешных загрузок;
 * - сохранить исходный порядок загрузчиков внутри обеих групп;
 * - пустой массив возвращает две пустые группы.
 *
 * @param {Array<{ name: string, load: () => Promise<unknown> }>} loaders
 * @returns {Promise<{
 *   successful: Array<{ name: string, data: unknown }>,
 *   failed: Array<{ name: string, error: unknown }>
 * }>}
 */
export async function loadOptionalWidgets(loaders) {
  const promises = loaders.map((loader) => loader.load());

  const results = await Promise.allSettled(promises);

  const groupedResults = {
    successful: [],
    failed: [],
  };

  results.forEach((result, index) => {
    const name = loaders[index].name;

    if (result.status === "fulfilled") {
      groupedResults.successful.push({
        name,
        data: result.value,
      });
    } else {
      groupedResults.failed.push({
        name,
        error: result.reason,
      });
    }
  });

  return groupedResults;
}
