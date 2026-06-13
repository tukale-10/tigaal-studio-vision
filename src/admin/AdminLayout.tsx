import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthProvider";
import {
  LayoutDashboard, Settings, Users, FileText, Newspaper,
  BookOpen, Briefcase, FolderKanban, LogOut, Menu, X, ChevronRight, Mail, GitBranch
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/tigaal-logo.webp";

const sidebarLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/pipeline", icon: GitBranch, label: "Pipeline Mgt" },
  { to: "/admin/services", icon: Briefcase, label: "Services" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/news", icon: Newspaper, label: "News & Updates" },
  { to: "/admin/publications", icon: BookOpen, label: "Publications" },
  { to: "/admin/contacts", icon: Mail, label: "Contact Forms" },
  { to: "/admin/users", icon: Settings, label: "Users" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-slate-200">
          <img src={logo} alt="TIGAAL" className="h-8" />
          <p className="text-slate-400 text-xs mt-2 tracking-wider uppercase">Content Manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="text-slate-500 text-xs mb-3 truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 p-2">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            {sidebarLinks.find(l => location.pathname.startsWith(l.to))?.label || "Admin"}
          </div>
          <a href="/" target="_blank" rel="noopener" className="text-xs text-slate-400 hover:text-[hsl(var(--accent))] transition-colors flex items-center gap-1">
            View Site <ChevronRight size={12} />
          </a>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
