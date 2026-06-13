import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Quote } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { optimizedImage } from "@/lib/image";
import { getCapability, capabilities } from "@/content/capabilities";
import { slugifyTitle, TITLE_TO_SLUG } from "@/lib/slug";
import StatsChart from "@/components/capability/StatsChart";
import HornOfAfricaMap from "@/components/capability/HornOfAfricaMap";

interface ServiceRow {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  image_url: string | null;
  highlights: string[];
  display_order: number;
}

const getIcon = (name: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>;
  return icons[name] || LucideIcons.Sparkles;
};

const CapabilityDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const content = getCapability(slug);
  const [service, setService] = useState<ServiceRow | null>(null);
  const [allServices, setAllServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("services").select("*").eq("published", true).order("display_order");
      const rows = (data as ServiceRow[]) || [];
      setAllServices(rows);
      const match = rows.find((r) => slugifyTitle(r.title) === slug);
      setService(match || null);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (!content) return <Navigate to="/services" replace />;

  const HeroIcon = getIcon(content.iconName);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[460px] md:h-[520px] flex items-end overflow-hidden bg-primary">
        {service?.image_url && (
          <img
            src={optimizedImage(service.image_url, { width: 1800, quality: 70 })}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-12 md:pb-16 max-w-6xl">
          <div className="text-primary-foreground/50 text-xs tracking-[0.2em] uppercase mb-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span className="mx-3">—</span>
            <Link to="/services" className="hover:text-accent">Capabilities</Link>
          </div>
          <div className="flex items-start gap-5 mb-5">
            <div className="hidden md:flex w-14 h-14 bg-accent/20 backdrop-blur-sm rounded-sm items-center justify-center shrink-0">
              <HeroIcon className="text-accent" size={26} />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-[1.1] mb-3">
                {service?.title || "Capability"}
              </h1>
              <p className="text-primary-foreground/75 text-lg md:text-xl max-w-3xl leading-relaxed">
                {content.tagline}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-l-2 border-t-2 border-accent/20 hidden lg:block" />
      </section>

      {/* OVERVIEW + HIGHLIGHTS */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Overview</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                What we do, and <span className="italic text-accent">why it matters</span>
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-secondary rounded animate-pulse" />
                  <div className="h-4 bg-secondary rounded animate-pulse w-11/12" />
                  <div className="h-4 bg-secondary rounded animate-pulse w-10/12" />
                </div>
              ) : (
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed whitespace-pre-line">
                  {service?.description}
                </p>
              )}
            </div>

            <aside className="space-y-8">
              <div className="bg-secondary p-8 rounded-sm border-l-2 border-accent">
                <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Key Focus Areas</span>
                <ul className="space-y-3">
                  {(service?.highlights || []).map((h) => (
                    <li key={h} className="flex items-start gap-3 text-foreground text-sm">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {content.quote && (
                <div className="relative bg-primary text-primary-foreground p-8 rounded-sm">
                  <Quote className="absolute top-5 right-5 text-accent/30" size={36} />
                  <p className="font-display text-xl leading-snug mb-4 italic">"{content.quote.text}"</p>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary-foreground/60">{content.quote.attribution}</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">What We Offer</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">Service offerings</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Modular offerings adapted to client need, country context, and partner ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {content.subServices.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <div key={s.title} className="bg-background p-8 group hover:bg-accent/[0.03] transition-colors duration-300">
                  <div className="w-11 h-11 bg-accent/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon className="text-accent" size={20} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Our Approach</span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">How we work</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-6" />
          </div>

          <ol className="relative border-l-2 border-accent/30 pl-8 md:pl-12 space-y-10">
            {content.approach.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-[42px] md:-left-[58px] w-12 h-12 rounded-full bg-accent text-accent-foreground font-display text-lg flex items-center justify-center shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STATS / CHART */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">By the Numbers</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6 leading-tight">
                Evidence at <span className="italic text-accent">scale</span>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-8">{content.statsCaption}</p>
              <div className="grid grid-cols-2 gap-px bg-primary-foreground/10">
                {content.stats.map((s) => (
                  <div key={s.label} className="bg-primary p-6">
                    <div className="font-display text-3xl md:text-4xl text-accent mb-1">
                      {s.value.toLocaleString()}{s.suffix || "+"}
                    </div>
                    <div className="text-primary-foreground/60 text-xs uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-foreground/[0.04] p-6 lg:p-8 rounded-sm border border-primary-foreground/10">
              <StatsChart stats={content.stats} />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Where We Work</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Regional footprint
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                This capability spans Somalia, Kenya, and Ethiopia — pairing local presence with regional perspective.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Engagements are delivered from Mogadishu and Nairobi, with field hubs and a network of local researchers, enumerators, and partners on the ground.
              </p>
            </div>
            <div className="order-1 lg:order-2 bg-background p-6 lg:p-8 rounded-sm border border-border">
              <HornOfAfricaMap active={content.regions} />
            </div>
          </div>
        </div>
      </section>

      {/* RELATED + CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Related Capabilities</span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">Explore further</h2>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-accent text-sm font-semibold group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> All capabilities
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {content.related.map((relSlug) => {
              const relContent = capabilities[relSlug];
              const relService = allServices.find((s) => slugifyTitle(s.title) === relSlug);
              if (!relContent || !relService) return null;
              const Icon = getIcon(relContent.iconName);
              return (
                <Link
                  key={relSlug}
                  to={`/services/${relSlug}`}
                  className="bg-background p-8 lg:p-10 group hover:bg-accent/[0.03] transition-colors relative"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-accent transition-colors">{relService.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{relContent.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold">
                    Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Get Started</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Let's build something <span className="italic text-accent">together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Tell us about your context and the decisions you're facing — we'll come back with a focused proposal.
          </p>
          <Link to="/contact" className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all text-lg">
            Start a conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CapabilityDetail;

// Ensure tree-shaking keeps the slug map referenced.
void TITLE_TO_SLUG;
