import { Mail, Phone, Linkedin } from "lucide-react";

const InfoBar = () => {
  return (
    <div className="hidden md:block bg-primary text-primary-foreground text-xs">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <a
            href="tel:+252613926664"
            className="flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
          >
            <Phone size={13} className="text-accent" />
            +252 613 926 664
          </a>
          <a
            href="mailto:info@tigaal.com"
            className="flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
          >
            <Mail size={13} className="text-accent" />
            info@tigaal.com
          </a>
        </div>
        <a
          href="https://www.linkedin.com/company/tigaal/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary-foreground/85 hover:text-accent transition-colors"
          aria-label="TIGAAL on LinkedIn"
        >
          <Linkedin size={13} className="text-accent" />
          Follow us on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
