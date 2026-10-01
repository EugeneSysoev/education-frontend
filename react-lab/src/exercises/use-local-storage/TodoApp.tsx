import { useState, type SubmitEvent } from "react";
import useLocalStorage from "./useLocalStorage";

type Todo = {
  id: string;
  title: string;
};

const TODOS_STORAGE_KEY = "react-practice.todos";

const initialTodos: Todo[] = [
  { id: "read-task", title: "Read the exercise requirements" },
];

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    TODOS_STORAGE_KEY,
    initialTodos,
  );
  const [draft, setDraft] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = draft.trim();

    if (!title) {
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title },
    ]);
    setDraft("");
  }

  function removeTodo(todoId: string) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    );
  }

  return (
    <section className="exercise-card todo-app" aria-labelledby="todo-heading">
      <div>
        <h2 id="todo-heading">Todo list</h2>
        <p className="exercise-note">
          Список автоматически сохраняется и восстанавливается после reload.
        </p>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo-title">Новая задача</label>
        <div className="todo-form-row">
          <input
            id="todo-title"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Например, написать псевдокод"
          />
          <button type="submit">Добавить</button>
        </div>
      </form>

      {todos.length === 0 ? (
        <p>Список пуст.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button type="button" onClick={() => removeTodo(todo.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
