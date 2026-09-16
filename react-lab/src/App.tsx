import './App.css'
import { Timer } from './exercises/timer/Timer'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>Timer</h1>
        <p>
          Practice state, effects, cleanup, and functional state updates.
        </p>
      </header>

      <Timer />
    </main>
  )
}

export default App
