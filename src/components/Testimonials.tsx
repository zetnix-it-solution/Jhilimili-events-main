import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Our wedding was magical thanks to text: "Our wedding was magical thanks to Jhilimili Events. Every detail was absolutely perfect and beyond our expectations.",. Every detail was absolutely perfect and beyond our expectations.",
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

  return (
    <section className="section-padding bg-light-teal" ref={ref}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="bg-card p-8 rounded-xl shadow-md relative"
            >
              <Quote className="text-primary/20 absolute top-4 right-4" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-primary">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
