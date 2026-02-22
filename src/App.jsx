import { useEffect, useState } from "react";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import TestGenerator from "./pages/TestGenerator";
import DocsHelper from "./pages/DocsHelper";
import AiAssistant from "./pages/AiAssistant";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [role, setRole] = useState("Developer");

    useEffect(() => {
    if (!canAccess(page, role)) {
      setPage("Dashboard");
    }
  }, [page, role]);

 function canAccess(pageName, roleName) {
  if (pageName === "Docs Helper") return roleName === "Doc Writer" || roleName === "Developer" || roleName === "Admin";
  if (pageName === "Test Generator") return roleName === "Tester" || roleName === "Developer" || roleName === "Admin";
  // Dashboard, AI Chat, Guidelines are open to all roles
  return true;
}
  

  function renderPage() {
    if (page === "AI Chat") return <AiAssistant />;
    if (page === "Test Generator") return <TestGenerator />;
    if (page === "Docs Helper") return <DocsHelper />;

    return <Dashboard goTo={(p) => setPage(p)} />;
  }

  return (
    <AppLayout
  currentPage={page}
  onChangePage={(next) => {
  if (canAccess(next, role)) setPage(next);
  else setPage("Dashboard");
}}

  role={role}
  onChangeRole={setRole}
>
      {renderPage()}
    </AppLayout>
  );
}