export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings (Admin)</h1>
        <p className="mt-1 text-sm text-slate-600">
          Admin-only area for role simulation and demo settings (UI prototype).
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Demo Settings</div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-700">Theme</div>
            <div className="mt-2 text-sm text-slate-600">Light (default)</div>
            <button className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Toggle Theme
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-700">Reset Demo Data</div>
            <div className="mt-2 text-sm text-slate-600">
              Clears mock messages and resets counters.
            </div>
            <button className="mt-3 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}