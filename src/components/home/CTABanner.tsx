import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import workshopImg from "@/assets/team-workshop-2.jpg";

const CTABanner = () => {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <img src={workshopImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
              Let's Collaborate
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-primary-foreground mb-8 leading-[1.05] tracking-tight">
            Let's work together on what matters most.
          </h2>
          <p className="text-primary-foreground/75 text-lg mb-12 max-w-xl leading-[1.75] font-light">
            Planning a research initiative, looking for a third-party monitoring partner, or exploring opportunities in the Horn of Africa? Our team would be glad to talk.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all"
          >
            Get in touch
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
