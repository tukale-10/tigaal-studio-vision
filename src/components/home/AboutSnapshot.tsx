import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import teamImg from "@/assets/team-workshop-3.jpg";

const stats = [
  { value: "60+", label: "Projects Delivered" },
  { value: "6", label: "Core Service Areas" },
  { value: "7+", label: "In-House Specialists" },
  { value: "20+", label: "Clients & Partners" },
];

const AboutSnapshot = () => {
  return (
    <section className="py-28 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
                Know About Us
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground mb-8 leading-[1.1] tracking-tight">
              Research and analysis at the heart of Somalia's development.
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.75] mb-6 font-light">
              TIGAAL is a social enterprise working at the centre of Somalia's development landscape. Our consulting practice sustains the non-profit and development work we deliver — bridging global frameworks and local realities through rigorous research and strategic advisory tailored to the Horn of Africa.
            </p>
            <p className="text-muted-foreground text-lg leading-[1.75] mb-10 font-light">
              From third-party monitoring of humanitarian programmes to long-term institutional strengthening, we bring methodological rigour and contextual depth to every engagement.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all"
            >
              Learn more
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Image side */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[5/6] rounded-2xl overflow-hidden shadow-xl">
              <img src={teamImg} alt="TIGAAL team in action" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-accent/30 rounded-2xl hidden lg:block -z-10" />
          </div>
        </div>

        {/* Stats — clean, airy strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-5xl md:text-6xl text-foreground mb-3 tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium tracking-[0.18em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
