/**
 * Создаёт изолированное хранилище задач в замыкании.
 *
 * Форма задачи: `{ id: number, title: string, completed: boolean }`.
 *
 * Требования:
 * - начальные данные нельзя изменять;
 * - `getTasks()` возвращает массив и объекты, изменение которых снаружи
 *   не меняет внутреннее состояние;
 * - `addTask(title)` обрезает внешние пробелы, добавляет незавершённую задачу
 *   и возвращает её копию;
 * - пустой заголовок вызывает TypeError;
 * - id новой задачи равен максимальному существующему id + 1;
 *   для пустого хранилища первый id равен 1;
 * - `toggleTask(id)` переключает completed и возвращает true;
 *   для неизвестного id возвращает false;
 * - `removeTask(id)` удаляет задачу и возвращает true;
 *   для неизвестного id возвращает false;
 * - два созданных хранилища не разделяют состояние.
 *
 * @param {Array<{ id: number, title: string, completed: boolean }>} initialTasks
 */
export function createTaskStore(initialTasks = []) {
  let tasks = initialTasks.map((task) => ({ ...task }));

  function getTasks() {
    return tasks.map((task) => ({ ...task }));
  }

  function addTask(title) {
    const trimTitle = String(title).trim();

    if (trimTitle === "") {
      throw new TypeError("Task title cannot be empty");
    }

    const maximumId = tasks.reduce((currentMaximum, task) => {
      return Math.max(currentMaximum, task.id);
    }, 0);

    const nextId = maximumId + 1;

    const newTask = {
      id: nextId,
      title: trimTitle,
      completed: false,
    };

    tasks = [...tasks, newTask];

    return { ...newTask };
  }

  function toggleTask(id) {
    const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists) {
      return false;
    }

    tasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        completed: !task.completed,
      };
    });

    return true;
  }

  function removeTask(id) {
    const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists) {
      return false;
    }

    tasks = tasks.filter((task) => task.id !== id);

    return true;
  }

  return { getTasks, addTask, toggleTask, removeTask };
}

/* 
1. Выше прописал как будет храниться tasks.
2. Выше прописал как будет храниться tasks.
3. ...spread
4. Отдельная функция через filter, где будет проработана ситуация с пустым массивом.
5. getTasks(), addTask(title), removeTask(id), toggleTask(id)
6. обновлять внутренний массив иммутабельно: addTask, toggleTask, removeTask, а getTasks просто значение
7. getTasks()` возвращает массив и объекты, addTask(title)`добавляет незавершённую задачу и возвращает её копию,
    toggleTask(id) возвращает true, а для неизвестного id возвращает false, removeTask(id)` удаляет задачу и возвращает true;
 *   для неизвестного id возвращает false;
8. Главная функция должна вернуть публичный API:
{
  getTasks,
  addTask,
  toggleTask,
  removeTask
}
*/
