import PageHero from "@/components/PageHero";
import HornOfAfricaMap from "@/components/capability/HornOfAfricaMap";
import { clientLogoGroups } from "@/content/clientLogos";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

const partners = clientLogoGroups.flatMap((group) => group.clients);

const Partners = () => {
  const logoGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = logoGridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-logo-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <PageHero title="Our Clients" subtitle="Strategic collaborations delivering impact at scale." breadcrumb="Clients" />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-14 lg:mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Collaborations</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Collaborating with leading organisations across the region
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We're proud to work with leading international organisations, governments, and development actors. These partnerships let us deliver impact at scale and keep our work rigorous, relevant, and responsive.
            </p>
          </div>

          <div ref={logoGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-border">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                data-logo-card
                className="client-logo-reveal group relative flex min-h-40 items-center justify-center overflow-hidden border-b border-r border-border bg-card p-6 text-center md:min-h-48 md:p-8"
                style={{ transitionDelay: `${(index % 10) * 55}ms` }}
              >
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-base font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-accent">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 lg:py-28">
        <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <div className="mb-5 flex items-center gap-3 text-accent">
              <MapPin size={18} aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">Our Reach</span>
            </div>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">Rooted locally. Connected regionally.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              TIGAAL works across Somalia, Kenya, and Ethiopia, combining trusted local networks with regional insight to support programmes that respond to real contexts.
            </p>
            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-7">
              {[
                ["Somalia", "Primary base"],
                ["Kenya", "Regional reach"],
                ["Ethiopia", "Regional reach"],
              ].map(([country, detail]) => (
                <div key={country}>
                  <div className="font-semibold text-foreground">{country}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card p-3 shadow-sm ring-1 ring-border md:p-5">
            <HornOfAfricaMap active={["SO", "KE", "ET"]} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Interested in working with us?</h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Start a Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Partners;
