/**
 * Загружает данные пользовательской панели.
 *
 * `api` содержит три асинхронных метода:
 * - `getUser(userId)`;
 * - `getPosts(userId)`;
 * - `getRecommendations(interests)`.
 *
 * Требования:
 * - сначала дождаться пользователя;
 * - после этого запустить загрузку posts и recommendations параллельно;
 * - вернуть `{ user, posts, recommendations }`;
 * - не скрывать ошибку: отклонённый API-промис должен приводить
 *   к отклонению промиса `loadDashboard` с той же ошибкой;
 * - не вызывать зависимые методы, если загрузка пользователя завершилась ошибкой.
 *
 * @param {number} userId
 * @param {{
 *   getUser: (userId: number) => Promise<{ id: number, interests: string[] }>,
 *   getPosts: (userId: number) => Promise<unknown[]>,
 *   getRecommendations: (interests: string[]) => Promise<unknown[]>
 * }} api
 */
export async function loadDashboard(userId, api) {
  const user = await api.getUser(userId);

  const [posts, recommendations] = await Promise.all([
    api.getPosts(user.id),
    api.getRecommendations(user.interests),
  ]);

  return {
    user,
    posts,
    recommendations,
  };
}

/* 
Почему getUser(userId) необходимо завершить раньше остальных вызовов? - чтобы получить данные { id: number, interests: string[] }
Какие данные пользователя нужны для двух следующих методов? 
getPosts          ← user.id
getRecommendations ← user.interests
Как запустить getPosts и getRecommendations параллельно? Promise.all
Что вернёт Promise.all и в каком порядке? в порядке как будут переданы промисы
Как получить отдельные переменные posts и recommendations из результата? деструктуризировать массив промисов
Нужно ли использовать try/catch, если требуется передать наружу ту же ошибку без изменений? не нужно
Какой объект должна вернуть loadDashboard? {
  user,
  posts,
  recommendations
}
*/
