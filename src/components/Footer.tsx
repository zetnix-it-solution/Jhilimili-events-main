import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const logoSrc = "/logo.jpg";

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoSrc}
                alt="Jhilimili Events"
                className="h-14 w-auto rounded-md object-contain"
              />
              <div className="leading-tight">
                <span className="block font-display text-2xl font-bold tracking-wide text-primary">
                  Jhilimili
                </span>
                <span className="block font-heading text-xs tracking-[0.24em] uppercase text-primary-foreground/60">
                  Events
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Turning your dream events into beautiful memories. Nepal's premier event planning company.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Portfolio", "Packages", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2">
              {["Wedding Planning", "Corporate Events", "Birthday Celebrations", "Engagement Ceremony", "Destination Wedding"].map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="text-primary shrink-0" />
                +977-9800000000
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="text-secondary shrink-0" />
                info@kiklimalaevents.com
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                Kathmandu, Nepal
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Jhilimili Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
