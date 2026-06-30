import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { MessageCircle, Search, Handshake, Target, ArrowRight, Lightbulb, Users, FlaskConical, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "Dialogue", desc: "Open conversations to understand the underlying problem and what success looks like.", color: "bg-accent" },
  { icon: Search, title: "Assessment", desc: "Review existing practice, evidence, tools, and outcomes to find what's working and what isn't.", color: "bg-primary" },
  { icon: Handshake, title: "Co-creation", desc: "Design strategies and partnerships with clients and local stakeholders for durable results.", color: "bg-accent" },
  { icon: Target, title: "Results", desc: "Deliver on time — with responsiveness, relevance, and measurable impact.", color: "bg-primary" },
];

const deliveryModel = [
  { icon: Lightbulb, step: "Understand", desc: "Listen closely, map context, and identify the real challenge beneath the surface." },
  { icon: Users, step: "Co-create", desc: "Work with stakeholders — from policymakers to communities — to shape locally grounded solutions." },
  { icon: FlaskConical, step: "Test", desc: "Validate approaches in the field and iterate based on evidence and feedback." },
  { icon: Rocket, step: "Implement", desc: "Deliver with local ownership, building capacity at every stage." },
  { icon: BarChart3, step: "Measure & Follow-up", desc: "Track results rigorously and sustain impact beyond the project timeline." },
];

const Approach = () => {
  return (
    <main>
      <PageHero title="Our Approach" subtitle="Every engagement calls for a tailored plan, not a template." breadcrumb="Our Approach" />

      {/* Quote & Overview */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Our Philosophy</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.05] tracking-tight">
                Local problems need local solutions.
              </h2>
            </div>
            <div className="space-y-6 lg:pt-8">
              <p className="text-lg lg:text-xl text-muted-foreground leading-[1.75] font-light">
                We're distinctive in how we approach, manage, and deliver work. Our model rests on a simple conviction: local problems need local solutions. As a social enterprise, we listen first — to clients, to local stakeholders, and to the subject-matter experts closest to the issue.
              </p>
              <p className="text-lg lg:text-xl text-muted-foreground leading-[1.75] font-light">
                This inclusive way of working keeps our analysis grounded, our recommendations practical, and our solutions accountable to the people they affect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-28 lg:py-40 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Methodology</span>
                <div className="h-px w-10 bg-accent" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-primary-foreground mb-6 leading-[1.05] tracking-tight">
                From dialogue to results.
              </h2>
              <p className="text-lg text-primary-foreground/70 leading-relaxed font-light">
                A four-step framework that keeps every engagement grounded, collaborative, and outcome-focused.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="bg-primary-foreground/[0.04] border border-primary-foreground/10 rounded-2xl p-10 hover:bg-primary-foreground/[0.07] transition-all duration-500">
                  <span className="font-display text-5xl text-accent/30 block mb-6 leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-primary-foreground mb-3">{step.title}</h3>
                  <p className="text-primary-foreground/65 leading-relaxed font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-accent" />
                  <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Execution</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.05] tracking-tight">
                  How we deliver.
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-lg lg:text-xl text-muted-foreground leading-[1.75] font-light">
                  Our delivery model brings together local stakeholders, influencers, and subject-matter experts — opening up space for innovation at every stage of the work.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {deliveryModel.map((item, i) => (
                <div
                  key={item.step}
                  className="bg-background border border-border/60 rounded-2xl p-8 hover:border-accent/40 hover:shadow-md transition-all duration-500 relative"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="text-accent" size={22} />
                  </div>
                  <span className="font-display text-3xl text-accent/20 absolute top-6 right-6">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl text-foreground mb-3">{item.step}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-[15px]">{item.desc}</p>
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
          <p className="text-lg text-muted-foreground mb-10 font-light leading-relaxed">
            Let's talk about how TIGAAL's mix of local insight and rigorous methods can support your next initiative.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all"
          >
            Start a conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Approach;
