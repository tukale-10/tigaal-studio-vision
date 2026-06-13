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
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold tracking-[0.15em] uppercase text-sm mb-4 block">The People</span>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-foreground leading-tight">
                Meet the <span className="text-accent italic">Experts</span>
              </h2>
            </div>
            <div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                TIGAAL's strength is the calibre and diversity of its people. Our specialists bring decades of combined experience across research, monitoring and evaluation, governance advisory, climate science, strategic communications, and institutional development — pairing international standards with deep contextual knowledge of Somalia and the wider Horn of Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-20">
              {[
                { key: "core", label: "Core Team", subtitle: "The professionals driving TIGAAL's day-to-day work." },
                { key: "expert", label: "Our Experts", subtitle: "Senior advisors providing specialised technical expertise." },
              ].map((group) => {
                const members = teamMembers.filter((m) => (m.category || "core") === group.key);
                if (members.length === 0) return null;
                return (
                  <div key={group.key}>
                    <div className="mb-10 pb-6 border-b border-border">
                      <span className="text-accent font-semibold tracking-[0.15em] uppercase text-sm mb-3 block">
                        {group.label}
                      </span>
                      <h3 className="font-display text-3xl lg:text-4xl text-foreground">{group.subtitle}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {members.map((member) => {
                        const key = member.id;
                        const isExpanded = expandedKey === key;
                        return (
                          <div
                            key={member.id}
                            className="bg-background border border-border rounded-sm overflow-hidden group hover:border-accent/40 hover:shadow-xl transition-all duration-500"
                          >
                            <div className="h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className="p-8 lg:p-10">
                              <div className="flex items-start gap-6 mb-6">
                                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-sm flex-shrink-0 overflow-hidden bg-secondary">
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
                                  <h3 className="font-display text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                                    {member.name}
                                  </h3>
                                  <p className="text-accent text-base font-semibold tracking-wide">{member.title}</p>
                                </div>
                              </div>
                              <p className={`text-base text-muted-foreground leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>
                                {member.bio}
                              </p>
                              <button
                                onClick={() => setExpandedKey(isExpanded ? null : key)}
                                className="flex items-center gap-2 mt-5 text-accent text-sm font-bold tracking-wide uppercase hover:gap-3 transition-all"
                              >
                                {isExpanded ? <>Show Less <ChevronUp size={16} /></> : <>Read Full Bio <ChevronDown size={16} /></>}
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
