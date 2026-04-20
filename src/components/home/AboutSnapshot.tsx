import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import teamImg from "@/assets/team-workshop-3.jpg";

const stats = [
  { value: "60+", label: "Projects Delivered" },
  { value: "6", label: "Service Pillars" },
  { value: "7+", label: "Team Specialists" },
  { value: "20+", label: "Clients" },
];

const AboutSnapshot = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img src={teamImg} alt="TIGAAL team in action" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent/30 rounded-sm hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/10 rounded-sm hidden lg:block" />
          </div>

          {/* Text side */}
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Research & Analysis at the{" "}
              <span className="text-accent italic">Centre</span> of Somalia's Development
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              TIGAAL is a research and analytical management firm operating at the centre of Somalia's development landscape. Founded to address the critical gap between international development frameworks and local realities, Tigaal provides rigorous research, in-depth analysis, and strategic advisory services tailored to the Horn of Africa's unique operating environment.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-4 text-accent font-semibold hover:gap-3 transition-all text-sm tracking-wide uppercase"
            >
              Learn More <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-8 md:p-10 text-center">
              <div className="font-display text-4xl md:text-5xl text-accent mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
