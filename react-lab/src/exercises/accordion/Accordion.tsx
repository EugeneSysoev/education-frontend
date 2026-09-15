export type AccordionItemData = {
  id: string
  title: string
  content: string
}

type AccordionProps = {
  items: readonly AccordionItemData[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <section className="exercise-card" aria-labelledby="accordion-heading">
      <h2 id="accordion-heading">Starter data loaded: {items.length} panels</h2>
      <p>
        Read <code>src/exercises/accordion/README.md</code>, then replace this
        placeholder with your implementation.
      </p>
    </section>
  )
}

