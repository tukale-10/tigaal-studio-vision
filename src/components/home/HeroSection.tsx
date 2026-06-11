import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import heroImg from "@/assets/team-workshop-1.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      {/* Background image, soft and editorial */}
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-25"
        style={{ animation: "ken-burns 24s ease-out forwards" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />

      <div className="relative z-10 container mx-auto px-4 lg:px-12 pt-32 pb-20">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-10 animate-fade-in">
            <span className="h-px w-12 bg-accent" />
            <span className="eyebrow">Research · Advisory · Impact</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] text-foreground leading-[0.95] tracking-tight mb-10 animate-slide-up-fade">
            Offering Innovative{" "}
            <span className="italic text-accent">Solutions</span> to Complex and Dynamic Problems
          </h1>

          <p
            className="text-lg md:text-xl text-foreground/70 mb-12 max-w-xl leading-relaxed font-light animate-slide-up-fade"
            style={{ animationDelay: "0.15s" }}
          >
            A Somalia-based social enterprise delivering research, advisory, and development projects across the Horn of Africa — with a consulting practice that sustains and reinvests in our mission.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-slide-up-fade"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.2em] uppercase hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Our Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/TIGAAL_Profile_2026.pdf"
              download
              className="group inline-flex items-center gap-2 px-8 py-4 border border-foreground/15 text-foreground text-[11px] font-bold tracking-[0.2em] uppercase hover:border-foreground hover:bg-foreground/5 transition-all"
            >
              <Download size={14} />
              Download Profile
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-foreground/15 text-foreground text-[11px] font-bold tracking-[0.2em] uppercase hover:border-foreground hover:bg-foreground/5 transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* corner editorial mark */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-foreground/40">
        <span>Est. Mogadishu</span>
        <span className="h-px w-8 bg-foreground/20" />
      </div>
    </section>
  );
};

export default HeroSection;
