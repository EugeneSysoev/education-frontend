import "./App.css";
import { HackerNewsApp } from "./exercises/hacker-news/HackerNewsApp";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>HackerNewsApp</h1>
        <p>Десять популярных публикаций.</p>
      </header>

      <HackerNewsApp />
    </main>
  );
}

export default App;
