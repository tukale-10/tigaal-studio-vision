import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string | null;
  display_order: number;
  category: string;
}

const Team = () => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .order("display_order");
      setTeamMembers((data as TeamMember[]) || []);
      setLoading(false);
    };
    fetchTeam();
  }, []);

  return (
    <main>
      <PageHero title="Our Team" subtitle="Specialists with decades of combined experience across research, governance, and development." breadcrumb="Our Team" />

      {/* Intro Section */}
      <section className="py-28 lg:py-40 bg-secondary/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">The People</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.05] tracking-tight">
                Meet the experts.
              </h2>
            </div>
            <div className="lg:pt-8">
              <p className="text-lg lg:text-xl text-muted-foreground leading-[1.75] font-light">
                TIGAAL's strength is the calibre and diversity of its people. Our specialists bring decades of combined experience across research, monitoring and evaluation, governance advisory, climate science, strategic communications, and institutional development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-24">
              {[
                { key: "core", label: "Core Team", subtitle: "The professionals driving TIGAAL's day-to-day work" },
                { key: "expert", label: "Our Experts", subtitle: "Senior advisors providing specialist technical expertise" },
              ].map((group) => {
                const members = teamMembers.filter((m) => (m.category || "core") === group.key);
                if (members.length === 0) return null;
                return (
                  <div key={group.key}>
                    <div className="mb-12 pb-8 border-b border-border">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-10 bg-accent" />
                        <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">{group.label}</span>
                      </div>
                      <h3 className="font-display text-3xl lg:text-4xl text-foreground tracking-tight">{group.subtitle}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {members.map((member) => {
                        const key = member.id;
                        const isExpanded = expandedKey === key;
                        return (
                          <div
                            key={member.id}
                            className="bg-background border border-border/60 rounded-2xl overflow-hidden group hover:border-accent/40 hover:shadow-lg transition-all duration-500"
                          >
                            <div className="p-10">
                              <div className="flex items-start gap-6 mb-6">
                                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl flex-shrink-0 overflow-hidden bg-secondary">
                                  {member.image_url ? (
                                    <img
                                      src={member.image_url}
                                      alt={member.name}
                                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent font-display text-2xl">
                                      {member.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="pt-2">
                                  <h3 className="font-display text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300 tracking-tight">
                                    {member.name}
                                  </h3>
                                  <p className="text-accent text-sm font-semibold tracking-wide">{member.title}</p>
                                </div>
                              </div>
                              <p className={`text-muted-foreground leading-[1.75] font-light ${isExpanded ? "" : "line-clamp-3"}`}>
                                {member.bio}
                              </p>
                              <button
                                onClick={() => setExpandedKey(isExpanded ? null : key)}
                                className="flex items-center gap-2 mt-6 text-accent text-xs font-semibold tracking-[0.2em] uppercase hover:gap-3 transition-all"
                              >
                                {isExpanded ? <>Show less <ChevronUp size={14} /></> : <>Read full bio <ChevronDown size={14} /></>}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Team;
