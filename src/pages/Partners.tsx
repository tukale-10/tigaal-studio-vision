import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const partnerCategories = [
  {
    category: "International Organizations",
    partners: ["World Bank", "UNOPS", "Save the Children", "CARE", "Saferworld", "Life & Peace Institute", "IDLO"],
  },
  {
    category: "Government Bodies",
    partners: ["Central Bank of Somalia", "Supreme Court of Somalia", "Ministry of Youth & Sports", "Ministry of Commerce & Industry"],
  },
  {
    category: "Regional & Local Partners",
    partners: ["IGAD CAEP", "iRise", "Shaqo Platform", "Iftiin Foundation", "Nagaasho", "Expanding Access to Justice", "Candlelight", "Gargaara Finance", "Netherlands Ministry of Foreign Affairs"],
  },
];

const Partners = () => {
  return (
    <main>
      <PageHero title="Our Partners" subtitle="Strategic collaborations driving impact at scale" breadcrumb="Partners" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Collaborations</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Working With <span className="text-accent italic">Leaders</span> in Development
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              TIGAAL takes pride in its strategic collaborations with leading international organizations, government bodies, and development actors. These partnerships enable us to deliver impact at scale and ensure our work remains relevant, rigorous, and responsive to evolving needs.
            </p>
          </div>

          {partnerCategories.map((cat, catIndex) => (
            <div key={cat.category} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-4xl text-accent/15">{String(catIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl text-foreground">{cat.category}</h3>
                  <div className="w-12 h-px bg-accent mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
                {cat.partners.map((partner) => (
                  <div
                    key={partner}
                    className="bg-background p-6 lg:p-8 flex items-center justify-center text-center hover:bg-accent/[0.03] transition-all duration-500 group min-h-[100px]"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Interested in partnering?</h2>
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
