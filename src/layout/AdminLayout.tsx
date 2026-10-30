import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getToken } from "../token/token";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-[#00000080]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full w-[260px] bg-[#111827]">
            <Sidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 overflow-y-auto p-[20px] md:p-[32px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
