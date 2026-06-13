import { Link } from "react-router-dom";
import {
  GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark, ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: GraduationCap, slug: "capacity-development-and-trainings", title: "Capacity Development & Trainings", desc: "Tailored training, coaching, and institutional strengthening that build durable skills within partner organisations." },
  { icon: BarChart3, slug: "monitoring-evaluation-and-learning", title: "Monitoring, Evaluation & Learning", desc: "Independent MEL frameworks and third-party monitoring designed for objectivity, accuracy, and actionable learning." },
  { icon: Megaphone, slug: "strategic-communication-and-pr", title: "Strategic Communication & PR", desc: "Sharpening organisational voice, credibility, and stakeholder engagement through development-focused communication." },
  { icon: TrendingUp, slug: "market-studies-and-assessments", title: "Market Studies & Assessments", desc: "Actionable insight into consumer behaviour, market trends, and competitive landscapes in fragile settings." },
  { icon: Leaf, slug: "climate-resilience-and-adaptation", title: "Climate Resilience & Adaptation", desc: "Climate-responsive policies, regulatory frameworks, and programmes aligned with national adaptation agendas." },
  { icon: Landmark, slug: "private-sector-and-financial-inclusion", title: "Private Sector Development & Financial Inclusion", desc: "Advancing private sector growth and extending financial services to underserved communities." },
];

const ServicesGrid = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              What We Do
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              Our Capabilities
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md">
            Research, Training, and Advocacy for a Better Tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.title}
              className="group bg-background p-8 lg:p-10 hover:bg-accent/[0.03] transition-all duration-500 relative"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon className="text-accent" size={22} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              <ArrowUpRight
                size={18}
                className="absolute top-8 right-8 text-muted-foreground/30 group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
