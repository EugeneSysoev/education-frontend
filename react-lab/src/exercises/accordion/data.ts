import type { AccordionItemData } from './Accordion'

export const accordionItems: readonly AccordionItemData[] = [
  {
    id: 'state',
    title: 'What should be stored in state?',
    content:
      'Store the smallest amount of information required to describe the current UI.',
  },
  {
    id: 'props',
    title: 'Why pass event handlers as props?',
    content:
      'A child can report an interaction while the component that owns the state decides how it changes.',
  },
  {
    id: 'identity',
    title: 'Why do list items need stable keys?',
    content:
      'Keys let React match items between renders and preserve the correct component identity.',
  },
]

