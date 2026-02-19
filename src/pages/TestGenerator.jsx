import { useState } from "react";

export default function TestGenerator() {
  const [code, setCode] = useState("");
  const [framework, setFramework] = useState("Jest + React Testing Library");
  const [generated, setGenerated] = useState("");

  function handleGenerate() {
    if (!code.trim()) {
      setGenerated("// Please paste component code first.");
      return;
    }

    const sample = `
import { render, screen } from '@testing-library/react'
import Component from './Component'

describe('Component Tests', () => {

  test('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText(/sample/i)).toBeInTheDocument()
  })

  test('handles user interaction', () => {
    render(<Component />)
    // Add fireEvent here
  })

  test('handles edge cases', () => {
    render(<Component />)
    // Add validation test
  })

})
`;

    setGenerated(sample);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Test Generator</h1>
        <p className="mt-1 text-sm text-slate-600">
          Paste component code and generate test cases (AI-simulated).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Paste your component code
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-3 h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
            placeholder="Paste code here..."
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              <option>Jest + React Testing Library</option>
              <option>Vitest + Testing Library</option>
            </select>

            <button
              onClick={handleGenerate}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Generate Tests
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Coverage Goal
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">75%</div>
          <div className="mt-3 h-3 w-full rounded-full bg-slate-100">
            <div className="h-3 w-[75%] rounded-full bg-slate-900" />
          </div>
        </div>
      </div>

      {generated && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            AI Generated Test File
          </div>
          <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}