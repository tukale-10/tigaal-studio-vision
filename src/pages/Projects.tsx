import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { X, ArrowUpRight, Briefcase, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  client: string | null;
  description: string;
  category: string;
  status: string;
}

const Projects = () => {
  const [tab, setTab] = useState<"past" | "current">("past");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setAllProjects((data as Project[]) || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const pastProjects = allProjects.filter(p => p.status === "Completed");
  const currentProjects = allProjects.filter(p => p.status === "Active");
  const projects = tab === "past" ? pastProjects : currentProjects;

  const stats = [
    { label: "Completed Projects", value: "60+" },
    { label: "Active Engagements", value: currentProjects.length.toString() },
    { label: "Partner Organizations", value: "15+" },
    { label: "Sectors Covered", value: "6" },
  ];

  return (
    <main>
      <PageHero title="Our Projects" subtitle="Tailored solutions to complex development challenges." breadcrumb="Projects" />

      {/* Stats */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <span className="text-accent font-semibold tracking-[0.15em] uppercase text-sm mb-4 block">Portfolio</span>
                <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-foreground leading-tight">
                  Driving <span className="text-accent italic">Impact</span> Across Somalia
                </h2>
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Our projects span governance, climate resilience, financial inclusion, strategic communications, and monitoring & evaluation — each tailored to address Somalia's unique development challenges.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-secondary border border-border rounded-sm p-6 lg:p-8 text-center">
                  <p className="font-display text-3xl lg:text-4xl text-accent mb-2">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Project List */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 mb-10">
              <button
                onClick={() => setTab("past")}
                className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-sm transition-all ${tab === "past" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <Briefcase size={16} /> Past Projects (60+)
              </button>
              <button
                onClick={() => setTab("current")}
                className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-sm transition-all ${tab === "current" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <TrendingUp size={16} /> Current ({currentProjects.length})
              </button>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-secondary rounded-sm animate-pulse" />)}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative bg-secondary border border-border rounded-sm p-10 lg:p-12 cursor-pointer hover:border-accent/30 transition-all duration-500"
                  >
                    <span className="absolute top-6 right-8 font-display text-5xl lg:text-6xl text-foreground/[0.03] group-hover:text-accent/10 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative z-10">
                      <span className="text-accent text-xs font-semibold tracking-[0.15em] uppercase">{project.category}</span>
                      {tab === "current" && (
                        <span className="ml-3 inline-flex items-center gap-1.5 text-xs text-emerald-400">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Active
                        </span>
                      )}
                      <h3 className="font-display text-xl lg:text-2xl text-foreground mt-3 mb-3 leading-snug group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.client && <p className="text-muted-foreground text-sm mb-4">Client: {project.client}</p>}
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex items-center gap-2 mt-6 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                        View Details <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-background border border-border rounded-sm max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 bg-accent" />
            <div className="p-10 lg:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-accent text-xs font-semibold tracking-[0.15em] uppercase">{selectedProject.category}</span>
                  <h2 className="font-display text-2xl lg:text-3xl text-foreground mt-2 leading-snug">{selectedProject.title}</h2>
                  {selectedProject.subtitle && <p className="text-muted-foreground mt-2 text-lg">{selectedProject.subtitle}</p>}
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground p-2"><X size={20} /></button>
              </div>
              {selectedProject.client && (
                <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                  <strong className="text-foreground">Client:</strong> {selectedProject.client}
                </p>
              )}
              <p className="text-lg text-muted-foreground leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
