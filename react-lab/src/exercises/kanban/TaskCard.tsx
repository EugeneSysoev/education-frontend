import { useDraggable } from "@dnd-kit/react";
import type { Task } from "./type";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { ref } = useDraggable({ id: task.id });

  return (
    <li>
      <button type="button" ref={ref}>
        {task.title}
      </button>
    </li>
  );
}
