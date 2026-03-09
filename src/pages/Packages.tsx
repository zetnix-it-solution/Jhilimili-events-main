import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";

const packages = [
  {
    name: "Basic Package",
    price: "NPR 50,000",
    description: "Perfect for intimate gatherings and small celebrations.",
    features: ["Basic venue decoration", "Standard photography (4 hours)", "Event coordination", "Standard theme setup", "Basic floral arrangements"],
    popular: false,
  },
  {
    name: "Premium Package",
    price: "NPR 1,50,000",
    description: "Our most popular package for memorable celebrations.",
    features: ["Complete venue decoration", "Professional photography & videography", "Full venue management", "Custom theme design", "Premium floral arrangements", "Complete planning support", "Entertainment coordination"],
    popular: true,
  },
  {
    name: "Luxury Package",
    price: "NPR 3,00,000",
    description: "The ultimate event experience with no compromises.",
    features: ["Premium luxury decoration", "Cinematic photography & videography", "Full venue management", "Exclusive bespoke theme", "Luxury floral design", "End-to-end planning", "Post-event coordination", "VIP guest management", "Custom invitations"],
    popular: false,
  },
];

const Packages = () => {
  return (
    <>
      <section className="relative py-32 pt-40 bg-soft-pink">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Pricing</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">Our Packages</h1>
            <div className="w-20 h-0.5 gradient-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">Choose the perfect package for your event. All packages can be customized to fit your needs.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                <p className="font-display text-lg mb-2">{pkg.price}</p>
                <p className={`text-sm mb-6 ${pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {pkg.description}
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

      <ContactCTA />
    </>
  );
};

export default Packages;
