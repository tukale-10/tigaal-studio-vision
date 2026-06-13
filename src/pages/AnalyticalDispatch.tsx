import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface DispatchItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_date: string;
}

const AnalyticalDispatch = () => {
  const [items, setItems] = useState<DispatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("news_updates")
        .select("id, title, excerpt, category, published_date")
        .eq("published", true)
        .eq("dispatch_type", "dispatch")
        .order("published_date", { ascending: false });
      setItems((data as DispatchItem[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <main>
      <PageHero
        title="Analytical Dispatch"
        subtitle="In-depth analysis, research insights, and commentary from the TIGAAL team."
        breadcrumb="Resources"
      />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-secondary rounded-sm animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto text-muted-foreground/30 mb-4" size={48} />
              <p className="text-muted-foreground">No dispatches published yet — check back soon for in-depth analysis.</p>
            </div>
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
                      <span>{new Date(item.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
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
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Want analysis on a specific topic?</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">Get in touch to discuss commissioned research and analytical work.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all">
            Get In Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AnalyticalDispatch;
