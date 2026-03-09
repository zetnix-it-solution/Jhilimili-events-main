import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Building2, Cake, Diamond, Palette, Palmtree } from "lucide-react";
import heroWedding from "@/assets/hero-wedding.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";
import engagement from "@/assets/engagement.jpg";
import eventDecoration from "@/assets/event-decoration.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";

const services = [
  {
    icon: Heart, title: "Wedding Planning", image: heroWedding,
    description: "From intimate ceremonies to grand celebrations, we plan every detail of your perfect wedding day.",
    features: ["Complete wedding coordination", "Venue selection & booking", "Catering management", "Entertainment & music", "Floral design & décor"],
  },
  {
    icon: Building2, title: "Corporate Events", image: corporateEvent,
    description: "Professional event management for conferences, product launches, and corporate celebrations.",
    features: ["Conference management", "Product launch events", "Award ceremonies", "Team building events", "Corporate dinners"],
  },
  {
    icon: Cake, title: "Birthday Parties", image: birthdayParty,
    description: "Magical birthday celebrations with creative themes, decorations, and entertainment for all ages.",
    features: ["Theme-based parties", "Custom decorations", "Entertainment booking", "Cake & catering", "Photography & videography"],
  },
  {
    icon: Diamond, title: "Engagement Ceremony", image: engagement,
    description: "Romantic and elegant engagement ceremonies that mark the beginning of your love story.",
    features: ["Venue decoration", "Ring ceremony setup", "Photography", "Catering", "Music & entertainment"],
  },
  {
    icon: Palette, title: "Decoration & Theme Setup", image: eventDecoration,
    description: "Transform any venue into a breathtaking setting with our creative decoration services.",
    features: ["Custom theme design", "Floral arrangements", "Lighting design", "Stage setup", "Table décor"],
  },
  {
    icon: Palmtree, title: "Destination Wedding", image: destinationWedding,
    description: "Dream weddings in Nepal's most breathtaking locations, from mountains to lakesides.",
    features: ["Location scouting", "Travel coordination", "Accommodation", "Local vendor management", "Complete planning"],
  },
];

const Services = () => {
  return (
    <>
      <section className="relative py-32 pt-40 bg-soft-pink">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">What We Offer</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">Our Services</h1>
            <div className="w-20 h-0.5 gradient-primary mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="image-hover-zoom rounded-xl overflow-hidden shadow-xl">
                    <img src={service.image} alt={service.title} className="w-full h-80 object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <service.icon className="text-primary mb-4" size={36} />
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-2 h-2 gradient-primary rounded-full shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
