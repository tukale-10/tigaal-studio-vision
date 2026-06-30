import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featuredProjects = [
  { id: 1, title: "SCRP Management Information System (MIS)", client: "UNOPS / World Bank", desc: "Maintenance, enhancement, and capacity building of the SCRP MIS for the Ministry of Finance." },
  { id: 2, title: "Multi-Sectoral Humanitarian Response TPM", client: "CARE Somalia", desc: "Third-party monitoring for GAC-funded humanitarian response across Banadir and Galgaduud." },
  { id: 3, title: "Shaqo Consortium TPM Services", client: "Netherlands Embassy", desc: "Strategic monitoring and evaluation services for sustainable livelihood programmes for Somali youth." },
  { id: 4, title: "Strategic Communication for the Judiciary", client: "Supreme Court of Somalia", desc: "Comprehensive communication strategy to strengthen citizen-centered engagement and public trust." },
];

const FeaturedProjects = () => {
  return (
    <section className="py-28 lg:py-40 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
                Our Impact
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-primary-foreground leading-[1.1] tracking-tight">
              Featured projects from across the Horn of Africa.
            </h2>
          </div>
          <Link to="/projects" className="lg:col-span-4 lg:justify-self-end inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:bg-primary-foreground/10 transition-all">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <Link
              to="/projects"
              key={project.id}
              className="group bg-primary-foreground/[0.04] backdrop-blur rounded-2xl p-10 border border-primary-foreground/10 hover:border-accent/40 hover:bg-primary-foreground/[0.07] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-accent text-[11px] font-semibold tracking-[0.2em] uppercase">
                  {project.client}
                </span>
                <span className="text-primary-foreground/20 font-display text-3xl">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-4 leading-snug group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-primary-foreground/60 leading-relaxed font-light">{project.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
