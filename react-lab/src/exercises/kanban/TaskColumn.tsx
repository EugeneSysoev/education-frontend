import { useDroppable } from "@dnd-kit/react";
import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "./type";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  const { ref } = useDroppable({ id: status });

  return (
    <section ref={ref} style={{ minHeight: 120 }}>

      <h2>{title}</h2>
      <ul>
        {tasks.map((todo) => (
          <TaskCard key={todo.id} task={todo} />
        ))}
      </ul>
    </section>
  );
}
