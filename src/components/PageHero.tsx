import { Link } from "react-router-dom";
import teamImg1 from "@/assets/team-workshop-1.jpg";
import teamImg2 from "@/assets/team-presentation-1.jpg";
import teamImg3 from "@/assets/team-workshop-3.jpg";

const heroImages: Record<string, string> = {
  "Who We Are": teamImg1,
  "Services": teamImg2,
  "Our Approach": teamImg3,
  "Projects": teamImg1,
  "Our Team": teamImg2,
  "Partners": teamImg3,
  "Contact": teamImg1,
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  const bgImage = heroImages[breadcrumb || title] || teamImg1;

  return (
    <section className="relative h-[400px] md:h-[480px] flex items-end overflow-hidden">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        style={{ animation: "ken-burns 25s ease-out forwards" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-14 md:pb-20">
        {breadcrumb && (
          <div className="text-primary-foreground/50 text-xs tracking-[0.2em] uppercase mb-4 animate-fade-in">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-3">—</span>
            <span className="text-primary-foreground/70">{breadcrumb}</span>
          </div>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-4 animate-slide-up-fade">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed animate-slide-up-fade" style={{ animationDelay: "0.1s" }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Geometric accent */}
      <div className="absolute bottom-0 right-0 w-40 h-40 border-l-2 border-t-2 border-accent/20 hidden lg:block" />
    </section>
  );
};

export default PageHero;
