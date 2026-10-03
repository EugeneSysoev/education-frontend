import { useState, type SubmitEvent } from "react";

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    onAddTask(trimmedText);
    setText("");
  };

  return (
    <>
      <label htmlFor="task-title">Введите название задачи</label>

      <form onSubmit={handleSubmit}>
        <input
          id="task-title"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите название задачи..."
        />
        <button type="submit">Добавить</button>
      </form>
    </>
  );
}
