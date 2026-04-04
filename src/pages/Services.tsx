import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark, Scale, Heart, ArrowRight, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Capacity Development and Trainings",
    desc: "We deliver evidence-based policy research and strategic analyses that inform decision-making and strengthen development outcomes. Our work spans social policy papers, public policy strategies, learning briefs, stakeholder mapping, and political economy assessments. We bring practical experience in shock-responsive social protection, including the design of social safety net delivery in fragile and post-conflict settings, ensuring programmes remain responsive to evolving risks.",
  },
  {
    icon: BarChart3,
    title: "Monitoring, Evaluation and Learning",
    desc: "We design customized frameworks for outcome and impact evaluations, emphasizing objectivity and accuracy. Our services include formative assessments, end-of-year evaluations, mid-term reviews, third-party monitoring (TPMs), and baseline/endline evaluations for complex programmes. We combine strategic planning, performance monitoring, and organizational development tools to help clients drive measurable, accountable results.",
  },
  {
    icon: Megaphone,
    title: "Strategic Communication and Public Relations",
    desc: "We help organizations strengthen their voice, build credibility, and engage diverse stakeholders through communication approaches that amplify development impact. Our services include development-focused content creation, crisis communication, strategic press releases, social media management, event design, multilingual communication solutions, and opinion polls and perception surveys.",
  },
  {
    icon: TrendingUp,
    title: "Market Studies and Assessments",
    desc: "We provide actionable insights into consumer behaviours, market trends, and competitive landscapes, enabling businesses and policymakers to make informed decisions. Our assessments involve comprehensive data collection through surveys, focus group discussions, and stakeholder interviews to understand supply and demand dynamics, identify market gaps, and evaluate feasibility of new products and services.",
  },
  {
    icon: Leaf,
    title: "Climate Resilience & Adaptation",
    desc: "We support the design of climate-responsive policies, regulatory frameworks, and sustainable programmes aligned with regional and global adaptation agendas. By fostering partnerships with governments, communities, and development partners, we build adaptive capacities, protect vulnerable populations, and advance long-term resilience to the climate crisis across Somalia and the Horn of Africa.",
  },
  {
    icon: Landmark,
    title: "Private Sector Development & Financial Inclusion",
    desc: "We promote private sector growth and extend financial services to underserved communities as a pathway to Somalia's economic recovery. Working with diverse stakeholders, we address structural challenges, encourage entrepreneurship, and streamline regulatory environments. Our services guide entrepreneurs on market strategies, financing, and building a conducive environment for sustainable business growth.",
  },
];

const programDesign = [
  {
    icon: Scale,
    title: "Governance & Rule of Law",
    desc: "Strong governance and effective rule of law are cornerstones of peace, stability, and inclusive development. This portfolio provides integrated support to strengthen public institutions, enhance transparency, and promote citizen trust in governance systems. Our approach combines rigorous policy research, institutional diagnostics, and capacity development with practical advisory services tailored to fragile and conflict-affected contexts. Our work also includes supporting justice sector institutions in improving access, efficiency, and responsiveness to citizens' needs. By applying global best practices and conflict-sensitive methodologies, we help shape reforms that align with democratic principles and foster sustainable state-building.",
  },
  {
    icon: Heart,
    title: "Social Sector Development",
    desc: "A vibrant social sector is essential for resilience and well-being. As a social enterprise, Tigaal works with NGOs, government agencies, and community organizations to strengthen healthcare, education, social services, and social protection systems. Our focus includes advancing inclusive access to social safety nets, shock-responsive and adaptive programs, and sustainable livelihoods. We deliver training on social sector and protection priorities, conduct evidence-based research, and advocate for reforms that promote equity, resilience, and lasting impact.",
  },
];

const Services = () => {
  return (
    <main>
      <PageHero title="Our Services" subtitle="Research, Training, and Advocacy for a Better Tomorrow" breadcrumb="Services" />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">What We Deliver</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Integrated Solutions for <span className="text-accent italic">Complex</span> Challenges</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide integrated services that combine policy research, strategic advisory, communication for development, and monitoring and evaluation. Grounded in evidence, informed by local knowledge, and enriched with innovative analytics, our solutions are tailored to local contexts where we work and designed to strengthen systems, empower communities, and drive sustainable impact.
          </p>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-0">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`grid md:grid-cols-[1fr_2fr] gap-0 border-t border-border ${i === services.length - 1 ? "border-b" : ""}`}
              >
                {/* Left label */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-secondary/50">
                  <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-5">
                    <service.icon className="text-accent" size={24} />
                  </div>
                  <span className="text-accent/30 font-display text-sm tracking-wider mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl text-foreground leading-snug">{service.title}</h3>
                </div>
                {/* Right description */}
                <div className="p-8 lg:p-12 flex items-center border-l-0 md:border-l border-border">
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Design */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Program Design
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
              Program Design & Development
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-3xl mx-auto leading-relaxed">
              We 'co-create' policies, programs, and services by collaborating with clients and communities. Together, we define challenges and design solutions, particularly focusing on the following areas:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {programDesign.map((item) => (
              <div key={item.title} className="bg-primary-foreground/5 backdrop-blur-sm rounded-sm p-10 border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500 group">
                <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-display text-xl text-primary-foreground mb-4">{item.title}</h3>
                <p className="text-primary-foreground/60 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Need a tailored solution?</h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Discuss Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
