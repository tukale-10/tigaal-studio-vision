import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, BarChart3, Users, Handshake, Globe2 } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "60+", label: "Projects delivered" },
  { icon: BarChart3, value: "6", label: "Core service areas" },
  { icon: Users, value: "7+", label: "In-house specialists" },
  { icon: Handshake, value: "20+", label: "Clients & partners" },
  { icon: Globe2, value: "3", label: "Countries of operation" },
];

const ProvenImpact = () => {
  return (
    <section className="py-24 lg:py-32 bg-tigaal-green">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-white text-center mb-16 lg:mb-20 leading-[1.05] tracking-tight">
          Proven impact.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 mb-16 lg:mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="text-white/90 mb-5" size={34} strokeWidth={1.75} />
              <div className="font-display text-4xl md:text-5xl lg:text-[3rem] text-tigaal-gold mb-3 leading-none tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/85 text-sm md:text-[0.95rem] font-medium max-w-[11rem]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-secondary transition-colors"
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
