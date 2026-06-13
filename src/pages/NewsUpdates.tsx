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

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-secondary rounded-sm animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No news articles published yet.</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <article key={item.id} className="group relative bg-secondary rounded-sm overflow-hidden border border-border hover:border-accent/30 transition-all duration-500">
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">{item.category}</span>
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl text-foreground mb-4 leading-snug group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{item.excerpt}</p>
                    <div className="flex items-center gap-2 text-muted-foreground/60 text-sm">
                      <Calendar size={14} />
                      <span>{new Date(item.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                    </div>
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
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Stay Informed</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">Want to stay updated on our latest work? Reach out to join our mailing list.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all">
            Get In Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NewsUpdates;
