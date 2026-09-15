/**
 * Возвращает краткие данные активных пользователей.
 *
 * Требования:
 * - оставить только пользователей с `active: true`; X
 * - вернуть объекты формы `{ id, fullName, age }`;
 * - `fullName` состоит из очищенных от внешних пробелов firstName и lastName; X
 * - отсортировать по возрасту по убыванию;
 * - при равном возрасте отсортировать по fullName по алфавиту;
 * - не изменять исходный массив и вложенные объекты; X
 * - пустой массив должен вернуть пустой массив. X
 *
 * @param {Array<{
 *   id: number,
 *   firstName: string,
 *   lastName: string,
 *   age: number,
 *   active: boolean
 * }>} users
 * @returns {Array<{ id: number, fullName: string, age: number }>}
 */

export function buildActiveUserSummaries(users) {
  const activeUsers = users.filter((user) => user.active === true);

  const summaries = activeUsers.map((user) => {
    const fullName = `${user.firstName.trim()} ${user.lastName.trim()}`;

    return {
      id: user.id,
      fullName,
      age: user.age,
    };
  });

  const sortedSummaries = summaries.toSorted((first, second) => { 
    const ageDifference =  second.age - first.age;

    if (ageDifference !== 0) {
      return ageDifference;
    }

    return first.fullName.localeCompare(second.fullName);
  });

  return sortedSummaries;
}
