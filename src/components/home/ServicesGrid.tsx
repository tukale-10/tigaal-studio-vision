import { Link } from "react-router-dom";
import {
  GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark, ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: GraduationCap, slug: "capacity-development-and-trainings", title: "Capacity Development & Trainings", desc: "Evidence-based policy research and strategic analyses that inform decision-making and strengthen development outcomes." },
  { icon: BarChart3, slug: "monitoring-evaluation-and-learning", title: "Monitoring, Evaluation & Learning", desc: "Customized frameworks for outcome and impact evaluations, emphasizing objectivity and accuracy." },
  { icon: Megaphone, slug: "strategic-communication-and-pr", title: "Strategic Communication & PR", desc: "Strengthening organizational voice, credibility, and stakeholder engagement through development-focused communication." },
  { icon: TrendingUp, slug: "market-studies-and-assessments", title: "Market Studies & Assessments", desc: "Actionable insights into consumer behaviours, market trends, and competitive landscapes." },
  { icon: Leaf, slug: "climate-resilience-and-adaptation", title: "Climate Resilience & Adaptation", desc: "Climate-responsive policies, regulatory frameworks, and sustainable programmes aligned with adaptation agendas." },
  { icon: Landmark, slug: "private-sector-and-financial-inclusion", title: "Private Sector Development & Financial Inclusion", desc: "Promoting private sector growth and extending financial services to underserved communities." },
];

const ServicesGrid = () => {
  return (
    <section className="py-28 lg:py-36 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent block mb-6">
              What We Do
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1] tracking-tight">
              Our Capabilities
            </h2>
          </div>
          <p className="text-white/40 text-sm italic max-w-xs">
            Research, Training, and Advocacy for a Better Tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((service) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.title}
              className="group bg-[#1A1A1A] p-10 lg:p-12 hover:bg-accent/[0.08] transition-colors duration-500 relative"
            >
              <div className="w-10 h-10 mb-8 flex items-center justify-center border border-white/20 text-accent group-hover:border-accent transition-colors">
                <service.icon size={18} />
              </div>
              <h3 className="text-xl font-medium text-white mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-10">{service.desc}</p>
              <div className="w-full h-px bg-white/5 group-hover:bg-accent transition-colors" />
              <ArrowUpRight
                size={16}
                className="absolute top-10 right-10 text-white/30 group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            to="/services"
            className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] uppercase text-white/70 hover:text-accent transition-colors"
          >
            View All Capabilities
            <span className="h-px w-12 bg-white/30 group-hover:bg-accent group-hover:w-16 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
