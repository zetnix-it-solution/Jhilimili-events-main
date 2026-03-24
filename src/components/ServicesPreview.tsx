import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Building2, Cake, Diamond, Palmtree, ArrowUpRight } from "lucide-react";
import heroWedding from "@/assets/hero-wedding.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";
import engagement from "@/assets/engagement.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";

const services = [
  { icon: Heart, title: "Wedding Planning", description: "Complete wedding management from venue to vows", image: heroWedding },
  { icon: Building2, title: "Corporate Events", description: "Professional events that leave lasting impressions", image: corporateEvent },
  { icon: Cake, title: "Birthday Celebrations", description: "Magical birthday parties for all ages", image: birthdayParty },
  { icon: Diamond, title: "Engagement", description: "Romantic engagement ceremonies to remember", image: engagement },
  { icon: Palmtree, title: "Destination Wedding", description: "Dream weddings in Nepal's breathtaking locations", image: destinationWedding },
];

const ServicesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">What We Do</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <div className="w-20 h-0.5 gradient-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Icon badge floating on the image */}
                <div className="absolute bottom-4 left-5 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary" size={22} />
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="text-white" size={16} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-300"
                >
                  Explore
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/services"
            className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 hover:scale-105 transition-all inline-block shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
