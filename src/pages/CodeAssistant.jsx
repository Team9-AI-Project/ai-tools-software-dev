import { useMemo, useState } from "react";

function Panel({ title, children, right }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        {right}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function detectLanguage(code) {
  const t = code.toLowerCase();
  if (t.includes("import react") || t.includes("useeffect") || t.includes("jsx")) return "React";
  if (t.includes("function") || t.includes("const") || t.includes("let")) return "JavaScript";
  return "Code";
}

function buildRefactorOutput(code) {
  const lang = detectLanguage(code);
  return (
    `// AI Refactor Suggestions (${lang})\n` +
    `// 1) Extract helper functions to reduce duplication\n` +
    `// 2) Improve naming for clarity (e.g., handleSubmit, isLoading)\n` +
    `// 3) Add early returns to simplify branching\n` +
    `// 4) Keep components small: split UI + logic\n\n` +
    `// Example refactor idea:\n` +
    `// - Move inline logic into a separate function\n` +
    `// - Convert repeated UI blocks into a reusable component\n`
  );
}

function buildCommentsOutput(code) {
  const lang = detectLanguage(code);
  return (
    `// AI Comment Suggestions (${lang})\n` +
    `// Add comments only where it helps future readers.\n\n` +
    `// Suggested comment locations:\n` +
    `// - Explain why (not what) for tricky conditions\n` +
    `// - Document assumptions (e.g., input validation rules)\n` +
    `// - Add a short summary above complex functions\n\n` +
    `// Example:\n` +
    `// NOTE: We debounce search input to reduce API calls.\n` +
    `// NOTE: This state is derived from props; keep it in sync.\n`
  );
}

function buildPerformanceOutput(code) {
  const lang = detectLanguage(code);
  const isReact = code.toLowerCase().includes("useeffect") || code.toLowerCase().includes("react");
  return (
    `// AI Performance Suggestions (${lang})\n` +
    `// 1) Avoid unnecessary re-renders\n` +
    `// 2) Memoize expensive computations\n` +
    `// 3) Keep state minimal and colocate it\n\n` +
    (isReact
      ? `// React-specific:\n// - Use React.memo for pure components\n// - useMemo/useCallback for stable references\n// - Avoid setting state in loops\n`
      : `// General:\n// - Remove redundant computations inside loops\n// - Prefer early returns and guard clauses\n`) +
    `\n// Quick checklist:\n// - Is this computation repeated every render?\n// - Can we derive this value instead of storing it?\n`
  );
}

export default function CodeAssistant() {
  const [code, setCode] = useState("");
  const [active, setActive] = useState("refactor"); // default active
  const [output, setOutput] = useState(
    `// Example suggestion output\n// Paste code above and pick an action.`
  );
  const [error, setError] = useState("");

  const placeholder = useMemo(() => {
    return `Paste JavaScript/React code here...\n\nExample:\nfunction add(a, b) {\n  return a + b;\n}`;
  }, []);

  function handleAction(type) {
    if (!code.trim()) {
      setError("Please paste some code first.");
      setOutput("");
      return;
    }

    setError("");
    setActive(type);

    if (type === "refactor") setOutput(buildRefactorOutput(code));
    if (type === "comments") setOutput(buildCommentsOutput(code));
    if (type === "performance") setOutput(buildPerformanceOutput(code));
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Code Assistant</h1>
        <p className="mt-1 text-sm text-slate-600">
          Paste code to get AI suggestions for refactoring, comments, and performance improvements (UI prototype).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Paste your code">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-64 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
            placeholder={placeholder}
          />

          {error ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleAction("refactor")}
              className={
                "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                (active === "refactor"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
              }
            >
              Refactor
            </button>

            <button
              onClick={() => handleAction("comments")}
              className={
                "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                (active === "comments"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
              }
            >
              Add Comments
            </button>

            <button
              onClick={() => handleAction("performance")}
              className={
                "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                (active === "performance"
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
              }
            >
              Improve Performance
            </button>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Tip: Use a small snippet for demo (10–30 lines) so the output looks clear.
          </div>
        </Panel>

        <Panel
          title="AI Suggestions"
          right={
            <button
              onClick={copyOutput}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Copy
            </button>
          }
        >
          <pre className="max-h-[340px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {output || "// No output yet"}
          </pre>
        </Panel>
      </div>
    </div>
  );
}