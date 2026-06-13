import { MapPin, Shield, Users, Cpu, ArrowRight, DollarSign } from "lucide-react";

const whyChoose = [
  { icon: MapPin, title: "Deep Local Knowledge", desc: "Our team is embedded in Somalia's development ecosystem — fluent in the political dynamics, clan structures, security realities, and cultural nuances that determine whether programmes succeed." },
  { icon: Shield, title: "Rigorous Methodology", desc: "We apply international research and evaluation standards, adapted for the Somali context. Our work is trusted by the World Bank, Save the Children, Interpeace, and other leading institutions." },
  { icon: Users, title: "Established Networks", desc: "Long-standing relationships across federal and regional government, UN agencies, international NGOs, and local civil society enable rapid mobilisation and reliable stakeholder access." },
  { icon: Cpu, title: "Technology-Enabled", desc: "Modern data collection tools, live dashboards, and analytical platforms give clients real-time insight and consistent data quality across dispersed operations." },
  { icon: ArrowRight, title: "End-to-End Capability", desc: "From scoping research and programme design through delivery, third-party monitoring, and strategic communications — one trusted partner instead of several." },
  { icon: DollarSign, title: "Cost-Effective", desc: "As a locally established firm, TIGAAL offers competitive pricing without compromising quality — better value than international firms with heavier overheads." },
];

const WhyChoose = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Our Edge
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Why Choose TIGAAL
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            When selecting a research, advisory, or monitoring partner for operations in Somalia and the Horn of Africa, the decision should be guided by demonstrated capability, contextual depth, and a track record of delivering results under challenging conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item) => (
            <div key={item.title} className="bg-background rounded-sm p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center mb-5">
                <item.icon className="text-accent" size={20} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
