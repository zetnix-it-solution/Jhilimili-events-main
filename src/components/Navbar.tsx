import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoSrc = "/logo.jpg";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isHomePage = location.pathname === "/";
  const showSolidNav = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ease-in-out print:hidden ${showSolidNav
        ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        : "bg-transparent"
        }`}
      style={{
        paddingTop: showSolidNav ? "0.75rem" : "1.25rem",
        paddingBottom: showSolidNav ? "0.75rem" : "1.25rem",
      }}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="relative z-10 flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Jhilimili Events"
            className="h-12 w-auto rounded-md object-contain shadow-sm"
          />
          <div className="leading-tight">
            <span
              className={`block font-display text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300 ${showSolidNav ? "text-primary" : "text-white drop-shadow-lg"
                }`}
            >
              Jhilimili
            </span>
            <span
              className={`block font-heading text-[10px] md:text-xs tracking-[0.24em] uppercase transition-colors duration-300 ${showSolidNav ? "text-muted-foreground" : "text-white/90 drop-shadow-md"
                }`}
            >
              Events
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 py-1 ${location.pathname === link.path
                ? showSolidNav ? "text-primary" : "text-accent"
                : showSolidNav ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white drop-shadow-md"
                }`}
            >
              {link.label}
              <span className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${location.pathname === link.path
                ? "w-full gradient-primary"
                : showSolidNav ? "w-0 group-hover:w-full bg-primary" : "w-0 group-hover:w-full bg-white"
                }`} />
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-2">
            <Link
              to="/contact"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${showSolidNav
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white/50 text-white hover:bg-white hover:text-primary"
                }`}
            >
              Custom Request
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden relative z-10 p-2 transition-colors duration-300 ${showSolidNav ? "text-foreground" : "text-white drop-shadow-lg"
            }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-screen bg-white z-[2000] lg:hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-[25px] right-[25px] p-2 text-foreground hover:text-primary transition-colors duration-200 z-10"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              {/* Menu Content */}
              <div className="flex flex-col items-center justify-center h-full gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`text-3xl font-display font-medium transition-colors duration-200 ${location.pathname === link.path
                        ? "text-[#C2187A]"
                        : "text-[#1A1A1A] hover:text-[#1BA6B2]"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="mt-4 flex flex-col gap-4 w-full px-10"
                >
                  <Link
                    to="/contact"
                    className="w-full text-center px-8 py-3.5 rounded-full text-lg font-medium border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Custom Request
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
