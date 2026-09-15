import './App.css'
import { Accordion } from './exercises/accordion/Accordion'
import { accordionItems } from './exercises/accordion/data'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>Accordion</h1>
        <p>
          Stage A: independent panels. Stage B: lift state so only one panel can
          be open.
        </p>
      </header>

      <Accordion items={accordionItems} />
    </main>
  )
}

export default App

