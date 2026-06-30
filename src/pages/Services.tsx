import { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Scale, Heart } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { optimizedImage } from "@/lib/image";
import { slugifyTitle } from "@/lib/slug";
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
    desc: "A vibrant social sector is essential for resilience and well-being. As a social enterprise, TIGAAL works with NGOs, government agencies, and community organizations to strengthen healthcare, education, social services, and social protection systems. Our focus includes advancing inclusive access to social safety nets, shock-responsive and adaptive programs, and sustainable livelihoods. We deliver training on social sector and protection priorities, conduct evidence-based research, and advocate for reforms that promote equity, resilience, and lasting impact.",
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
      <PageHero title="Our Capabilities" subtitle="Research, advisory, and learning services for development and the public sector." breadcrumb="Capabilities" />

      <section className="py-28 lg:py-40">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">What We Deliver</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-foreground mb-8 leading-[1.1] tracking-tight">
                Integrated solutions for complex challenges.
              </h2>
              <p className="text-lg text-muted-foreground leading-[1.75] font-light">
                We combine policy research, strategic advisory, communications, and monitoring & evaluation into integrated capabilities — grounded in evidence, informed by local knowledge, and tailored to the contexts where we work.
              </p>
            </div>
            <div className="relative">
              <img src={groupWorkshop} alt="TIGAAL team in action" className="w-full h-[460px] object-cover rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-8 py-5 rounded-2xl shadow-lg">
                <span className="font-display text-3xl tracking-tight">{services.length || "9"}+</span>
                <span className="text-sm ml-2 opacity-90">Capabilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 lg:pb-40">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          {loading ? (
            <div className="space-y-20">{[...Array(3)].map((_, i) => <div key={i} className="h-96 bg-secondary rounded-2xl animate-pulse" />)}</div>
          ) : (
            <div className="space-y-8">
              {services.map((service, i) => {
                const isEven = i % 2 === 0;
                const IconComp = getIcon(service.icon_name);
                const slug = slugifyTitle(service.title);
                return (
                  <Link to={`/services/${slug}`} key={service.id} className="grid lg:grid-cols-2 gap-0 items-stretch group block bg-background border border-border/60 rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-500">
                    <div className={`relative overflow-hidden h-[320px] lg:h-auto min-h-[400px] ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      {service.image_url ? (
                        <img
                          src={optimizedImage(service.image_url, { width: 1000, quality: 65 })}
                          alt={service.title}
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={i === 0 ? "high" : "low"}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-secondary" />
                      )}
                      <div className="absolute top-6 left-6">
                        <span className="text-primary-foreground/60 font-display text-6xl tracking-tight">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                    <div className={`p-10 lg:p-14 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                        <IconComp className="text-accent" size={24} />
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-5 leading-snug tracking-tight group-hover:text-accent transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-[1.75] mb-8 line-clamp-4 font-light">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.highlights.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                            <CheckCircle2 size={12} />{tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold">
                        Explore capability <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-28 lg:py-40 bg-primary">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-accent" />
              <span className="text-accent text-[11px] font-semibold tracking-[0.32em] uppercase">Program Design</span>
              <div className="h-px w-10 bg-accent" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-primary-foreground mb-6 leading-[1.1] tracking-tight">Program design & development.</h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed font-light">
              We co-create policies, programmes, and services with clients and communities — defining the problem together and designing solutions that work in context.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {programDesign.map((item) => (
              <div key={item.title} className="group rounded-2xl overflow-hidden border border-primary-foreground/10 hover:border-accent/30 transition-all duration-500 bg-primary-foreground/[0.03]">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                  <div className="absolute bottom-6 left-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <item.icon className="text-accent" size={22} />
                    </div>
                    <h3 className="font-display text-xl text-primary-foreground tracking-tight">{item.title}</h3>
                  </div>
                </div>
                <div className="p-10">
                  <p className="text-primary-foreground/70 leading-[1.75] font-light text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-[1.1] tracking-tight">Looking for a tailored solution?</h2>
          <p className="text-muted-foreground text-lg mb-10 font-light leading-relaxed">Tell us about your context and the questions you're trying to answer — we'll come back with a focused proposal.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-all">
            Discuss your project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
