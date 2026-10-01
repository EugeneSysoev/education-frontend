/**
 * Создаёт изолированный трекер результатов в замыкании.
 *
 * Запись результата: `{ player: string, points: number }`.
 *
 * Требования:
 * - не изменять initialScores и его объекты;
 * - `getScores()` возвращает защитные копии массива и записей;
 * - `addScore(player, points)` обрезает внешние пробелы имени,
 *   добавляет запись и возвращает её копию;
 * - пустое имя вызывает TypeError;
 * - points должен быть конечным неотрицательным числом, иначе TypeError;
 *
 *
 * - `getTotal(player)` возвращает сумму очков игрока или 0;
 *
 * - `getLeaderboard()` возвращает `{ player, total }` для каждого игрока,
 *   сортирует по total по убыванию, а при равенстве — по player;
 *
 * - два созданных трекера не разделяют состояние.
 *
 * @param {Array<{ player: string, points: number }>} initialScores
 */
export function createScoreTracker(initialScores = []) {
  let scores = initialScores.map((iScore) => ({ ...iScore }));

  function getScores() {
    return scores.map((score) => ({ ...score }));
  }

  function addScore(player, points) {
    if (points < 0 || !Number.isFinite(points)) {
      throw new TypeError("points должен быть конечным неотрицательным числом");
    }

    const trimPlayer = player.trim();

    if (trimPlayer === "") {
      throw new TypeError(`player не может быть пустой строкой`);
    }

    const newPlayer = { player: trimPlayer, points: points };

    scores = [...scores, newPlayer];

    return { ...newPlayer };
  }

  function getTotal(player) {
    return scores.reduce((total, score) => {
      if (score.player === player) {
        return total + score.points;
      }

      return total;
    }, 0);
  }

  function getLeaderboard() {
    const players = [...new Set(scores.map((score) => score.player))];

    return players
      .map((player) => {
        return {
          player,
          total: getTotal(player),
        };
      })
      .toSorted((first, second) => {
        if (first.total - second.total !== 0) {
          return second.total - first.total;
        }

        return first.player.localeCompare(second.player);
      });
  }

  return {
    getScores,
    addScore,
    getTotal,
    getLeaderboard,
  };
}
