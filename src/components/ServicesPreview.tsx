import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Building2, Cake, Diamond, Palmtree } from "lucide-react";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group glass-card rounded-xl overflow-hidden hover-lift"
            >
              <div className="image-hover-zoom h-48">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <service.icon className="text-primary mb-3" size={28} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
