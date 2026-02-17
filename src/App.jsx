import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import TestGenerator from "./pages/TestGenerator";

function App() {
  const [page, setPage] = useState("dashboard");

   return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex gap-4 p-4">
        <button
          onClick={() => setPage("dashboard")}
          className="rounded bg-slate-900 px-4 py-2 text-white"
        >
          Dashboard
        </button>
        <button
          onClick={() => setPage("test")}
          className="rounded bg-slate-700 px-4 py-2 text-white"
        >
          Test Generator
        </button>
      </div>

      <div className="p-6">
        {page === "dashboard" && <Dashboard />}
        {page === "test" && <TestGenerator />}
      </div>
    </div>
  );
}

export default App;