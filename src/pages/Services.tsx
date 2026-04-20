import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Scale, Heart } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import groupWorkshop from "@/assets/group-workshop.jpg";
import trainingSession1 from "@/assets/training-session-1.jpg";
import communityYouth from "@/assets/community-youth.jpg";

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  image_url: string | null;
  highlights: string[];
  display_order: number;
}

const programDesign = [
  {
    icon: Scale,
    title: "Governance & Rule of Law",
    desc: "Strong governance and effective rule of law are cornerstones of peace, stability, and inclusive development. This portfolio provides integrated support to strengthen public institutions, enhance transparency, and promote citizen trust in governance systems. Our approach combines rigorous policy research, institutional diagnostics, and capacity development with practical advisory services tailored to fragile and conflict-affected contexts. Our work also includes supporting justice sector institutions in improving access, efficiency, and responsiveness to citizens' needs. By applying global best practices and conflict-sensitive methodologies, we help shape reforms that align with democratic principles and foster sustainable state-building.",
    image: trainingSession1,
  },
  {
    icon: Heart,
    title: "Social Sector Development",
    desc: "A vibrant social sector is essential for resilience and well-being. As a social enterprise, Tigaal works with NGOs, government agencies, and community organizations to strengthen healthcare, education, social services, and social protection systems. Our focus includes advancing inclusive access to social safety nets, shock-responsive and adaptive programs, and sustainable livelihoods. We deliver training on social sector and protection priorities, conduct evidence-based research, and advocate for reforms that promote equity, resilience, and lasting impact.",
    image: communityYouth,
  },
];

const getIcon = (name: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>;
  return icons[name] || LucideIcons.Briefcase;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("services").select("*").eq("published", true).order("display_order");
      setServices((data as Service[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <main>
      <PageHero title="Our Capabilities" subtitle="Research, Training, and Advocacy for a Better Tomorrow" breadcrumb="Capabilities" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">What We Deliver</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                Integrated Solutions for <span className="text-accent italic">Complex</span> Challenges
              </h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide integrated capabilities that combine policy research, strategic advisory, communication for development, and monitoring and evaluation. Grounded in evidence, informed by local knowledge, and enriched with innovative analytics, our solutions are tailored to local contexts where we work and designed to strengthen systems, empower communities, and drive sustainable impact.
              </p>
            </div>
            <div className="relative">
              <img src={groupWorkshop} alt="Tigaal team in action" className="w-full h-[400px] object-cover rounded-sm" />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-8 py-5 rounded-sm">
                <span className="font-display text-3xl">{services.length || "7"}+</span>
                <span className="text-sm ml-2 opacity-90">Core Capability Areas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {loading ? (
            <div className="space-y-20">{[...Array(3)].map((_, i) => <div key={i} className="h-96 bg-secondary rounded-sm animate-pulse" />)}</div>
          ) : (
            <div className="space-y-20 lg:space-y-28">
              {services.map((service, i) => {
                const isEven = i % 2 === 0;
                const IconComp = getIcon(service.icon_name);
                return (
                  <div key={service.id} className={`grid lg:grid-cols-2 gap-0 items-stretch group`}>
                    <div className={`relative overflow-hidden h-[320px] lg:h-auto min-h-[400px] ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {service.image_url ? (
                        <img src={service.image_url} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-secondary" />
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-primary/30 to-transparent`} />
                      <div className="absolute top-6 left-6">
                        <span className="text-primary-foreground/40 font-display text-6xl lg:text-7xl font-bold">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                    <div className={`bg-secondary p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                        <IconComp className="text-accent" size={24} />
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-5 leading-snug">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
                            <CheckCircle2 size={12} />{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Program Design</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">Program Design & Development</h2>
            <p className="text-primary-foreground/60 text-lg max-w-3xl mx-auto leading-relaxed">
              We 'co-create' policies, programs, and services by collaborating with clients and communities. Together, we define challenges and design solutions, particularly focusing on the following areas:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {programDesign.map((item) => (
              <div key={item.title} className="group rounded-sm overflow-hidden border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-sm flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <item.icon className="text-accent" size={22} />
                    </div>
                    <h3 className="font-display text-xl text-primary-foreground">{item.title}</h3>
                  </div>
                </div>
                <div className="p-8 bg-primary-foreground/5 backdrop-blur-sm">
                  <p className="text-primary-foreground/60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">Get Started</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">Need a tailored solution?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">Let's discuss how our integrated capabilities can address your unique challenges and drive lasting impact.</p>
          <Link to="/contact" className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all text-lg">
            Discuss Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
