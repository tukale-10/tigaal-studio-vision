import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye } from "lucide-react";
import teamImg from "@/assets/team-workshop-2.jpg";
import presentationImg from "@/assets/team-presentation-1.jpg";

const coreValues = [
  "Innovating for inclusive and sustainable development.",
  "Transforming insights into impact for communities.",
  "Partnering for accountability, equity, and change.",
  "Local knowledge, global standards, lasting solutions.",
  "Shaping systems that serve people first.",
];

const businessSteps = [
  "Starting a business",
  "Getting a location",
  "Accessing finance",
  "Operating securely",
  "Day-to-day operations",
];

const About = () => {
  return (
    <main>
      <PageHero title="Who We Are" subtitle="Research & Analysis at the Centre of Somalia's Development" breadcrumb="Who We Are" />

      {/* Company Overview */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img src={teamImg} alt="TIGAAL team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent/30 rounded-sm hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/10 rounded-sm hidden lg:block" />
            </div>

            {/* Text */}
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                About TIGAAL
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                A Catalyst for Positive, <span className="text-accent italic">Tangible</span> Change
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  TIGAAL is a social enterprise operating at the centre of Somalia's development landscape. We deliver non-profit and development projects alongside a consulting practice that serves as our sustainability engine — our profit-making wing that funds and reinvests in our mission-driven work. Founded to address the critical gap between international development frameworks and local realities, TIGAAL provides rigorous research, in-depth analysis, and strategic advisory services tailored to the Horn of Africa's unique operating environment.
                </p>
                <p>
                  Our firm collaborates with governmental bodies, international organizations, UN agencies, and grassroots networks to deliver evidence-based solutions that drive measurable impact. We combine deep local knowledge with modern data analytics, technology, and a team of specialists whose combined expertise spans governance, climate science, financial inclusion, social protection, and strategic communications.
                </p>
                <p>
                  TIGAAL is not simply a consulting firm; we are a catalyst for positive, tangible change. Our domain of expertise includes robust thematic advisory, in-depth policy research, practical strategies, and adaptive program designs that respond to the evolving challenges of the region. Every solution we deliver is built around local perspectives, genuine engagement, and community empowerment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <div className="w-16 h-px bg-accent mx-auto mb-8" />
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-foreground italic leading-snug mb-8">
            "Our mission: to be instrumental in shaping transformative strategies that pave the way for Somalia's progressive future."
          </blockquote>
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                What Sets Us Apart
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Deep Local Knowledge, <span className="text-accent italic">International</span> Standards
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  What distinguishes TIGAAL from other firms operating in the Somali context is the depth and breadth of our team's local knowledge, our established relationships with key stakeholders at federal and regional levels, and our commitment to producing work that meets international quality standards while remaining grounded in the realities on the ground.
                </p>
                <p>
                  Our collaborative approach ensures that our programs do not merely address surface-level issues but transform outcomes, setting the foundation for enduring stability and holistic opportunity across the communities we serve.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img src={presentationImg} alt="TIGAAL presentation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-accent/30 rounded-sm hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Our Philosophy</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto rounded-sm overflow-hidden">
            <div className="bg-background p-10 lg:p-14">
              <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6">
                <Target className="text-accent" size={24} />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to deliver evidence-based, innovative solutions that address development challenges effectively and efficiently. We are committed to continuous improvement, inclusivity, and people-centered impact.
              </p>
            </div>
            <div className="bg-background p-10 lg:p-14">
              <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6">
                <Eye className="text-accent" size={24} />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our vision is to harness the latest knowledge and technologies to deliver value-added services that evolve with our clients' needs while staying ahead in today's innovative world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Guiding Principles</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-5xl mx-auto rounded-sm overflow-hidden">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-background p-8 lg:p-10 group hover:bg-accent/[0.03] transition-all duration-500">
                <span className="font-display text-4xl text-accent/20 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground font-medium leading-relaxed">{value}</p>
              </div>
            ))}
            {/* Empty cell for grid balance */}
            <div className="bg-accent/5 p-8 lg:p-10 flex items-center justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase hover:gap-3 transition-all">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bridging the Gap */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Investment Advisory</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 leading-tight">
                Bridging the <span className="text-accent italic">Gap</span>
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-6">
                As Somalia recovers from past instability, it presents vast investment opportunities. Recent reforms, including an online business registration platform, have rejuvenated its business environment. Sectors like manufacturing, tech, hospitality, and agri-farming are ripe for investment.
              </p>
              <p className="text-primary-foreground/50 leading-relaxed">
                However, accessing the Somali market remains challenging for foreign investors. Leveraging our local expertise and understanding of Somalia's evolving landscape, we provide investors with contextual insights, industry analyses, and identify investment gaps and opportunities. We streamline the entire process, from securing necessary permits from federal and regional authorities to fully establishing businesses in Somalia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessSteps.map((step, i) => (
                <div
                  key={step}
                  className={`group relative p-6 rounded-sm border border-primary-foreground/10 hover:border-accent/40 bg-primary-foreground/[0.03] hover:bg-primary-foreground/[0.07] transition-all duration-500 ${i === businessSteps.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/15 group-hover:bg-accent/25 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <span className="font-display text-xl text-accent font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="text-primary-foreground font-semibold text-base leading-snug">{step}</h4>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Ready to collaborate?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Whether you're a development partner, investor, or government body — we're ready to discuss how TIGAAL can support your objectives.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Get In Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
