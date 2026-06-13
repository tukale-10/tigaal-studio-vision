import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import iftiin from "@/assets/partners/iftiin.jpg";
import saferworld from "@/assets/partners/saferworld.jpg";
import netherlands from "@/assets/partners/netherlands.png";
import moys from "@/assets/partners/moys.png";
import unops from "@/assets/partners/unops.png";
import nagaasho from "@/assets/partners/nagaasho.png";
import shaqo from "@/assets/partners/shaqo.jpg";
import idlo from "@/assets/partners/idlo.png";
import candlelight from "@/assets/partners/candlelight.jpeg";
import igad from "@/assets/partners/igad.png";
import worldbank from "@/assets/partners/worldbank.png";
import gargaara from "@/assets/partners/gargaara.png";
import cbs from "@/assets/partners/cbs.png";
import irise from "@/assets/partners/irise.png";
import supremecourt from "@/assets/partners/supremecourt.jpg";
import moci from "@/assets/partners/moci.png";
import lpi from "@/assets/partners/lpi.jpg";
import care from "@/assets/partners/care.png";
import savethechildren from "@/assets/partners/savethechildren.jpg";

type Partner = { name: string; logo?: string };

const partnerCategories: { category: string; partners: Partner[] }[] = [
  {
    category: "International Organizations",
    partners: [
      { name: "World Bank", logo: worldbank },
      { name: "UNOPS", logo: unops },
      { name: "Save the Children", logo: savethechildren },
      { name: "CARE", logo: care },
      { name: "Saferworld", logo: saferworld },
      { name: "IDLO", logo: idlo },
      { name: "Life & Peace Institute", logo: lpi },
    ],
  },
  {
    category: "Government Bodies",
    partners: [
      { name: "Ministry of Youth & Sports", logo: moys },
      { name: "Netherlands Ministry of Foreign Affairs", logo: netherlands },
      { name: "Central Bank of Somalia", logo: cbs },
      { name: "Supreme Court of Somalia", logo: supremecourt },
      { name: "Ministry of Commerce & Industry", logo: moci },
    ],
  },
  {
    category: "Regional & Local Partners",
    partners: [
      { name: "IGAD CAEP", logo: igad },
      { name: "Iftiin Foundation", logo: iftiin },
      { name: "Nagaasho", logo: nagaasho },
      { name: "Candlelight", logo: candlelight },
      { name: "Shaqo Platform", logo: shaqo },
      { name: "iRise", logo: irise },
      { name: "Gargaara Finance", logo: gargaara },
      { name: "Expanding Access to Justice" },
    ],
  },
];

const Partners = () => {
  return (
    <main>
      <PageHero title="Our Clients" subtitle="Strategic collaborations delivering impact at scale." breadcrumb="Clients" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Collaborations</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Working with <span className="text-accent italic">leaders</span> in development
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We're proud to work with leading international organisations, governments, and development actors. These partnerships let us deliver impact at scale and keep our work rigorous, relevant, and responsive.
            </p>
          </div>

          {partnerCategories.map((cat, catIndex) => (
            <div key={cat.category} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-10">
                <span className="font-display text-4xl text-accent/15">{String(catIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl text-foreground">{cat.category}</h3>
                  <div className="w-12 h-px bg-accent mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {cat.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="bg-white rounded-lg border border-border p-6 lg:p-8 flex items-center justify-center text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group min-h-[120px]"
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-16 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                        {partner.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
