import { motion, useInView, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  const filteredImages = useMemo(
    () => (activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory)),
    [activeCategory],
  );

  return (
    <section className="section-padding bg-[#fcf9f9]" ref={ref}>
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "gradient-primary text-white shadow-[0_5px_15px_rgba(217,160,91,0.2)]"
                  : "bg-white text-slate-500 border border-slate-100 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, i) => (
            <motion.div
              layout={!shouldReduceMotion}
              key={`${img.src}-${activeCategory}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium mb-1 text-accent">{img.category}</p>
                <h4 className="font-heading text-lg font-bold">{img.alt}</h4>
                <div className="w-8 h-0.5 bg-accent mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center border-b-2 border-primary text-foreground px-2 py-1 font-bold tracking-widest hover:text-primary hover:border-accent transition-all duration-300"
          >
            VIEW FULL GALLERY
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
