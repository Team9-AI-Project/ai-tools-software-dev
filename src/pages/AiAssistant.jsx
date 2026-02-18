import { useState } from "react";

export default function AiAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    const aiMessage = {
      type: "ai",
      text: "AI Assistant (Simulated): This is a placeholder response based on your query."
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate-600">
          Simulated AI workflow demonstrating ChatGPT and Copilot assistance.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
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
            placeholder="Ask something about coding, testing, or documentation..."
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
