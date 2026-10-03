import { useDroppable } from "@dnd-kit/react";

export function TrashZone() {
  const { ref } = useDroppable({ id: "trash" });

  return (
    <section ref={ref} style={{ minHeight: 100, border: "2px dashed gray" }}>
      <h2>Корзина</h2>
      <p>Перетащи сюда задачу для удаления</p>
    </section>
  );
}
