import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Handshake, Target, ArrowRight, Lightbulb, Users, FlaskConical, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Dialogue", desc: "Engage in open dialogue to understand underlying problems and priorities.", color: "bg-accent" },
  { icon: Search, title: "Assessment", desc: "Assess existing practices, activities, tools, and outcomes.", color: "bg-primary" },
  { icon: Handshake, title: "Co-creation", desc: "Co-create strategies and build alliances to achieve sustainable solutions.", color: "bg-accent" },
  { icon: Target, title: "Results", desc: "Deliver results within agreed timelines, ensuring responsiveness, relevance, and impact.", color: "bg-primary" },
];

const deliveryModel = [
  { icon: Lightbulb, step: "Understand", desc: "Listen to clients, map context, and identify the real challenges beneath the surface." },
  { icon: Users, step: "Co-create", desc: "Collaborate with stakeholders — from policymakers to community members — to design locally grounded solutions." },
  { icon: FlaskConical, step: "Test", desc: "Validate approaches in real-world settings, iterating based on evidence and feedback." },
  { icon: Rocket, step: "Implement", desc: "Deploy solutions with local ownership, building capacity at every stage." },
  { icon: BarChart3, step: "Measure & Follow-up", desc: "Track results rigorously and ensure sustainability beyond project timelines." },
];

const Approach = () => {
  return (
    <main>
      <PageHero title="Our Approach" subtitle="Every project calls for a smart plan, not a benchmark" breadcrumb="Our Approach" />

      {/* Quote & Overview */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <span className="text-accent font-semibold tracking-[0.15em] uppercase text-sm mb-4 block">Our Philosophy</span>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-foreground mb-8 leading-tight">
                Local Problems Need <span className="text-accent italic">Local Solutions</span>
              </h2>
              <div className="h-1 w-20 bg-accent mb-8" />
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                We are distinctive in the way we approach, handle, and execute projects. Our delivery model is rooted in a simple conviction: local problems need local solutions. As a social transformation company, we listen to our clients, engage relevant local stakeholders and subject matter experts, and create opportunities for innovative solutions at every stage of the project lifecycle.
              </p>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                "Local problems need local solutions" is the principle that guides all our work. As a social enterprise driving transformation, our delivery model emphasizes listening to clients, engaging with local stakeholders and relevant policymakers, and drawing on subject-matter expertise. This inclusive approach fosters collaboration and creates opportunities for innovative solutions at every stage of the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process — From Dialogue to Results */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Methodology</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                From Dialogue to Results
              </h2>
              <p className="text-xl text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
                A proven four-step framework that ensures every engagement is grounded, collaborative, and impact-driven.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={step.title} className="relative group">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-8 h-px bg-primary-foreground/20 z-10" />
                  )}
                  <div className="bg-primary-foreground/[0.06] backdrop-blur-sm border border-primary-foreground/10 rounded-sm p-10 text-center hover:bg-primary-foreground/10 transition-all duration-500 h-full">
                    <span className="font-display text-6xl text-accent/20 block mb-6 leading-none">{String(i + 1).padStart(2, "0")}</span>
                    <div className={`w-18 h-18 ${step.color}/20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <step.icon className="text-accent" size={32} />
                    </div>
                    <h3 className="font-display text-2xl text-primary-foreground mb-3">{step.title}</h3>
                    <p className="text-primary-foreground/60 text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16">
              <div>
                <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Execution</span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                  How We <span className="text-accent italic">Deliver</span>
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Our delivery model enables us to engage with relevant local stakeholders, influencers, and subject matter experts for advice, increasing opportunities for innovative solutions at every stage.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {deliveryModel.map((item, i) => (
                <div
                  key={item.step}
                  className="bg-secondary border border-border rounded-sm p-8 group hover:border-accent/40 hover:shadow-lg transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="text-accent" size={28} />
                  </div>
                  <span className="font-display text-4xl text-accent/10 absolute top-6 right-6">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-accent transition-colors">{item.step}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Get Started</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">Ready to work together?</h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how TIGAAL can bring strategic insight and local expertise to your next initiative.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-accent text-accent-foreground text-lg font-semibold rounded-sm hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
          >
            Start a Conversation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Approach;
