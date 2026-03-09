import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "Starting from NPR 50,000",
    features: ["Venue decoration", "Basic photography", "Event coordination", "Standard theme setup"],
    popular: false,
  },
  {
    name: "Premium",
    price: "Starting from NPR 1,50,000",
    features: ["Complete decoration", "Professional photography & videography", "Venue management", "Custom theme design", "Planning support"],
    popular: true,
  },
  {
    name: "Luxury",
    price: "Starting from NPR 3,00,000",
    features: ["Premium decoration", "Cinematic photography & videography", "Full venue management", "Exclusive theme design", "End-to-end planning", "Post-event coordination"],
    popular: false,
  },
];

const PackagesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Pricing</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Our Packages</h2>
          <div className="w-20 h-0.5 gradient-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`rounded-xl p-8 relative ${
                pkg.popular
                  ? "gradient-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-card shadow-lg border border-border"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className={`text-sm mb-6 ${pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {pkg.price}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={pkg.popular ? "text-accent" : "text-secondary"} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3 rounded-full font-medium text-sm transition-opacity hover:opacity-90 ${
                  pkg.popular
                    ? "bg-primary-foreground text-primary"
                    : "gradient-primary text-primary-foreground"
                }`}
              >
                Book Consultation
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
