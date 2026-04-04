import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Publication {
  id: string;
  title: string;
  description: string;
  pub_type: string;
  year: string;
  file_url: string | null;
}

const Publications = () => {
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("publications")
        .select("*")
        .eq("published", true)
        .order("year", { ascending: false });
      setItems((data as Publication[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <main>
      <PageHero title="Publications" subtitle="Research papers, policy briefs, and learning documents from our work" breadcrumb="Resources" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-secondary rounded-sm animate-pulse" />)}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No publications yet.</div>
          ) : (
            <div className="space-y-6">
              {items.map((pub) => (
                <article key={pub.id} className="group relative grid md:grid-cols-[1fr_auto] gap-8 items-center bg-secondary rounded-sm p-8 lg:p-10 border border-border hover:border-accent/30 transition-all duration-500">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">{pub.pub_type}</span>
                      <span className="text-muted-foreground/50 text-sm">{pub.year}</span>
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl text-foreground mb-3 leading-snug group-hover:text-accent transition-colors duration-300">{pub.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{pub.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {pub.file_url ? (
                      <a href={pub.file_url} target="_blank" rel="noopener" className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-sm flex items-center justify-center transition-colors duration-300">
                        <BookOpen className="text-accent" size={22} />
                      </a>
                    ) : (
                      <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-sm flex items-center justify-center transition-colors duration-300">
                        <BookOpen className="text-accent" size={22} />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Interested in our research?</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">Contact us to request full copies of our publications or discuss potential research collaborations.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all">
            Request Publications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Publications;
