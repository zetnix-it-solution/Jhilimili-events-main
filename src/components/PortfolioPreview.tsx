import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import eventDecoration from "@/assets/event-decoration.jpg";
import engagement from "@/assets/engagement.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";

type Category = "All" | "Wedding" | "Engagement" | "Decor" | "Birthday";

const images = [
  { src: gallery1, alt: "Wedding floral arch", category: "Wedding" as Category },
  { src: gallery2, alt: "Reception hall setup", category: "Decor" as Category },
  { src: gallery3, alt: "Wedding cake styling", category: "Wedding" as Category },
  { src: gallery4, alt: "Outdoor ceremony aisle", category: "Wedding" as Category },
  { src: eventDecoration, alt: "Table decoration design", category: "Decor" as Category },
  { src: engagement, alt: "Engagement ceremony highlights", category: "Engagement" as Category },
  { src: destinationWedding, alt: "Destination wedding moments", category: "Wedding" as Category },
  { src: birthdayParty, alt: "Birthday celebration stage", category: "Birthday" as Category },
];

const categories: Category[] = ["All", "Wedding", "Engagement", "Decor", "Birthday"];

const PortfolioPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filteredImages = useMemo(
    () => (activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory)),
    [activeCategory],
  );

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

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all ${
                activeCategory === cat
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, i) => (
            <motion.div
              key={`${img.src}-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`image-hover-zoom rounded-lg overflow-hidden ${
                i % 5 === 0 ? "row-span-2" : ""
              } cursor-pointer`}
              onClick={() => setLightbox(img.src)}
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

        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] bg-foreground/90 flex items-center justify-center p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-primary-foreground"
              onClick={() => setLightbox(null)}
              aria-label="Close gallery preview"
            >
              <X size={28} />
            </button>
            <img src={lightbox} alt="Selected portfolio item" className="max-h-[85vh] max-w-full rounded-lg object-contain" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPreview;
