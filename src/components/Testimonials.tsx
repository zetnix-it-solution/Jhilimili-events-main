import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Our wedding was magical thanks to Jhilimili Events. Every detail was absolutely perfect and beyond our expectations.",
  },
  {
    name: "Rajesh Thapa",
    role: "Corporate Client",
    text: "The corporate event they organized was outstanding. Professional, creative, and perfectly executed from start to finish.",
  },
  {
    name: "Anita Gurung",
    role: "Birthday Client",
    text: "My daughter's birthday was a dream come true! The team created a fairytale atmosphere that everyone loved.",
  },
];

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="section-padding bg-[#f9f9fb] relative overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <div className="w-20 h-0.5 gradient-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-card p-10 relative group hover:scale-[1.02] transition-all duration-500"
            >
              <Quote className="text-primary/10 absolute top-6 right-8 group-hover:text-primary/20 transition-colors" size={60} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-slate-600 mb-8 italic leading-relaxed text-sm md:text-base relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-heading font-bold text-primary text-xs">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
