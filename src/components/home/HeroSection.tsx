import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/tigaal-logo.webp";
import img1 from "@/assets/team-workshop-1.jpg";
import img2 from "@/assets/team-workshop-2.jpg";
import img3 from "@/assets/team-presentation-2.jpg";

const slides = [img1, img2, img3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Slideshow backgrounds */}
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: i === current ? "ken-burns 20s ease-out forwards" : "none" }}
        />
      ))}

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <img src={logo} alt="TIGAAL" className="h-9 brightness-0 invert opacity-80" />
            <div className="h-px w-16 bg-accent/60" />
            <span className="text-primary-foreground/60 text-xs font-medium tracking-[0.3em] uppercase">
              Research · Advisory · Impact
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-primary-foreground leading-[1.05] mb-8 animate-slide-up-fade">
            Offering Innovative{" "}
            <span className="text-accent italic">Solutions</span> To Complex
            And Dynamic Problems
          </h1>

          <p
            className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-2xl leading-relaxed animate-slide-up-fade"
            style={{ animationDelay: "0.15s" }}
          >
            Somalia's leading research and analytical management firm — delivering rigorous evidence, strategic advisory, and measurable impact across the Horn of Africa.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-slide-up-fade"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/projects"
              className="group px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all duration-300 flex items-center gap-2"
            >
              Explore Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-medium rounded-sm hover:border-accent hover:text-accent transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-accent" : "w-4 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import { ArrowRight } from "lucide-react";
export default HeroSection;
