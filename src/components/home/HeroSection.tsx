import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";
import img1 from "@/assets/team-workshop-1.jpg";
import img2 from "@/assets/team-workshop-2.jpg";
import img3 from "@/assets/team-presentation-2.jpg";

const slides = [img1, img2, img3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: i === current ? "ken-burns 22s ease-out forwards" : "none" }}
        />
      ))}

      {/* Softer, cleaner gradient — let the imagery breathe */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/10" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-24 pt-44 md:pb-32 md:pt-52">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-10 animate-fade-in">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
              Research · Advisory · Impact
            </span>
          </div>

          <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.02] mb-10 animate-slide-up-fade tracking-tight">
            Evidence-led solutions for the Horn of Africa's hardest questions.
          </h1>

          <p
            className="text-base md:text-lg text-primary-foreground/80 mb-12 max-w-xl leading-relaxed animate-slide-up-fade font-light"
            style={{ animationDelay: "0.15s" }}
          >
            A Somalia-based social enterprise delivering rigorous research, advisory, and monitoring across Somalia, Kenya, and Ethiopia — pairing international standards with deep local knowledge.
          </p>

          <div
            className="flex flex-wrap gap-3 animate-slide-up-fade"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all"
            >
              Explore our work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/TIGAAL_Profile_2026.pdf"
              download
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/10 transition-all"
            >
              <Download size={15} />
              Download profile
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 right-6 lg:right-12 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === current ? "w-12 bg-accent" : "w-5 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
