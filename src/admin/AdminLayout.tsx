import { Navigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthProvider";
import {
  LayoutDashboard, Settings, Users, FileText, Newspaper,
  BookOpen, Briefcase, FolderKanban, LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/tigaal-logo.webp";

const sidebarLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/services", icon: Briefcase, label: "Services" },
  { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/news", icon: Newspaper, label: "News & Updates" },
  { to: "/admin/publications", icon: BookOpen, label: "Publications" },
  { to: "/admin/users", icon: Settings, label: "Users" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--primary))] flex items-center justify-center">
        <div className="text-[hsl(var(--primary-foreground))]/60 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-[#0c1222] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/5">
          <img src={logo} alt="TIGAAL" className="h-8 brightness-0 invert" />
          <p className="text-white/30 text-xs mt-2 tracking-wider uppercase">Content Manager</p>
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
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="text-white/40 text-xs mb-3 truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-red-400 transition-colors w-full"
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
        <header className="sticky top-0 z-30 bg-[#0c1222]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 p-2">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            {sidebarLinks.find(l => location.pathname.startsWith(l.to))?.label || "Admin"}
          </div>
          <a href="/" target="_blank" rel="noopener" className="text-xs text-white/30 hover:text-[hsl(var(--accent))] transition-colors flex items-center gap-1">
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
