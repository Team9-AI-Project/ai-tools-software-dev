export default function CodeAssistant() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Code Assistant</h1>
        <p className="mt-1 text-sm text-slate-600">
          Paste code to get AI suggestions for refactoring and improvements (UI prototype).
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Paste your code</div>
        <textarea
          className="mt-3 h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-slate-400"
          placeholder="Paste JavaScript/React code here..."
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Refactor
          </button>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Add Comments
          </button>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Improve Performance
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">AI Suggestions</div>
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Copy
          </button>
        </div>
        <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
{`// Example suggestion output\n// - split large component into smaller components\n// - memoize heavy computations\n// - improve naming and reduce duplicate logic\n`}
        </pre>
      </div>
    </div>
  );
}