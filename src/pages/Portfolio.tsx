import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroWedding from "@/assets/hero-wedding.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";
import eventDecoration from "@/assets/event-decoration.jpg";
import engagement from "@/assets/engagement.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";
import ctaBg from "@/assets/cta-bg.jpg";

type Category = "All" | "Wedding" | "Corporate" | "Birthday" | "Decoration";

const allImages = [
  { src: heroWedding, alt: "Wedding ceremony", category: "Wedding" as Category },
  { src: gallery1, alt: "Floral arch", category: "Wedding" as Category },
  { src: gallery2, alt: "Reception hall", category: "Decoration" as Category },
  { src: gallery3, alt: "Wedding cake", category: "Wedding" as Category },
  { src: gallery4, alt: "Outdoor ceremony", category: "Wedding" as Category },
  { src: corporateEvent, alt: "Corporate event", category: "Corporate" as Category },
  { src: birthdayParty, alt: "Birthday party", category: "Birthday" as Category },
  { src: eventDecoration, alt: "Table decoration", category: "Decoration" as Category },
  { src: engagement, alt: "Engagement", category: "Wedding" as Category },
  { src: destinationWedding, alt: "Destination wedding", category: "Wedding" as Category },
  { src: ctaBg, alt: "Event venue", category: "Decoration" as Category },
];

const categories: Category[] = ["All", "Wedding", "Corporate", "Birthday", "Decoration"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? allImages : allImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <section className="relative py-32 pt-40 bg-soft-pink">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Our Work</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">Portfolio</h1>
            <div className="w-20 h-0.5 gradient-primary mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="image-hover-zoom rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setLightbox(img.src)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-52 md:h-64 object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <img src={lightbox} alt="Gallery preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </motion.div>
      )}
    </>
  );
};

export default Portfolio;
