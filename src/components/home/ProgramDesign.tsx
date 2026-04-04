import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import presentImg from "@/assets/team-presentation-1.jpg";

const ProgramDesign = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Co-Creation
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Program Design &{" "}
              <span className="text-accent italic">Development</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We 'co-create' policies, programs, and services by collaborating with clients and communities. Together, we define challenges and design solutions, particularly focusing on governance, rule of law, and social sector development.
            </p>
            <div className="space-y-4 mb-8">
              <div className="border-l-2 border-accent pl-6 py-2">
                <h3 className="font-bold text-foreground mb-1">Governance & Rule of Law</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Integrated support to strengthen public institutions, enhance transparency, and promote citizen trust in governance systems.
                </p>
              </div>
              <div className="border-l-2 border-border pl-6 py-2 hover:border-accent transition-colors">
                <h3 className="font-bold text-foreground mb-1">Social Sector Development</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Strengthening healthcare, education, social services, and social protection systems for resilience and well-being.
                </p>
              </div>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm tracking-wide uppercase">
              Learn More <ChevronRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img src={presentImg} alt="TIGAAL presentation" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-sm hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDesign;
