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
      <section className="py-20 lg:py-24 bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Company Profile</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-3 tracking-tight">TIGAAL Company Profile 2026</h2>
              <p className="text-muted-foreground leading-[1.75] font-light max-w-xl">A concise overview of our capabilities, track record, and the impact we deliver across the Horn of Africa.</p>
            </div>
            <a
              href="/TIGAAL_Profile_2026.pdf"
              download
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all flex-shrink-0"
            >
              <Download size={16} />
              Download profile
            </a>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          {loading ? (
            <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />)}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-light">No publications yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((pub) => (
                <article key={pub.id} className="group flex flex-col bg-background rounded-2xl border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-500 overflow-hidden">
                  <div className="relative overflow-hidden">
                    {pub.file_url ? (
                      <PdfCover url={pub.file_url} title={pub.title} />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-accent/5 flex items-center justify-center">
                        <BookOpen className="text-accent/40" size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent bg-background/95 backdrop-blur px-2.5 py-1 rounded-full">{pub.pub_type}</span>
                      <span className="text-[10px] font-semibold text-foreground bg-background/95 backdrop-blur px-2.5 py-1 rounded-full">{pub.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-7">
                    <h3 className="font-display text-lg text-foreground mb-3 leading-snug tracking-tight group-hover:text-accent transition-colors duration-300 line-clamp-3">{pub.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5 font-light">{pub.description}</p>
                    {pub.file_url && (
                      <div className="mt-auto flex gap-2">
                        <a
                          href={pub.file_url}
                          target="_blank"
                          rel="noopener"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-full hover:bg-accent/90 transition-colors"
                        >
                          <BookOpen size={14} /> Read
                        </a>
                        <a
                          href={pub.file_url}
                          download
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground text-sm font-medium rounded-full hover:bg-accent/10 hover:border-accent/40 transition-colors"
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

      <section className="py-28 lg:py-32 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6 leading-[1.1] tracking-tight">Interested in our research?</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 font-light leading-relaxed">Get in touch to request full copies or discuss a research collaboration.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all">
            Request publications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Publications;
