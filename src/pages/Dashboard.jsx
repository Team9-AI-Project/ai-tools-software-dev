import { commits, testSummary } from "../data/mockData";

function StatCard({ title, desc, buttonText, goTo }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{desc}</div>

      <button
        onClick={() => goTo?.(buttonText)}
        className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        {buttonText}
      </button>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="text-base font-semibold text-slate-900">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function Dashboard({ goTo }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Quick overview of AI-assisted development, testing, and documentation.
        </p>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Code Refactoring Tips"
          desc="Ask the AI for refactoring ideas and explanations."
          buttonText="AI Chat"
          goTo={goTo}
        />
        <StatCard
          title="Generate Test Cases"
          desc="Create tests for components (prototype/demo)."
          buttonText="Test Generator"
          goTo={goTo}
        />
        <StatCard
          title="Doc Writing Help"
          desc="Generate README / architecture text (prototype/demo)."
          buttonText="Docs Helper"
          goTo={goTo}
        />
      </div>

      {/* Bottom panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Recent Commits">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Commit</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {commits.map((c, i) => (
                  <tr key={i} className="text-slate-700">
                    <td className="px-4 py-3">{c.msg}</td>
                    <td className="px-4 py-3">{c.author}</td>
                    <td className="px-4 py-3">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Test Summary">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-700">Passed Tests</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{testSummary.passed}
             </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-700">Failed Tests</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{testSummary.failed}
             </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <div className="font-semibold text-slate-700">Coverage</div>
              <div className="font-semibold text-slate-900">{testSummary.coverage}%
             </div>
            </div>
            <div className="mt-2 h-3 w-full rounded-full bg-slate-100">
             <div
            className="h-3 rounded-full bg-slate-900"
            style={{ width: `${testSummary.coverage}%` }}
            />
            </div>
          </div>
        </Panel>
      </div>

      {/* Notes */}
      <Panel title="Project Notes">
        <p className="text-sm text-slate-700">
          Working on AI-assisted features for our web app. Focus on code quality,
          testing workflow, and documentation improvements.
        </p>

        <button
          onClick={() => goTo?.("Guidelines")}
          className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View Guidelines
        </button>
      </Panel>
    </div>
  );
}