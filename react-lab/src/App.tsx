import "./App.css";
import { HolidaysApp } from "./exercises/holidays-app/HolidaysApp";

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">React Practice Sprint</p>
        <h1>HolidaysApp</h1>
        <p>Practice server state, API requests, and query caching.</p>
      </header>

      <HolidaysApp />
    </main>
  );
}

export default App;
