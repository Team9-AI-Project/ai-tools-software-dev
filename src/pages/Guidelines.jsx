import React from "react";
function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
          : "rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      }
    >
      {children}
    </button>
  );
}

export default function Guidelines() {
  const [tab, setTab] = React.useState("dos");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Guidelines</h1>
        <p className="mt-1 text-sm text-slate-600">
          Do’s, Don’ts, security notes and prompt examples for AI-assisted development.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <Tab active={tab === "dos"} onClick={() => setTab("dos")}>Do’s</Tab>
          <Tab active={tab === "donts"} onClick={() => setTab("donts")}>Don’ts</Tab>
          <Tab active={tab === "security"} onClick={() => setTab("security")}>Security & Privacy</Tab>
          <Tab active={tab === "prompts"} onClick={() => setTab("prompts")}>Prompt Examples</Tab>
        </div>

        <div className="mt-5">
          {tab === "dos" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Ask AI for explanations and alternatives, not just final code.</li>
              <li>✅ Review and understand outputs before using them.</li>
              <li>✅ Add tests and documentation after changes.</li>
            </ul>
          )}

          {tab === "donts" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li>❌ Do not copy code blindly without understanding.</li>
              <li>❌ Avoid sharing secrets, tokens, or private data with AI tools.</li>
              <li>❌ Don’t rely on AI for final architectural decisions alone.</li>
            </ul>
          )}

          {tab === "security" && (
            <ul className="space-y-2 text-sm text-slate-700">
              <li>🔒 Never paste API keys or passwords into chat prompts.</li>
              <li>🔒 Validate dependencies and review license/security implications.</li>
              <li>🔒 Use code review and testing before merging changes.</li>
            </ul>
          )}

          {tab === "prompts" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Good Prompt</div>
                <p className="mt-2 text-sm text-slate-700">
                  “Refactor this React component to reduce re-renders. Explain the changes and add unit tests.”
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Bad Prompt</div>
                <p className="mt-2 text-sm text-slate-700">
                  “Write the whole project for me.”
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}