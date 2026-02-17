import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import TestGenerator from "./pages/TestGenerator";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("test")}>Test Generator</button>
      </div>

      {page === "dashboard" && <Dashboard />}
      {page === "test" && <TestGenerator />}
    </div>
  );
}

export default App;