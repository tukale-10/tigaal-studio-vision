import PageHero from "@/components/PageHero";
import { GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark, Scale, Heart } from "lucide-react";

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
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide integrated services that combine policy research, strategic advisory, communication for development, and monitoring and evaluation. Grounded in evidence, informed by local knowledge, and enriched with innovative analytics, our solutions are tailored to local contexts where we work and designed to strengthen systems, empower communities, and drive sustainable impact.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="space-y-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start bg-background rounded-xl border border-border p-8`}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center">
                    <service.icon className="text-accent" size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Design */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Program Design and Development</h2>
          <p className="text-muted-foreground text-center mb-12 text-lg max-w-3xl mx-auto">
            We 'co-create' policies, programs, and services by collaborating with clients and communities. Together, we define challenges and design solutions, particularly focusing on the following areas:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {programDesign.map((item) => (
              <div key={item.title} className="bg-background rounded-xl p-8 border border-border">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-5">
                  <item.icon className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
