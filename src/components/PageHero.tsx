import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  return (
    <section className="relative h-[340px] md:h-[400px] flex items-center justify-center overflow-hidden">
      <img
        src={aboutHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative z-10 text-center px-4">
        {breadcrumb && (
          <div className="text-primary-foreground/60 text-sm mb-3">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-primary-foreground/80">{breadcrumb}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">{title}</h1>
        {subtitle && (
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
