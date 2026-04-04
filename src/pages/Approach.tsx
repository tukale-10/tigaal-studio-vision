import PageHero from "@/components/PageHero";
import { MessageCircle, Search, Handshake, Target } from "lucide-react";

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

      {/* Approach Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <blockquote className="border-l-4 border-accent pl-6 py-4 mb-10 bg-secondary rounded-r-lg">
            <p className="text-xl font-medium text-foreground italic">
              "Every project calls for a smart plan, not a benchmark"
            </p>
          </blockquote>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            We are distinctive in the way we approach, handle, and execute projects. Our delivery model is rooted in a simple conviction: local problems need local solutions. As a social transformation company, we listen to our clients, engage relevant local stakeholders and subject matter experts, and create opportunities for innovative solutions at every stage of the project lifecycle.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            "Local problems need local solutions" is the principle that guides all our work. As a social enterprise driving transformation, our delivery model emphasizes listening to clients, engaging with local stakeholders and relevant policymakers, and drawing on subject-matter expertise. This inclusive approach fosters collaboration and creates opportunities for innovative solutions at every stage of the process.
          </p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-14">Our 4-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5 relative">
                  <step.icon className="text-accent" size={32} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">How We Do It</h2>
          <p className="text-muted-foreground text-center text-lg mb-12">
            Our delivery model enables us to engage with relevant local stakeholders, influencers, and subject matter experts for advice, increasing opportunities for innovative solutions at every stage.
          </p>
          <div className="space-y-6">
            {deliveryModel.map((item, i) => (
              <div key={item.step} className="flex items-start gap-6 bg-secondary rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.step}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Approach;
