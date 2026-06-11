import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import workshopImg from "@/assets/team-workshop-2.jpg";

const CTABanner = () => {
  return (
    <section className="relative py-40 overflow-hidden">
      <img
        src={workshopImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.15] scale-105"
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/60" />
      <div className="relative z-10 container mx-auto px-4 lg:px-12 text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent block mb-8">
          Let's Build Together
        </span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.05]">
          Ready to <span className="italic text-accent">collaborate?</span>
        </h2>
        <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
          Whether you are planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to help.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 px-12 py-5 bg-accent text-accent-foreground text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-accent transition-all"
        >
          Get In Touch
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
