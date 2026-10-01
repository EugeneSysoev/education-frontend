/**
 * Иммутабельно меняет тему одного пользователя.
 *
 * Требования:
 * - если пользователь не найден, вернуть исходный массив по той же ссылке;
 * - если тема уже совпадает, вернуть исходный массив по той же ссылке;
 * - при изменении вернуть новый массив;
 * - создать новые объекты только для изменённого пользователя и его settings;
 * - сохранить ссылки на всех остальных пользователей;
 * - не изменять входные данные.
 *
 * @param {Array<{
 *   id: number,
 *   name: string,
 *   settings: { theme: string, language: string }
 * }>} users
 * @param {number} userId
 * @param {string} theme
 */

export function updateUserTheme(users, userId, theme) {
  const userWithId = users.find((user) => user.id === userId);

  if (!userWithId) {
    return users;
  }

  if (userWithId.settings.theme === theme) {
    return users;
  }

  return users.map((user) => {
    if (user.id !== userId) {
      return user;
    }

    return {
      ...user,
      settings: {
        ...user.settings,
        theme,
      },
    };
  });
}
