import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BarChart3, Users, Handshake, Globe2 } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "150+", label: "Projects delivered" },
  { icon: BarChart3, value: "8", label: "Core service areas" },
  { icon: Users, value: "15+", label: "In-house specialists" },
  { icon: Handshake, value: "50+", label: "Clients & partners" },
  { icon: Globe2, value: "3", label: "Countries of operation" },
];

const ProvenImpact = () => {
  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 mb-14 lg:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="text-accent mb-5" size={34} strokeWidth={1.75} />
              <div className="font-display text-4xl md:text-5xl lg:text-[3rem] text-primary-foreground mb-3 leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm md:text-[0.95rem] font-medium max-w-[11rem]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-colors"
          >
            See our work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProvenImpact;
