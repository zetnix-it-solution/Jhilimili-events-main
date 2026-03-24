import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Palette, Wallet, ClipboardCheck } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Professional Planners",
    description: "Our experienced team ensures every detail is perfect.",
  },
  {
    icon: Palette,
    title: "Creative Themes",
    description: "Unique, customized themes that reflect your personality.",
  },
  {
    icon: Wallet,
    title: "Affordable Packages",
    description: "Premium quality events that fit your budget.",
  },
  {
    icon: ClipboardCheck,
    title: "Complete Management",
    description: "End-to-end event management for a stress-free experience.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
            >
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-slate-50 group-hover:bg-primary/5 transition-all duration-500" />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105">
                <reason.icon className="text-foreground/70" size={24} />
              </div>

              <h3 className="font-heading text-lg font-bold text-foreground mb-2.5 relative">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
