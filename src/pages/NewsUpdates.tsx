import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_date: string;
}

const NewsUpdates = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("news_updates")
        .select("id, title, excerpt, category, published_date")
        .eq("published", true)
        .eq("dispatch_type", "news")
        .order("published_date", { ascending: false });
      setItems((data as NewsItem[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <main>
      <PageHero title="News & Updates" subtitle="Project milestones, announcements, and the latest from TIGAAL." breadcrumb="Resources" />

      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          {loading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-secondary rounded-2xl animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-light">No news articles published yet.</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <article key={item.id} className="group bg-background rounded-2xl overflow-hidden border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-500">
                  <div className="p-10">
                    <span className="text-[11px] font-semibold tracking-[0.32em] uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full inline-block mb-6">{item.category}</span>
                    <h3 className="font-display text-2xl text-foreground mb-4 leading-snug tracking-tight group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-muted-foreground leading-[1.75] mb-6 font-light">{item.excerpt}</p>
                    <div className="flex items-center gap-2 text-muted-foreground/70 text-sm pt-4 border-t border-border">
                      <Calendar size={14} />
                      <span>{new Date(item.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-28 lg:py-32 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-6 leading-[1.1] tracking-tight">Stay informed.</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 font-light leading-relaxed">Want updates on our latest work? Get in touch to join our mailing list.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all">
            Get in touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NewsUpdates;
