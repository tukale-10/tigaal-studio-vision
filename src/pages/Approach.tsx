import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Handshake, Target, ArrowRight } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Dialogue", desc: "Engage in open dialogue to understand underlying problems and priorities." },
  { icon: Search, title: "Assessment", desc: "Assess existing practices, activities, tools, and outcomes." },
  { icon: Handshake, title: "Co-creation", desc: "Co-create strategies and build alliances to achieve sustainable solutions." },
  { icon: Target, title: "Results", desc: "Deliver results within agreed timelines, ensuring responsiveness, relevance, and impact." },
];

const deliveryModel = [
  { step: "Understand", desc: "Listen to clients and understand the context" },
  { step: "Co-create", desc: "Collaborate with stakeholders on solutions" },
  { step: "Test", desc: "Validate approaches in real-world settings" },
  { step: "Implement", desc: "Deploy solutions with local ownership" },
  { step: "Measure & Follow-up", desc: "Track results and ensure sustainability" },
];

const Approach = () => {
  return (
    <main>
      <PageHero title="Our Approach" subtitle="Every project calls for a smart plan, not a benchmark" breadcrumb="Our Approach" />

      {/* Quote & Overview */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-px bg-accent mx-auto mb-8" />
            <blockquote className="font-display text-2xl md:text-3xl text-foreground italic leading-snug mb-8">
              "Every project calls for a smart plan, not a benchmark"
            </blockquote>
            <div className="w-16 h-px bg-accent mx-auto" />
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              We are distinctive in the way we approach, handle, and execute projects. Our delivery model is rooted in a simple conviction: local problems need local solutions. As a social transformation company, we listen to our clients, engage relevant local stakeholders and subject matter experts, and create opportunities for innovative solutions at every stage of the project lifecycle.
            </p>
            <p>
              "Local problems need local solutions" is the principle that guides all our work. As a social enterprise driving transformation, our delivery model emphasizes listening to clients, engaging with local stakeholders and relevant policymakers, and drawing on subject-matter expertise. This inclusive approach fosters collaboration and creates opportunities for innovative solutions at every stage of the process.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Methodology</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground">Our 4-Step Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10 max-w-5xl mx-auto rounded-sm overflow-hidden">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-primary p-8 lg:p-10 text-center group hover:bg-primary-foreground/5 transition-all duration-500">
                <span className="font-display text-5xl text-accent/20 block mb-4">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-16 h-16 bg-accent/10 rounded-sm flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="text-accent" size={26} />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">{step.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Execution</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">How We Do It</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our delivery model enables us to engage with relevant local stakeholders, influencers, and subject matter experts for advice, increasing opportunities for innovative solutions at every stage.
            </p>
          </div>

          <div className="space-y-0">
            {deliveryModel.map((item, i) => (
              <div
                key={item.step}
                className={`flex items-start gap-6 p-8 border-t border-border hover:bg-accent/[0.03] transition-all duration-500 group ${i === deliveryModel.length - 1 ? "border-b" : ""}`}
              >
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-sm flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-accent transition-colors">{item.step}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Ready to work together?</h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Start a Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Approach;
