import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark, Scale, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import trainingSession1 from "@/assets/training-session-1.jpg";
import trainingSession2 from "@/assets/training-session-2.jpg";
import groupWorkshop from "@/assets/group-workshop.jpg";
import communityYouth from "@/assets/community-youth.jpg";
import mogadishuSkyline from "@/assets/mogadishu-skyline.jpg";
import mogadishuWaterfront from "@/assets/mogadishu-waterfront.jpg";

const services = [
  {
    icon: GraduationCap,
    title: "Capacity Development and Trainings",
    desc: "We deliver evidence-based policy research and strategic analyses that inform decision-making and strengthen development outcomes. Our work spans social policy papers, public policy strategies, learning briefs, stakeholder mapping, and political economy assessments. We bring practical experience in shock-responsive social protection, including the design of social safety net delivery in fragile and post-conflict settings, ensuring programmes remain responsive to evolving risks.",
    image: trainingSession1,
    highlights: ["Policy Research", "Strategic Analyses", "Social Protection", "Safety Net Delivery"],
  },
  {
    icon: BarChart3,
    title: "Monitoring, Evaluation and Learning",
    desc: "We design customized frameworks for outcome and impact evaluations, emphasizing objectivity and accuracy. Our services include formative assessments, end-of-year evaluations, mid-term reviews, third-party monitoring (TPMs), and baseline/endline evaluations for complex programmes. We combine strategic planning, performance monitoring, and organizational development tools to help clients drive measurable, accountable results.",
    image: groupWorkshop,
    highlights: ["Impact Evaluations", "Third-Party Monitoring", "Performance Monitoring", "Baseline Studies"],
  },
  {
    icon: Megaphone,
    title: "Strategic Communication and Public Relations",
    desc: "We help organizations strengthen their voice, build credibility, and engage diverse stakeholders through communication approaches that amplify development impact. Our services include development-focused content creation, crisis communication, strategic press releases, social media management, event design, multilingual communication solutions, and opinion polls and perception surveys.",
    image: trainingSession2,
    highlights: ["Content Creation", "Crisis Communication", "Social Media", "Perception Surveys"],
  },
  {
    icon: TrendingUp,
    title: "Market Studies and Assessments",
    desc: "We provide actionable insights into consumer behaviours, market trends, and competitive landscapes, enabling businesses and policymakers to make informed decisions. Our assessments involve comprehensive data collection through surveys, focus group discussions, and stakeholder interviews to understand supply and demand dynamics, identify market gaps, and evaluate feasibility of new products and services.",
    image: teamImg4,
    highlights: ["Consumer Insights", "Market Trends", "Feasibility Studies", "Data Collection"],
  },
  {
    icon: Leaf,
    title: "Climate Resilience & Adaptation",
    desc: "We support the design of climate-responsive policies, regulatory frameworks, and sustainable programmes aligned with regional and global adaptation agendas. By fostering partnerships with governments, communities, and development partners, we build adaptive capacities, protect vulnerable populations, and advance long-term resilience to the climate crisis across Somalia and the Horn of Africa.",
    image: teamImg5,
    highlights: ["Climate Policy", "Regulatory Frameworks", "Adaptive Capacity", "Resilience Building"],
  },
  {
    icon: Landmark,
    title: "Private Sector Development & Financial Inclusion",
    desc: "We promote private sector growth and extend financial services to underserved communities as a pathway to Somalia's economic recovery. Working with diverse stakeholders, we address structural challenges, encourage entrepreneurship, and streamline regulatory environments. Our services guide entrepreneurs on market strategies, financing, and building a conducive environment for sustainable business growth.",
    image: heroImg,
    highlights: ["Financial Services", "Entrepreneurship", "Market Strategies", "Economic Recovery"],
  },
];

const programDesign = [
  {
    icon: Scale,
    title: "Governance & Rule of Law",
    desc: "Strong governance and effective rule of law are cornerstones of peace, stability, and inclusive development. This portfolio provides integrated support to strengthen public institutions, enhance transparency, and promote citizen trust in governance systems. Our approach combines rigorous policy research, institutional diagnostics, and capacity development with practical advisory services tailored to fragile and conflict-affected contexts. Our work also includes supporting justice sector institutions in improving access, efficiency, and responsiveness to citizens' needs. By applying global best practices and conflict-sensitive methodologies, we help shape reforms that align with democratic principles and foster sustainable state-building.",
    image: teamImg1,
  },
  {
    icon: Heart,
    title: "Social Sector Development",
    desc: "A vibrant social sector is essential for resilience and well-being. As a social enterprise, Tigaal works with NGOs, government agencies, and community organizations to strengthen healthcare, education, social services, and social protection systems. Our focus includes advancing inclusive access to social safety nets, shock-responsive and adaptive programs, and sustainable livelihoods. We deliver training on social sector and protection priorities, conduct evidence-based research, and advocate for reforms that promote equity, resilience, and lasting impact.",
    image: teamImg3,
  },
];

const Services = () => {
  return (
    <main>
      <PageHero title="Our Services" subtitle="Research, Training, and Advocacy for a Better Tomorrow" breadcrumb="Services" />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">What We Deliver</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Integrated Solutions for <span className="text-accent italic">Complex</span> Challenges
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide integrated services that combine policy research, strategic advisory, communication for development, and monitoring and evaluation. Grounded in evidence, informed by local knowledge, and enriched with innovative analytics, our solutions are tailored to local contexts where we work and designed to strengthen systems, empower communities, and drive sustainable impact.
              </p>
            </div>
            <div className="relative">
              <img src={teamImg2} alt="Tigaal team in action" className="w-full h-[400px] object-cover rounded-sm" />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-8 py-5 rounded-sm">
                <span className="font-display text-3xl">6+</span>
                <span className="text-sm ml-2 opacity-90">Core Service Areas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards - alternating layout */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="space-y-20 lg:space-y-28">
            {services.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-0 items-stretch group ${isEven ? "" : "lg:direction-rtl"}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden h-[320px] lg:h-auto min-h-[400px] ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-primary/30 to-transparent`} />
                    <div className="absolute top-6 left-6">
                      <span className="text-primary-foreground/40 font-display text-6xl lg:text-7xl font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`bg-secondary p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                      <service.icon className="text-accent" size={24} />
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-5 leading-snug">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.highlights.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
                          <CheckCircle2 size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
              <div key={item.title} className="group rounded-sm overflow-hidden border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-sm flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <item.icon className="text-accent" size={22} />
                    </div>
                    <h3 className="font-display text-xl text-primary-foreground">{item.title}</h3>
                  </div>
                </div>
                <div className="p-8 bg-primary-foreground/5 backdrop-blur-sm">
                  <p className="text-primary-foreground/60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Get Started</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">Need a tailored solution?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Let's discuss how our integrated services can address your unique challenges and drive lasting impact.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all text-lg"
          >
            Discuss Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
