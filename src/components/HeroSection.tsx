import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/70 to-foreground/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,214,173,0.22),transparent_42%)]" />

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg"
        >
          Turning Dream Celebrations
          <br />
          <span className="text-accent">Into Timeless Memories</span>
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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/decorations"
            className="gradient-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 hover:scale-105 transition-all shadow-lg"
          >
            Plan Your Event
          </Link>
          <Link
            to="/contact"
            className="border-2 border-primary-foreground/35 text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-foreground/10 hover:scale-105 transition-all shadow-md"
          >
            Custom Request
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
