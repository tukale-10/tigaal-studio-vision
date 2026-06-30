import { Link } from "react-router-dom";
import teamImg1 from "@/assets/team-workshop-1.jpg";
import teamImg2 from "@/assets/team-presentation-1.jpg";
import teamImg3 from "@/assets/team-workshop-3.jpg";
import trainingSession1 from "@/assets/training-session-1.jpg";
import groupWorkshop from "@/assets/group-workshop.jpg";
import mogadishuSkyline from "@/assets/mogadishu-skyline.jpg";
import mogadishuWaterfront from "@/assets/mogadishu-waterfront.jpg";

const heroImages: Record<string, string> = {
  "Who We Are": teamImg1,
  "Services": trainingSession1,
  "Capabilities": trainingSession1,
  "Our Approach": groupWorkshop,
  "Projects": mogadishuSkyline,
  "Our Team": teamImg2,
  "Partners": mogadishuWaterfront,
  "Contact": teamImg3,
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  const bgImage = heroImages[breadcrumb || title] || teamImg1;

  return (
    <section className="relative h-[440px] md:h-[520px] flex items-end overflow-hidden">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        style={{ animation: "ken-burns 25s ease-out forwards" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/10" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16 md:pb-24">
        {breadcrumb && (
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <div className="h-px w-8 bg-accent" />
            <div className="text-primary-foreground/70 text-[11px] tracking-[0.32em] uppercase font-semibold">
              <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="mx-3 opacity-50">/</span>
              <span className="text-accent">{breadcrumb}</span>
            </div>
          </div>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-[4rem] text-primary-foreground leading-[1.05] tracking-tight mb-5 animate-slide-up-fade max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl leading-relaxed font-light animate-slide-up-fade" style={{ animationDelay: "0.1s" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
