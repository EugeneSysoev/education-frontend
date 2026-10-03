import { useState } from "react";
import type { Task } from "./type";
import { todos } from "./data";
import { TaskColumn } from "./TaskColumn";
import { AddTaskForm } from "./AddTaskForm";
import { DragDropProvider } from "@dnd-kit/react";
import { TrashZone } from "./TrashZone";

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(todos);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: text,
      status: "todo",
    };
    setTasks((prevTask) => [...prevTask, newTask]);
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        if (!source || !target) return;

        if (target.id === "trash") {
          setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== source.id),
          );
          return;
        }

        const nextStatus = target.id;

        if (
          nextStatus !== "todo" &&
          nextStatus !== "in-progress" &&
          nextStatus !== "done"
        ) {
          return;
        }

        setTasks((currentTasks) =>
          currentTasks.map((task) => {
            if (task.id === source.id) {
              return { ...task, status: nextStatus };
            }
            return task;
          }),
        );
      }}
    >
      <AddTaskForm onAddTask={handleAddTask} />

      <TaskColumn
        title="Предстоит выполнить"
        status="todo"
        tasks={tasks.filter((task) => task.status === "todo")}
      />
      <TaskColumn
        title="В процессе выполнения"
        status="in-progress"
        tasks={tasks.filter((task) => task.status === "in-progress")}
      />
      <TaskColumn
        title="Готово"
        status="done"
        tasks={tasks.filter((task) => task.status === "done")}
      />
      <TrashZone />
    </DragDropProvider>
  );
}
