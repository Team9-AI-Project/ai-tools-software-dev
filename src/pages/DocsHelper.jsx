export default function DocsHelper() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Docs Helper</h1>
        <p className="mt-1 text-sm text-slate-600">
          Generate README / architecture documentation text (UI prototype).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Select document type</div>
          <select className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            <option>README Section</option>
            <option>Installation Steps</option>
            <option>Architecture Overview</option>
            <option>Component Documentation</option>
          </select>

          <div className="mt-4 text-sm font-semibold text-slate-900">Short input</div>
          <textarea
            className="mt-3 h-36 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
            placeholder="Describe what you want to document..."
          />

          <button className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Generate Markdown
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Markdown Preview</div>
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Copy
            </button>
          </div>

          <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
{`## Overview\nThis prototype demonstrates an AI-assisted workflow for coding, testing, and documentation.\n\n## Key Features\n- AI Chat for assistance\n- Test Generator UI\n- Guidelines for responsible AI use\n`}
          </pre>
        </div>
      </div>
    </div>
  );
}