import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const partners = [
  "World Bank", "UNOPS", "Save the Children", "CARE", "Saferworld",
  "Life & Peace Institute", "IGAD CAEP", "Central Bank of Somalia",
  "Supreme Court of Somalia", "IDLO", "Iftiin Foundation",
  "Gargaara Finance", "Candlelight", "iRise",
];

const PartnersStrip = () => {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
              Trusted By
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Our Partners</h2>
          </div>
          <Link to="/partners" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm tracking-wide uppercase">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {partners.map((partner) => (
            <div key={partner} className="px-5 py-2.5 bg-secondary rounded-sm text-sm font-medium text-muted-foreground border border-border hover:border-accent/30 transition-colors">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersStrip;
