import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Palette, Wallet, ClipboardCheck } from "lucide-react";

const reasons = [
  { icon: Users, title: "Professional Planners", description: "Our experienced team ensures every detail is perfect." },
  { icon: Palette, title: "Creative Themes", description: "Unique, customized themes that reflect your personality." },
  { icon: Wallet, title: "Affordable Packages", description: "Premium quality events that fit your budget." },
  { icon: ClipboardCheck, title: "Complete Management", description: "End-to-end event management for a stress-free experience." },
];

const WhyChooseUs = () => {
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
          <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Why Us</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <div className="w-20 h-0.5 gradient-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-xl glass-card hover-lift"
            >
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-5">
                <reason.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{reason.title}</h3>
              <p className="text-muted-foreground text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
