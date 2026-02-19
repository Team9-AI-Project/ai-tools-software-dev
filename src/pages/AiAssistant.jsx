import { useState } from "react";

function detectTask(text) {
  const t = text.toLowerCase();

  if (t.includes("test") || t.includes("jest")) return "testing";
  if (t.includes("readme") || t.includes("doc")) return "documentation";
  if (t.includes("error") || t.includes("bug")) return "debugging";

  return "coding";
}

function generateResponse(tool, text) {
  const task = detectTask(text);

  const responses = {
    ChatGPT: {
      coding: [
        "ChatGPT: Consider refactoring into smaller components and improving naming clarity.",
        "ChatGPT: Focus on readability and reducing duplication.",
        "ChatGPT: Add prop validation and error handling for better robustness."
      ],
      testing: [
        "ChatGPT: Write render tests, interaction tests, and edge case validation.",
        "ChatGPT: Mock API calls and verify user-visible behavior.",
        "ChatGPT: Ensure accessibility queries are used in tests."
      ],
      documentation: [
        "ChatGPT: Add Overview, Setup, Features, and Contribution sections.",
        "ChatGPT: Keep documentation concise and structured.",
        "ChatGPT: Include copy-paste ready examples."
      ],
      debugging: [
        "ChatGPT: Check console errors and validate state changes.",
        "ChatGPT: Add guard clauses to prevent undefined errors.",
        "ChatGPT: Reproduce the bug with minimal test case."
      ]
    },
    Copilot: {
      coding: [
        "Copilot: Extract helper function.",
        "Copilot: Rename variable for clarity.",
        "Copilot: Suggest early return pattern."
      ],
      testing: [
        "Copilot: Create Component.test.jsx file.",
        "Copilot: Add basic render test.",
        "Copilot: Add interaction test snippet."
      ],
      documentation: [
        "Copilot: Insert README template snippet.",
        "Copilot: Add inline comments.",
        "Copilot: Generate markdown section."
      ],
      debugging: [
        "Copilot: Add console.log temporarily.",
        "Copilot: Check null/undefined input.",
        "Copilot: Add minimal reproduction test."
      ]
    }
  };

  const options = responses[tool][task];
  return options[Math.floor(Math.random() * options.length)];
}

export default function AiAssistant() {
  const [tool, setTool] = useState("ChatGPT");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSend() {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    const aiMsg = {
      type: "ai",
      text: generateResponse(tool, input)
    };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate-600">
          Simulated AI-assisted workflow (no real API integration).
        </p>
      </div>

      {/* Tool Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setTool("ChatGPT")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
            tool === "ChatGPT"
              ? "bg-slate-900 text-white"
              : "bg-white border border-slate-200 text-slate-700"
          }`}
        >
          ChatGPT
        </button>

        <button
          onClick={() => setTool("Copilot")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
            tool === "Copilot"
              ? "bg-slate-900 text-white"
              : "bg-white border border-slate-200 text-slate-700"
          }`}
        >
          GitHub Copilot
        </button>
      </div>

      {/* Chat Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-sm ${
                msg.type === "user"
                  ? "bg-slate-100 text-slate-800"
                  : "bg-slate-900 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Ask about coding, testing, docs, or debugging..."
          />
          <button
            onClick={handleSend}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
