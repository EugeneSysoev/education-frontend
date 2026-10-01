import "./App.css";
import { TodoApp } from "./exercises/use-local-storage/TodoApp";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>Persistent Todo</h1>
        <p>Build a reusable hook that synchronizes React state with localStorage.</p>
      </header>

      <TodoApp />
    </main>
  );
}

export default App;
