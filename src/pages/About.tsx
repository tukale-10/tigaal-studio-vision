import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye } from "lucide-react";
import teamImg from "@/assets/team-workshop-2.jpg";
import presentationImg from "@/assets/team-presentation-1.jpg";

const coreValues = [
  "Innovate for inclusive and sustainable development.",
  "Turn insight into impact for communities.",
  "Partner for accountability, equity, and change.",
  "Combine local knowledge with global standards.",
  "Build systems that put people first.",
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
      <PageHero title="Who We Are" subtitle="A Somali-led social enterprise delivering research, analysis, and advisory across the Horn of Africa." breadcrumb="Who We Are" />

      {/* Company Overview */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img src={teamImg} alt="TIGAAL team collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 border border-accent/30 rounded-2xl hidden lg:block -z-10" />
            </div>

            <div className="lg:pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">About TIGAAL</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-[1.1] tracking-tight">
                A catalyst for tangible change.
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-[1.75] font-light">
                <p>
                  TIGAAL is a social enterprise working at the heart of Somalia's development landscape. We deliver development and non-profit programmes alongside a consulting practice that funds and sustains our mission — reinvesting commercial earnings into research and public-interest work.
                </p>
                <p>
                  Founded to close the gap between international frameworks and local realities, TIGAAL provides rigorous research, in-depth analysis, and strategic advisory tailored to the Horn of Africa.
                </p>
                <p>
                  Our team combines deep local knowledge with modern data analytics and specialist expertise across governance, climate, financial inclusion, social protection, and strategic communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-28 lg:py-32 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Our Vision</span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-primary-foreground leading-[1.2] tracking-tight">
            "To shape transformative strategies that build a more inclusive and prosperous future for Somalia and the Horn of Africa."
          </blockquote>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            <div className="lg:pt-8 lg:order-1 order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">What Sets Us Apart</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8 leading-[1.1] tracking-tight">
                Local knowledge. International standards.
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-[1.75] font-light">
                <p>
                  What sets TIGAAL apart is the depth of our team's contextual knowledge, our trusted relationships with federal and regional stakeholders, and our commitment to producing work that meets international standards while remaining grounded in local realities.
                </p>
                <p>
                  We work collaboratively — not transactionally — so that our programmes move beyond surface fixes to shift outcomes, building the foundation for lasting stability and opportunity.
                </p>
              </div>
            </div>
            <div className="relative lg:order-2 order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img src={presentationImg} alt="TIGAAL presentation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-accent/30 rounded-2xl hidden lg:block -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 lg:py-40 bg-secondary/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Our Philosophy</span>
              <div className="h-px w-10 bg-accent" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.1] tracking-tight">Mission & Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-background p-12 lg:p-14 rounded-2xl border border-border/60">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-8">
                <Target className="text-accent" size={24} />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground text-lg leading-[1.75] font-light">
                To deliver evidence-based, locally grounded solutions that address development challenges effectively and equitably — driven by rigour, inclusivity, and people-centred impact.
              </p>
            </div>
            <div className="bg-background p-12 lg:p-14 rounded-2xl border border-border/60">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-8">
                <Eye className="text-accent" size={24} />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground text-lg leading-[1.75] font-light">
                To be the Horn of Africa's most trusted partner for research, advisory, and learning — using knowledge and technology to deliver value that evolves with our clients and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Guiding Principles</span>
              <div className="h-px w-10 bg-accent" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.1] tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-background border border-border/60 rounded-2xl p-10 hover:border-accent/40 hover:shadow-md transition-all duration-500">
                <span className="font-display text-5xl text-accent/30 block mb-6 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground text-lg font-light leading-relaxed">{value}</p>
              </div>
            ))}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-10 flex items-center justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-semibold tracking-wide hover:gap-3 transition-all">
                Work with us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bridging the Gap */}
      <section className="py-28 lg:py-40 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Investment Advisory</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-primary-foreground mb-8 leading-[1.1] tracking-tight">
                Bridging the gap.
              </h2>
              <p className="text-primary-foreground/80 text-lg leading-[1.75] mb-6 font-light">
                As Somalia rebuilds, the country offers significant opportunity. Reforms — including the new online business registration platform — are reshaping the operating environment, opening up manufacturing, technology, hospitality, and agribusiness to fresh investment.
              </p>
              <p className="text-primary-foreground/60 leading-[1.75] font-light">
                Entering the market remains complex for outside investors. Drawing on our local expertise, we provide contextual analysis, sector intelligence, and opportunity mapping — and we walk clients through the full set-up journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessSteps.map((step, i) => (
                <div
                  key={step}
                  className={`group p-6 rounded-2xl border border-primary-foreground/10 hover:border-accent/40 bg-primary-foreground/[0.04] transition-all duration-500 ${i === businessSteps.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h4 className="text-primary-foreground font-medium leading-snug">{step}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-[1.1] tracking-tight">Ready to collaborate?</h2>
          <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">
            Whether you're a development partner, investor, or public institution, we'd be glad to discuss how TIGAAL can support your work.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all"
          >
            Get in touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
