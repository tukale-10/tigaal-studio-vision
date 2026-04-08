import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/tigaal-logo.webp";

const navLinks = [
  { label: "Who We Are", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Our Approach", path: "/approach" },
  { label: "Projects", path: "/projects" },
  { label: "Our Team", path: "/team" },
  { label: "Partners", path: "/partners" },
  {
    label: "Resources",
    path: "/resources",
    children: [
      { label: "News & Updates", path: "/resources/news" },
      { label: "Publications", path: "/resources/publications" },
    ],
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navBg = isScrolled || !isHome
    ? "bg-primary shadow-lg"
    : "bg-transparent";

  const isResourcesActive = location.pathname.startsWith("/resources");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="TIGAAL Consulting" className="h-10 brightness-0 invert" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isResourcesActive
                        ? "text-accent"
                        : "text-primary-foreground/90 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-primary border border-primary-foreground/10 rounded-sm shadow-xl animate-fade-in overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-5 py-3 text-sm font-medium transition-colors border-b border-primary-foreground/5 last:border-0 ${
                            location.pathname === child.path
                              ? "text-accent bg-accent/5"
                              : "text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "text-accent"
                      : "text-primary-foreground/90 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-md hover:bg-accent/90 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-primary border-t border-primary-foreground/10 pb-6 animate-fade-in">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors ${
                      isResourcesActive
                        ? "text-accent"
                        : "text-primary-foreground/90 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-6 border-l-2 border-accent/20 ml-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMobileOpen(false);
                            setOpenDropdown(null);
                          }}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors relative z-10 ${
                            location.pathname === child.path
                              ? "text-accent"
                              : "text-primary-foreground/70 hover:text-accent"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-accent"
                      : "text-primary-foreground/90 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="px-4 pt-2">
              <Link
                to="/contact"
                className="block text-center px-6 py-2.5 bg-accent text-accent-foreground text-sm font-semibold rounded-md"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
