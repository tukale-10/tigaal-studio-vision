import { MapPin, Shield, Users, Cpu, ArrowRight, DollarSign } from "lucide-react";

const whyChoose = [
  { icon: MapPin, title: "Deep Local Knowledge", desc: "Our team is embedded in Somalia's development ecosystem — fluent in the political dynamics, clan structures, security realities, and cultural nuances that determine whether programmes succeed." },
  { icon: Shield, title: "Rigorous Methodology", desc: "International research and evaluation standards, adapted for the Somali context — trusted by the World Bank, Save the Children, Interpeace, and other leading institutions." },
  { icon: Users, title: "Established Networks", desc: "Long-standing relationships across federal and regional government, UN agencies, international NGOs, and local civil society enable rapid mobilisation and reliable stakeholder access." },
  { icon: Cpu, title: "Technology-Enabled", desc: "Modern data collection tools, live dashboards, and analytical platforms give clients real-time insight and consistent data quality across dispersed operations." },
  { icon: ArrowRight, title: "End-to-End Capability", desc: "From scoping research and programme design through delivery, third-party monitoring, and strategic communications — one trusted partner instead of several." },
  { icon: DollarSign, title: "Cost-Effective", desc: "As a locally established firm, TIGAAL offers competitive pricing without compromising quality — better value than international firms with heavier overheads." },
];

const WhyChoose = () => {
  return (
    <section className="py-28 lg:py-40 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-accent" />
            <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">
              Our Edge
            </span>
            <div className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground mb-8 leading-[1.1] tracking-tight">
            Why partners choose TIGAAL.
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.75] font-light">
            Choosing a research, advisory, or monitoring partner in the Horn of Africa comes down to demonstrated capability, contextual depth, and a track record of delivering under challenging conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item) => (
            <div key={item.title} className="bg-background rounded-2xl p-10 border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="text-accent" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
