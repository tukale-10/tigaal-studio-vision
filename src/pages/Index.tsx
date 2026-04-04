import { Link } from "react-router-dom";
import {
  GraduationCap, BarChart3, Megaphone, TrendingUp, Leaf, Landmark,
  ArrowRight, MapPin, Shield, Users, Cpu, DollarSign, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import logo from "@/assets/tigaal-logo.webp";

const services = [
  { icon: GraduationCap, title: "Capacity Development & Trainings", desc: "Evidence-based policy research and strategic analyses that inform decision-making and strengthen development outcomes." },
  { icon: BarChart3, title: "Monitoring, Evaluation & Learning", desc: "Customized frameworks for outcome and impact evaluations, emphasizing objectivity and accuracy." },
  { icon: Megaphone, title: "Strategic Communication & PR", desc: "Strengthening organizational voice, credibility, and stakeholder engagement through development-focused communication." },
  { icon: TrendingUp, title: "Market Studies & Assessments", desc: "Actionable insights into consumer behaviours, market trends, and competitive landscapes." },
  { icon: Leaf, title: "Climate Resilience & Adaptation", desc: "Climate-responsive policies, regulatory frameworks, and sustainable programmes aligned with adaptation agendas." },
  { icon: Landmark, title: "Private Sector Development & Financial Inclusion", desc: "Promoting private sector growth and extending financial services to underserved communities." },
];

const stats = [
  { value: "12+", label: "Projects Delivered" },
  { value: "6", label: "Service Pillars" },
  { value: "7+", label: "Team Specialists" },
  { value: "20+", label: "Partner Organizations" },
];

const whyChoose = [
  { icon: MapPin, title: "Deep Local Knowledge", desc: "Our team is embedded in Somalia's development ecosystem. We understand the political dynamics, clan structures, security considerations, and cultural nuances that determine whether programmes succeed or fail." },
  { icon: Shield, title: "Rigorous Methodology", desc: "We apply international standards of research and evaluation practice, adapted for the Somali context. Our work has been trusted by the World Bank, Save the Children, Interpeace, and other leading institutions." },
  { icon: Users, title: "Established Networks", desc: "Our relationships span federal and regional government officials, UN agencies, international NGOs, and local civil society organizations, enabling rapid mobilization and stakeholder access." },
  { icon: Cpu, title: "Technology-Enabled", desc: "We leverage modern data collection tools, digital dashboards, and analytical platforms to deliver real-time insights and ensure data quality across geographically dispersed operations." },
  { icon: ArrowRight, title: "End-to-End Capability", desc: "From initial research and programme design through implementation support, third-party monitoring, and strategic communications, Tigaal offers a complete solution that reduces the need for multiple contractors." },
  { icon: DollarSign, title: "Cost-Effective", desc: "As a locally established firm, Tigaal offers competitive pricing without compromising quality, delivering better value compared to international firms with higher overhead structures." },
];

const featuredProjects = [
  { id: 1, title: "SCRP Management Information System (MIS)", client: "UNOPS / World Bank", desc: "Maintenance, enhancement, and capacity building of the SCRP MIS for the Ministry of Finance." },
  { id: 2, title: "Multi-Sectoral Humanitarian Response TPM", client: "CARE Somalia", desc: "Third-party monitoring for GAC-funded humanitarian response across Banadir and Galgaduud." },
  { id: 3, title: "Shaqo Consortium TPM Services", client: "Netherlands Embassy", desc: "Strategic monitoring and evaluation services for sustainable livelihood programmes for Somali youth." },
  { id: 4, title: "Strategic Communication for the Judiciary", client: "Supreme Court of Somalia", desc: "Comprehensive communication strategy to strengthen citizen-centered engagement and public trust." },
];

const partners = [
  "World Bank", "UNOPS", "Save the Children", "CARE", "Saferworld",
  "Life & Peace Institute", "IGAD CAEP", "Central Bank of Somalia",
  "Supreme Court of Somalia", "IDLO", "Iftiin Foundation",
  "Gargaara Finance", "Candlelight", "iRise",
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={heroImg} alt="TIGAAL team workshop" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-primary/80" />
        {/* Geometric accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rotate-45 translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rotate-12 -translate-x-20 translate-y-20" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
          <div className="max-w-3xl">
            <img src={logo} alt="TIGAAL" className="h-12 brightness-0 invert mb-8 animate-fade-in" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
              Offering Innovative Solutions To Complex And Dynamic Problems
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Research. Advisory. Impact. Across Somalia and the Horn of Africa.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/projects" className="px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors">
                Explore Our Work
              </Link>
              <Link to="/contact" className="px-8 py-3.5 border-2 border-primary-foreground/60 text-primary-foreground font-semibold rounded-md hover:border-accent hover:text-accent transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Snapshot + Stats */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              TIGAAL is a research and analytical management firm operating at the centre of Somalia's development landscape. Founded to address the critical gap between international development frameworks and local realities, Tigaal provides rigorous research, in-depth analysis, and strategic advisory services tailored to the Horn of Africa's unique operating environment.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-accent font-semibold hover:gap-3 transition-all">
              Learn More About Us <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background rounded-xl p-6 text-center shadow-sm border border-border">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Research, Training, and Advocacy for a Better Tomorrow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                to="/services"
                key={service.title}
                className="group bg-background border border-border rounded-xl p-8 hover:shadow-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="text-accent" size={28} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Program Design */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Program Design & Development</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We 'co-create' policies, programs, and services by collaborating with clients and communities. Together, we define challenges and design solutions, particularly focusing on governance, rule of law, and social sector development.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 mt-6 text-accent font-semibold hover:gap-3 transition-all">
                Learn More <ChevronRight size={18} />
              </Link>
            </div>
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">Governance & Rule of Law</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Integrated support to strengthen public institutions, enhance transparency, and promote citizen trust in governance systems.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">Social Sector Development</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Strengthening healthcare, education, social services, and social protection systems for resilience and well-being.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Tailored Solutions to Complex Problems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Link
                to="/projects"
                key={project.id}
                className="group bg-background border border-border rounded-xl p-8 hover:shadow-lg hover:border-accent/50 transition-all duration-300"
              >
                <div className="text-accent text-sm font-semibold mb-2">{project.client}</div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Tigaal */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Tigaal</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              When selecting a research, advisory, or monitoring partner for operations in Somalia and the Horn of Africa, the decision should be guided by demonstrated capability, contextual depth, and a track record of delivering results under challenging conditions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-background rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((partner) => (
              <div key={partner} className="px-6 py-3 bg-secondary rounded-lg text-sm font-medium text-muted-foreground border border-border">
                {partner}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/partners" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              View All Partners <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rotate-45 translate-x-48 -translate-y-48" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to partner with us?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Whether you are planning a research initiative, seeking a third-party monitoring partner, or exploring investment opportunities in Somalia, our team is ready to help.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors text-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
