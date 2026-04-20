import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import workshopImg from "@/assets/team-workshop-2.jpg";

const CTABanner = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <img src={workshopImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-5">
          Ready to collaborate?
        </h2>
        <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Whether you are planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to help.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all text-lg"
        >
          Contact Us
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
