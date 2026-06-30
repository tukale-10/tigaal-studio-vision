import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import presentImg from "@/assets/team-presentation-1.jpg";

const ProgramDesign = () => {
  return (
    <section className="py-28 lg:py-40 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[5/6] rounded-2xl overflow-hidden shadow-xl">
              <img src={presentImg} alt="TIGAAL presentation" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border border-accent/30 rounded-2xl hidden lg:block -z-10" />
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
                Co-Creation
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground mb-8 leading-[1.1] tracking-tight">
              Program design and development, built with the communities we serve.
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.75] mb-10 font-light">
              We co-create policies, programmes, and services with clients and the communities they serve — with a particular focus on governance, rule of law, and social sector development.
            </p>
            <div className="space-y-6 mb-12">
              <div className="border-l-2 border-accent pl-6">
                <h3 className="font-semibold text-foreground text-lg mb-2">Governance & Rule of Law</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Strengthening public institutions, enhancing transparency, and promoting citizen trust in governance systems.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6 hover:border-accent transition-colors">
                <h3 className="font-semibold text-foreground text-lg mb-2">Social Sector Development</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Strengthening healthcare, education, social services, and social protection systems for resilience and well-being.
                </p>
              </div>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all">
              Learn more <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDesign;
