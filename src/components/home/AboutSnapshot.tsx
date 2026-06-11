import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import teamImg from "@/assets/team-workshop-3.jpg";

const stats = [
  { value: "60+", label: "Projects Delivered" },
  { value: "6", label: "Service Pillars" },
  { value: "7+", label: "Team Specialists" },
  { value: "20+", label: "Clients" },
];

const AboutSnapshot = () => {
  return (
    <>
      {/* Stats strip — sits flush after hero */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-y border-border bg-background">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-12 lg:py-14 text-center ${
              i < stats.length - 1 ? "md:border-r border-border" : ""
            } ${i === 0 || i === 2 ? "border-r md:border-r" : ""} ${
              i < 2 ? "border-b md:border-b-0" : ""
            }`}
          >
            <div className="font-display text-5xl md:text-6xl text-foreground mb-3 leading-none">
              {stat.value.replace("+", "")}
              {stat.value.includes("+") && <span className="text-accent">+</span>}
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Who we are */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-4 border border-accent/25 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="relative z-10 aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl">
                <img src={teamImg} alt="TIGAAL team in action" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="eyebrow block mb-6">Who We Are</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.05] mb-8">
                Research & Analysis at the{" "}
                <span className="italic text-accent">Centre</span> of Somalia's Development
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed font-light mb-10">
                TIGAAL is a social enterprise operating at the centre of Somalia's development landscape. Our consulting practice powers and sustains the non-profit and development projects we deliver — bridging the critical gap between international frameworks and local realities through rigorous research, in-depth analysis, and strategic advisory tailored to the Horn of Africa.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] uppercase hover:text-accent transition-colors"
              >
                Learn More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSnapshot;
