export default function AppLayout({ currentPage, onChangePage, role, onChangeRole, children }) {
  const menuItems = [
  "Dashboard",
  "AI Chat",
  ...(role === "Tester" || role === "Developer" || role === "Admin" ? ["Test Generator"] : []),
  ...(role === "Doc Writer" || role === "Developer" || role === "Admin" ? ["Docs Helper"] : []),
  ...(role === "Admin" ? ["Settings"] : []),
];


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:gap-2 md:border-r md:border-slate-200 md:bg-white md:p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white">
            <div className="h-9 w-9 rounded-xl bg-white/15" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                AI Tools Productivity
              </div>
              <div className="truncate text-xs text-white/70">
                Team 9 • UI Prototype
              </div>
            </div>
          </div>

          {/* NAV */}
          <nav className="mt-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => onChangePage(item)}
                className={
                  "w-full rounded-xl px-3 py-2 text-left text-sm font-semibold " +
                  (currentPage === item
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100")
                }
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            Role: <span className="font-semibold">{role}</span>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  {currentPage}
                </div>
                <div className="truncate text-xs text-slate-500">
                  Sprint 26 • Group 9
                </div>
              </div>

              <div className="flex items-center gap-2">
<select
  value={role}
  onChange={(e) => onChangeRole(e.target.value)}
  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
>
  <option>Developer</option>
  <option>Tester</option>
  <option>Doc Writer</option>
  <option>Admin</option>
</select>

                <div className="h-9 w-9 rounded-2xl bg-slate-900" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
