import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/70 to-foreground/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,214,173,0.15),transparent_42%)]" />

      {/* Decorative Mandala SVGs */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-96 h-96 opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-white fill-none stroke-current stroke-[0.5]">
          <circle cx="100" cy="100" r="90" />
          <path d="M100 10 L100 190 M10 100 L190 100 M36.4 36.4 L163.6 163.6 M36.4 163.6 L163.6 36.4" />
          <circle cx="100" cy="100" r="70" strokeDasharray="5,5" />
          <circle cx="100" cy="100" r="50" />
        </svg>
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] opacity-[0.07] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-white fill-none stroke-current stroke-[0.3]">
          <circle cx="100" cy="100" r="95" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="100" y1="100" x2={100 + 95 * Math.cos((i * 30 * Math.PI) / 180)} y2={100 + 95 * Math.sin((i * 30 * Math.PI) / 180)} />
          ))}
          <circle cx="100" cy="100" r="60" />
        </svg>
      </motion.div>

      <div className="relative z-20 text-center container-custom pt-24 md:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 rounded-full border border-primary-foreground/30 font-display text-xs md:text-sm tracking-[0.28em] uppercase text-accent mb-6 bg-primary-foreground/5 shadow-sm"
        >
          Premium Event Planning in Nepal
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-6 max-w-5xl mx-auto drop-shadow-2xl tracking-tight"
        >
          Turning Dream Celebrations
          <br />
          <span className="text-accent italic font-light tracking-wide block mt-2">
            Into Timeless Memories
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/85 text-lg md:text-xl max-w-3xl mx-auto mb-10 drop-shadow-md"
        >
          From weddings to corporate galas, Jhilimili Events designs every detail with elegance, precision, and signature storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mt-4"
        >
          <Link
            to="/decorations"
            className="gradient-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-[0_10px_30px_rgba(217,160,91,0.3)] shimmer group overflow-hidden relative"
          >
            <span className="relative z-10">Plan Your Event</span>
          </Link>
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 hover:scale-105 transition-all shadow-lg"
          >
            Custom Request
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-medium vertical-text">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
