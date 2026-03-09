import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ctaBg from "@/assets/cta-bg.jpg";

const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/70" />

      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-accent mb-4">Ready?</p>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Let's Create Your
            <br />
            <span className="text-accent">Perfect Event</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
            From intimate gatherings to grand celebrations, we bring your vision to life with elegance and precision.
          </p>
          <Link
            to="/contact"
            className="gradient-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity inline-block shadow-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
