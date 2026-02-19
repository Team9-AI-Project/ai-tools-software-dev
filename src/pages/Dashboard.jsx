export default function Dashboard() {
  return (
   <div className="grid gap-4 md:grid-cols-3">
  <div className="rounded-2xl bg-white p-5 shadow-sm border">
    <div className="text-sm text-slate-600">Modules Completed</div>
    <div className="text-2xl font-bold text-slate-900">4</div>
  </div>

  <div className="rounded-2xl bg-white p-5 shadow-sm border">
    <div className="text-sm text-slate-600">Active Development</div>
    <div className="text-2xl font-bold text-slate-900">AI Assistant</div>
  </div>

  <div className="rounded-2xl bg-white p-5 shadow-sm border">
    <div className="text-sm text-slate-600">Team Members</div>
    <div className="text-2xl font-bold text-slate-900">4</div>
  </div>
</div>

  );
}