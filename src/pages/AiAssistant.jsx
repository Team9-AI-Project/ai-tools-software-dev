import { useMemo, useState } from "react";

/* ---------- UI helpers ---------- */
function Bubble({ side, children }) {
  const isUser = side === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-start" : "justify-end"}`}>
      {isUser ? <div className="h-9 w-9 rounded-2xl bg-slate-200" /> : null}
      <div
        className={
          "max-w-xl rounded-2xl px-4 py-3 text-sm whitespace-pre-line " +
          (isUser ? "bg-slate-100 text-slate-800" : "bg-slate-900 text-white")
        }
      >
        {children}
      </div>
      {!isUser ? <div className="h-9 w-9 rounded-2xl bg-slate-900" /> : null}
    </div>
  );
}

function Chip({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </div>
  );
}

/* ---------- Task auto-detection ---------- */
function detectTaskFromText(text) {
  const t = text.toLowerCase();

  if (t.includes("test") || t.includes("jest") || t.includes("rtl")) {
    return "Testing";
  }
  if (t.includes("readme") || t.includes("doc") || t.includes("documentation")) {
    return "Documentation";
  }
  if (t.includes("error") || t.includes("bug") || t.includes("fix")) {
    return "Debugging";
  }
  return "Coding";
}

/* ---------- AI logic (PDF-aligned) ---------- */
function makeResponse({ tool, userText }) {
  const t = userText.toLowerCase();
  const task = detectTaskFromText(userText);

  /* ===== ChatGPT ===== */
  if (tool === "ChatGPT") {
    // --- Documentation with context awareness ---
    if (task === "Documentation") {
      if (t.includes("module") || t.includes("allows") || t.includes("assistant")) {
        return (
          "## AI Assistant\n\n" +
          "### Overview\n" +
          "AI Assistant is a UI prototype demonstrating how AI tools such as ChatGPT and GitHub Copilot can support software development tasks including coding, testing, debugging, and documentation.\n\n" +
          "### Setup & Run\n" +
          "1. Clone the repository\n" +
          "2. Run `npm install`\n" +
          "3. Start the app with `npm run dev`\n\n" +
          "### Features\n" +
          "- AI-assisted coding guidance\n" +
          "- Test case generation support\n" +
          "- Documentation and README assistance\n" +
          "- Role-based UI prototype\n\n" +
          "### Team Contributions\n" +
          "- Abdul: AI Assistant logic & UI\n" +
          "- Motiar: Testing workflow\n" +
          "- Masrur: Documentation & guidelines\n" +
          "- Bappi: Dashboard & UI polish\n"
        );
      }

      return (
        "ChatGPT (Docs): I can help write a clean README section:\n" +
        "- Overview (what/why)\n" +
        "- Setup & run steps\n" +
        "- Features\n" +
        "- Team contributions\n\n" +
        "Tell me the module name and what it does."
      );
    }

    // --- Testing ---
    if (task === "Testing") {
      const variants = [
        "ChatGPT (Testing): Identify key behaviors first. Write Jest + React Testing Library tests for rendering, interactions, and error handling. Mock API calls where needed.",
        "ChatGPT (Testing): A solid test strategy includes render tests, interaction tests, and edge case validation using mocks.",
        "ChatGPT (Testing): Focus on user-visible behavior. Add tests for valid input, invalid input, and failure scenarios."
      ];
      return variants[Math.floor(Math.random() * variants.length)];
    }

    // --- Debugging ---
    if (task === "Debugging") {
      return (
        "ChatGPT (Debugging): Share the error message and related code.\n" +
        "I will explain the root cause, suggest fixes, and recommend a small regression test."
      );
    }

    // --- Coding (default) ---
   // --- Coding (default) ---
if (
  t.includes("goal") ||
  t.includes("re-render") ||
  t.includes("performance") ||
  t.includes("cleaner")
) {
  return (
    "ChatGPT (Coding): Based on your goal, here are practical suggestions:\n" +
    "- Use React.memo for pure components\n" +
    "- Avoid inline functions inside JSX\n" +
    "- Check dependency arrays in useEffect\n" +
    "- Split large components into smaller ones\n\n" +
    "These steps help reduce unnecessary re-renders and improve code clarity."
  );
}

return (
  "ChatGPT (Coding): I can review and improve your code by:\n" +
  "1) Refactoring for readability\n" +
  "2) Reducing duplication\n" +
  "3) Improving performance\n" +
  "4) Suggesting basic tests and documentation updates\n\n" +
  "If you share a snippet, I can give more specific suggestions."
);

}

  /* ===== GitHub Copilot ===== */
  if (task === "Testing") {
    return (
      "Copilot (Testing):\n" +
      "- Create Component.test.jsx\n" +
      "- Add render(), screen queries, fireEvent\n" +
      "- Cover render, interaction, and error cases"
    );
  }

  if (task === "Documentation") {
    return (
      "Copilot (Docs):\n" +
      "- Insert README template\n" +
      "- Add concise inline comments\n" +
      "- Keep examples short and reusable"
    );
  }

  if (task === "Debugging") {
    return (
      "Copilot (Debugging):\n" +
      "- Add guard clauses\n" +
      "- Check undefined/null values\n" +
      "- Write a minimal reproduction test"
    );
  }

  return (
    "Copilot (Coding):\n" +
    "- Extract helper functions\n" +
    "- Improve naming\n" +
    "- Add early returns\n" +
    "- Review suggestions before accepting"
  );
}

/* ---------- Main component ---------- */
export default function AiChat() {
  const [tool, setTool] = useState("ChatGPT");
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      side: "ai",
      text:
        "Welcome! This prototype demonstrates AI-assisted software development using ChatGPT and GitHub Copilot.\n" +
        "Just type your task — the system will automatically adapt."
    }
  ]);

  const quickPrompts = useMemo(
    () => [
      "Refactor this React component",
      "Generate unit test cases",
      "Write a README section",
      "I am getting an undefined error"
    ],
    []
  );

  function addUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { id: Date.now(), side: "user", text: trimmed }]);
    setInput("");

    const reply = makeResponse({ tool, userText: trimmed });
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, side: "ai", text: reply }]);
    }, 300);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate-600">
          PDF-aligned prototype demonstrating AI-assisted coding, testing, debugging, and documentation.
        </p>
      </div>

      <Panel title="Tool Mode">
        <div className="flex gap-2">
          {["ChatGPT", "GitHub Copilot"].map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={
                tool === t
                  ? "rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                  : "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              }
            >
              {t}
            </button>
          ))}
        </div>
      </Panel>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-4 p-5">
          {messages.map((m) => (
            <Bubble key={m.id} side={m.side}>
              {m.text}
            </Bubble>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map((p) => (
              <Chip key={p} onClick={() => addUserMessage(p)}>
                {p}
              </Chip>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addUserMessage(input)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
              placeholder="Describe your task…"
            />
            <button
              onClick={() => addUserMessage(input)}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
