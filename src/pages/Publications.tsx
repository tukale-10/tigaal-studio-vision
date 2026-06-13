import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PdfCover from "@/components/PdfCover";

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
      <PageHero title="Publications" subtitle="Research papers, policy briefs, and learning documents from our work." breadcrumb="Resources" />

      {/* Company Profile Download */}
      <section className="py-16 lg:py-20 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm mb-4 inline-block">Company Profile</span>
              <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-3">TIGAAL Company Profile 2026</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">A concise overview of our capabilities, track record, and the impact we deliver across the Horn of Africa.</p>
            </div>
            <a
              href="/TIGAAL_Profile_2026.pdf"
              download
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all duration-300 flex-shrink-0"
            >
              <Download size={18} />
              Download Profile
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-secondary rounded-sm animate-pulse" />)}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No publications yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((pub) => (
                <article key={pub.id} className="group flex flex-col bg-secondary rounded-sm border border-border hover:border-accent/40 transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden">
                    {pub.file_url ? (
                      <PdfCover url={pub.file_url} title={pub.title} />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-accent/5 flex items-center justify-center">
                        <BookOpen className="text-accent/40" size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-accent bg-background/95 backdrop-blur px-2.5 py-1 rounded-sm">{pub.pub_type}</span>
                      <span className="text-[0.65rem] font-semibold text-foreground bg-background/95 backdrop-blur px-2.5 py-1 rounded-sm">{pub.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-display text-lg text-foreground mb-2 leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-3">{pub.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">{pub.description}</p>
                    {pub.file_url && (
                      <div className="mt-auto flex gap-2">
                        <a
                          href={pub.file_url}
                          target="_blank"
                          rel="noopener"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-sm hover:bg-accent/90 transition-colors"
                        >
                          <BookOpen size={14} /> Read
                        </a>
                        <a
                          href={pub.file_url}
                          download
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground text-sm font-semibold rounded-sm hover:bg-accent/10 hover:border-accent/40 transition-colors"
                        >
                          <Download size={14} /> Download
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Interested in our research?</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">Get in touch to request full copies or discuss a research collaboration.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all">
            Request Publications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Publications;
