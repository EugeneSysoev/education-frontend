import { useState } from "react";

export type AccordionItemData = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: readonly AccordionItemData[];
};

type PanelProps = {
  id: string;
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function Accordion({ items }: AccordionProps) {
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);

  const handleToggle = (panelId: string) => {
    setOpenPanelId((currentOpenPanelId) => {
      if (currentOpenPanelId === panelId) {
        return null;
      }

      return panelId;
    });
  };

  return (
    <section className="exercise-card">
      {items.map((item) => (
        <Panel
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={openPanelId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </section>
  );
}

function Panel({ id, title, content, isOpen, onToggle }: PanelProps) {
  const contentId = `accordion-content-${id}`;

  return (
    <section>
      <h2>{title}</h2>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {isOpen ? "Hide" : "Show"}
      </button>

      {isOpen ? <p id={contentId}>{content}</p> : null}
    </section>
  );
}

/* План для Stage B:
Accordion хранит openPanelId
→ сравнивает openPanelId с item.id
→ передаёт результат в Panel как isOpen
→ Panel вызывает onToggle
→ Accordion изменяет openPanelId */
