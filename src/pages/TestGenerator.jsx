export default function TestGenerator() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Test Generator</h1>
        <p className="mt-1 text-sm text-slate-600">
          Paste component code and generate test cases (UI prototype).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Paste your component code</div>
          <textarea
            className="mt-3 h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
            placeholder="Paste code here..."
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
              <option>Jest + React Testing Library</option>
              <option>Vitest + Testing Library</option>
            </select>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Generate Tests
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Coverage Goal</div>
          <div className="mt-3 text-3xl font-bold text-slate-900">70%</div>
          <div className="mt-3 h-3 w-full rounded-full bg-slate-100">
            <div className="h-3 w-[70%] rounded-full bg-slate-900" />
          </div>

          <div className="mt-5 text-sm font-semibold text-slate-900">Test Plan</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            <li>✅ renders correctly</li>
            <li>✅ handles edge cases</li>
            <li>✅ validates inputs</li>
            <li>✅ tests error states</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">AI Generated Test File</div>
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Copy
          </button>
        </div>
        <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
{`import { render, screen } from '@testing-library/react'\nimport Login from './Login'\n\ntest('renders login form', () => {\n  render(<Login />)\n  expect(screen.getByText(/login/i)).toBeInTheDocument()\n})\n`}
        </pre>
      </div>
    </div>
  );
}