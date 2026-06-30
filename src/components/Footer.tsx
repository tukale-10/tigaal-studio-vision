import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import logo from "@/assets/tigaal-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* About */}
          <div>
            <img src={logo} alt="TIGAAL" className="h-9 brightness-0 invert mb-6" />
            <p className="text-primary-foreground/85 text-[15px] leading-[1.75] font-normal">
              A Somali-led social enterprise delivering research, analysis, and development programmes across Somalia, Kenya, and Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-accent" />
              <h4 className="text-[10px] font-semibold tracking-[0.32em] uppercase text-accent">Quick Links</h4>
            </div>
            <ul className="space-y-3">
              {[
                { label: "Who We Are", path: "/about" },
                { label: "Capabilities", path: "/services" },
                { label: "Our Approach", path: "/approach" },
                { label: "Projects", path: "/projects" },
                { label: "Our Team", path: "/team" },
                { label: "Clients", path: "/partners" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/85 hover:text-accent text-sm font-normal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-accent" />
              <h4 className="text-[10px] font-semibold tracking-[0.32em] uppercase text-accent">Capabilities</h4>
            </div>
            <ul className="space-y-3 text-sm text-primary-foreground/85 font-normal">
              <li>Capacity Development & Trainings</li>
              <li>Monitoring, Evaluation & Learning</li>
              <li>Strategic Communication & PR</li>
              <li>Market Studies & Assessments</li>
              <li>Climate Resilience & Adaptation</li>
              <li>Private Sector Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-accent" />
              <h4 className="text-[10px] font-semibold tracking-[0.32em] uppercase text-accent">Contact</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/85 font-normal">
                <Phone size={15} className="mt-0.5 text-accent flex-shrink-0" />
                +252 613 926 664
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/85 font-normal">
                <Mail size={15} className="mt-0.5 text-accent flex-shrink-0" />
                info@tigaal.com
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/85 font-normal">
                <MapPin size={15} className="mt-0.5 text-accent flex-shrink-0" />
                Airport Road, Wadajir District, Mogadishu
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/85 font-normal">
                <Globe size={15} className="mt-0.5 text-accent flex-shrink-0" />
                www.tigaal.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-primary-foreground/10 text-xs text-primary-foreground/70 font-normal text-center tracking-wide">
          © {new Date().getFullYear()} TIGAAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
