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
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Our Impact
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight">
              Featured Projects
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm tracking-wide uppercase">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10">
          {featuredProjects.map((project, i) => (
            <Link
              to="/projects"
              key={project.id}
              className="group bg-primary p-8 lg:p-10 hover:bg-primary-foreground/5 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-accent text-xs font-semibold tracking-wider uppercase">
                  {project.client}
                </span>
                <span className="text-primary-foreground/20 font-display text-2xl">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{project.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
