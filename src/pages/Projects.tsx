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
      <section className="py-28 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Portfolio</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.05] tracking-tight">
                  Driving impact across Somalia.
                </h2>
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-[1.75] font-light lg:pt-8">
                Our portfolio spans governance, climate resilience, financial inclusion, strategic communications, and monitoring & evaluation — each engagement designed to answer specific questions and deliver tangible results.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-background p-8 lg:p-10 text-center">
                  <p className="font-display text-4xl lg:text-5xl text-accent mb-2 tracking-tight">{stat.value}</p>
                  <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Project List */}
      <section className="pb-28 lg:pb-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 mb-12">
              <button
                onClick={() => setTab("past")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${tab === "past" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <Briefcase size={14} /> Past Projects (60+)
              </button>
              <button
                onClick={() => setTab("current")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${tab === "current" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <TrendingUp size={14} /> Current ({currentProjects.length})
              </button>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-secondary rounded-2xl animate-pulse" />)}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative bg-background border border-border/60 rounded-2xl p-10 cursor-pointer hover:border-accent/40 hover:shadow-md transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">{project.category}</span>
                      {tab === "current" && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl text-foreground mb-3 leading-snug tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.client && <p className="text-muted-foreground text-sm mb-4 font-light">Client: {project.client}</p>}
                    <p className="text-muted-foreground leading-[1.75] font-light line-clamp-3">{project.description}</p>
                    <div className="flex items-center gap-2 mt-6 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                      View details <ArrowUpRight size={14} />
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
          <div className="bg-background border border-border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-10 lg:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">{selectedProject.category}</span>
                  <h2 className="font-display text-3xl text-foreground mt-3 leading-snug tracking-tight">{selectedProject.title}</h2>
                  {selectedProject.subtitle && <p className="text-muted-foreground mt-2 text-lg font-light">{selectedProject.subtitle}</p>}
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground p-2"><X size={20} /></button>
              </div>
              {selectedProject.client && (
                <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                  <strong className="text-foreground">Client:</strong> {selectedProject.client}
                </p>
              )}
              <p className="text-lg text-muted-foreground leading-[1.75] font-light">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
