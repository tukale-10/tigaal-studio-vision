import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
import worldbank from "@/assets/partners/worldbank.svg";
import cbs from "@/assets/partners/cbs.png";
import irise from "@/assets/partners/irise.png";
import supremecourt from "@/assets/partners/supremecourt.jpg";
import moci from "@/assets/partners/moci.png";
import lpi from "@/assets/partners/lpi.jpg";
import care from "@/assets/partners/care.png";
import savethechildren from "@/assets/partners/savethechildren.jpg";

const partners = [
  { name: "World Bank", logo: worldbank },
  { name: "UNOPS", logo: unops },
  { name: "Save the Children", logo: savethechildren },
  { name: "CARE", logo: care },
  { name: "Saferworld", logo: saferworld },
  { name: "IDLO", logo: idlo },
  { name: "Life & Peace Institute", logo: lpi },
  { name: "IGAD CAEP", logo: igad },
  { name: "Iftiin Foundation", logo: iftiin },
  { name: "Nagaasho", logo: nagaasho },
  { name: "Candlelight", logo: candlelight },
  { name: "Shaqo Platform", logo: shaqo },
  { name: "Ministry of Youth & Sports", logo: moys },
  { name: "Netherlands MFA", logo: netherlands },
  { name: "Central Bank of Somalia", logo: cbs },
  { name: "iRise", logo: irise },
  { name: "Supreme Court of Somalia", logo: supremecourt },
  { name: "Ministry of Commerce & Industry", logo: moci },
];

const textOnlyPartners = ["Gargaara Finance"];

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-lg border border-border p-6 flex items-center justify-center h-24 hover:shadow-md hover:border-accent/30 transition-all"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-14 max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {textOnlyPartners.map((partner) => (
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
