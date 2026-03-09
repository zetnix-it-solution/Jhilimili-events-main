import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import eventDecoration from "@/assets/event-decoration.jpg";
import engagement from "@/assets/engagement.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";

const images = [
  { src: gallery1, alt: "Wedding floral arch" },
  { src: gallery2, alt: "Reception hall" },
  { src: gallery3, alt: "Wedding cake" },
  { src: gallery4, alt: "Outdoor ceremony" },
  { src: eventDecoration, alt: "Table decoration" },
  { src: engagement, alt: "Engagement ceremony" },
  { src: destinationWedding, alt: "Destination wedding" },
  { src: birthdayParty, alt: "Birthday celebration" },
];

const PortfolioPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-soft-pink" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Our Work</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Portfolio</h2>
          <div className="w-20 h-0.5 gradient-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`image-hover-zoom rounded-lg overflow-hidden ${
                i === 0 || i === 5 ? "row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover min-h-[200px]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
