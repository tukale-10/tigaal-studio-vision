import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, FolderKanban, Users, Newspaper, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  services: number;
  projects: number;
  team: number;
  news: number;
  publications: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, team: 0, news: 0, publications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [s, p, t, n, pub] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("news_updates").select("id", { count: "exact", head: true }),
        supabase.from("publications").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        services: s.count ?? 0,
        projects: p.count ?? 0,
        team: t.count ?? 0,
        news: n.count ?? 0,
        publications: pub.count ?? 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Services", count: stats.services, icon: Briefcase, to: "/admin/services", color: "from-blue-500/20 to-blue-600/5" },
    { label: "Projects", count: stats.projects, icon: FolderKanban, to: "/admin/projects", color: "from-emerald-500/20 to-emerald-600/5" },
    { label: "Team Members", count: stats.team, icon: Users, to: "/admin/team", color: "from-purple-500/20 to-purple-600/5" },
    { label: "News & Updates", count: stats.news, icon: Newspaper, to: "/admin/news", color: "from-amber-500/20 to-amber-600/5" },
    { label: "Publications", count: stats.publications, icon: BookOpen, to: "/admin/publications", color: "from-rose-500/20 to-rose-600/5" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display text-white mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Manage your website content</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className={`group relative bg-gradient-to-br ${card.color} border border-white/5 rounded-lg p-6 hover:border-white/10 transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/40 text-sm mb-1">{card.label}</p>
                  <p className="text-3xl font-display text-white">{card.count}</p>
                </div>
                <card.icon className="text-white/10 group-hover:text-white/20 transition-colors" size={32} />
              </div>
              <div className="flex items-center gap-1 mt-4 text-xs text-white/30 group-hover:text-[hsl(var(--accent))] transition-colors">
                Manage <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
