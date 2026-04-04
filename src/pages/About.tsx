import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const coreValues = [
  "Innovating for inclusive and sustainable development.",
  "Transforming insights into impact for communities.",
  "Partnering for accountability, equity, and change.",
  "Local knowledge, global standards, lasting solutions.",
  "Shaping systems that serve people first.",
];

const About = () => {
  return (
    <main>
      <PageHero title="Who We Are" breadcrumb="Who We Are" />

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            TIGAAL is a research and analytical management firm operating at the centre of Somalia's development landscape. Founded to address the critical gap between international development frameworks and local realities, Tigaal provides rigorous research, in-depth analysis, and strategic advisory services tailored to the Horn of Africa's unique operating environment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Our firm collaborates with governmental bodies, international organizations, UN agencies, and grassroots networks to deliver evidence-based solutions that drive measurable impact. We combine deep local knowledge with modern data analytics, technology, and a team of specialists whose combined expertise spans governance, climate science, financial inclusion, social protection, and strategic communications.
          </p>

          <blockquote className="border-l-4 border-accent pl-6 py-4 my-10 bg-secondary rounded-r-lg">
            <p className="text-xl font-medium text-foreground italic">
              "Our mission: to be instrumental in shaping transformative strategies that pave the way for Somalia's progressive future."
            </p>
          </blockquote>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Tigaal is not simply a consulting firm; we are a catalyst for positive, tangible change. Our domain of expertise includes robust thematic advisory, in-depth policy research, practical strategies, and adaptive program designs that respond to the evolving challenges of the region. Every solution we deliver is built around local perspectives, genuine engagement, and community empowerment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            What distinguishes Tigaal from other firms operating in the Somali context is the depth and breadth of our team's local knowledge, our established relationships with key stakeholders at federal and regional levels, and our commitment to producing work that meets international quality standards while remaining grounded in the realities on the ground.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our collaborative approach ensures that our programs do not merely address surface-level issues but transform outcomes, setting the foundation for enduring stability and holistic opportunity across the communities we serve.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-lg">M</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to deliver evidence-based, innovative solutions that address development challenges effectively and efficiently. We are committed to continuous improvement, inclusivity, and people-centered impact.
              </p>
            </div>
            <div className="bg-background rounded-xl p-8 border border-border shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-lg">V</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our vision is to harness the latest knowledge and technologies to deliver value-added services that evolve with our clients' needs while staying ahead in today's innovative world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, i) => (
              <div key={i} className="flex items-start gap-4 bg-secondary rounded-xl p-6 border border-border">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-foreground font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridging the Gap */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">Bridging the Gap</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
            As Somalia recovers from past instability, it presents vast investment opportunities. Recent reforms, including an online business registration platform, have rejuvenated its business environment. Sectors like manufacturing, tech, hospitality, and agri-farming are ripe for investment. However, accessing the Somali market remains challenging for foreign investors. Leveraging our local expertise and understanding of Somalia's evolving landscape, we provide investors with contextual insights, industry analyses, and identify investment gaps and opportunities.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed text-center mb-10">
            We streamline the entire process, from securing necessary permits from federal and regional authorities to fully establishing businesses in Somalia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Starting a business", "Getting a location", "Accessing finance", "Operating securely", "Day-to-day operations"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <span className="text-foreground font-medium text-sm">{step}</span>
                {i < 4 && <ChevronRight className="text-muted-foreground" size={16} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Want to learn more?</h2>
          <Link to="/contact" className="inline-block px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition-colors">
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
