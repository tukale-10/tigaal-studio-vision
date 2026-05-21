import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import logo from "@/assets/tigaal-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <img src={logo} alt="TIGAAL" className="h-8 brightness-0 invert mb-4" />
            <p className="text-primary-foreground/90 text-sm leading-relaxed font-medium">
              TIGAAL is a social enterprise delivering research, analysis, and development projects across Somalia and the Horn of Africa — sustained by our consulting practice, which reinvests in our mission-driven work.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Who We Are", path: "/about" },
                { label: "Capabilities", path: "/services" },
                { label: "Our Approach", path: "/approach" },
                { label: "Projects", path: "/projects" },
                { label: "Our Team", path: "/team" },
                { label: "Partners", path: "/partners" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/90 hover:text-accent text-sm font-semibold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">Capabilities</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/90 font-semibold">
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
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/90 font-semibold">
                <Phone size={16} className="mt-0.5 text-accent flex-shrink-0" />
                +252 613 926 664
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/90 font-semibold">
                <Mail size={16} className="mt-0.5 text-accent flex-shrink-0" />
                info@tigaal.com
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/90 font-semibold">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                Airport Road, Wadajir District, Mogadishu
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/90 font-semibold">
                <Globe size={16} className="mt-0.5 text-accent flex-shrink-0" />
                www.tigaal.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex items-center justify-between text-sm text-primary-foreground/70 font-medium">
          <span>© {new Date().getFullYear()} TIGAAL Consulting. All rights reserved.</span>
          <Link to="/admin" className="hover:text-accent transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
