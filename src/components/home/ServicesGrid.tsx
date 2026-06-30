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
    <section className="py-28 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
                What We Do
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.1] tracking-tight">
              Six interconnected practice areas, one trusted partner.
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground text-lg leading-[1.75] font-light">
            Built around research, learning, and advocacy — our capabilities are designed to address complex development questions with rigour and relevance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.title}
              className="group relative bg-background rounded-2xl p-10 border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <service.icon className="text-accent group-hover:text-accent-foreground transition-colors" size={22} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed font-light">{service.desc}</p>
              <ArrowUpRight
                size={18}
                className="absolute top-10 right-10 text-muted-foreground/30 group-hover:text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
