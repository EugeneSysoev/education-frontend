import "./App.css";
import { KanbanBoard } from "./exercises/kanban/KanbanBoard";


function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>KanbanBoard</h1>
        <p>Доска задач</p>
      </header>

      <KanbanBoard />
    </main>
  );
}

export default App;
