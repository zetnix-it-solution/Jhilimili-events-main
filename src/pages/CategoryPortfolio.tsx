import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { getEventsByCategory, getCategoryNameBySlug, PortfolioEvent } from "@/data/portfolio";

const CategoryPortfolio = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [events, setEvents] = useState<PortfolioEvent[]>([]);
  const [categoryName, setCategoryName] = useState("");
  
  // Lightbox State
  const [selectedEvent, setSelectedEvent] = useState<PortfolioEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (categorySlug) {
      setEvents(getEventsByCategory(categorySlug));
      setCategoryName(getCategoryNameBySlug(categorySlug));
    }
    // Reset state on category change
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  }, [categorySlug]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEvent) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = selectedEvent ? "hidden" : "unset";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent, currentImageIndex]);

  const openLightbox = (event: PortfolioEvent) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  if (!categorySlug) return null;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Header Section */}
      <div className="container-custom mb-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Portfolio Collection</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 capitalize">
            {categoryName}
          </h1>
          <div className="w-20 h-1 gradient-primary mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore our curated gallery of past {categoryName.toLowerCase()} events. 
            Click on any event to view the detailed decoration portfolio.
          </p>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="container-custom">
        {events.length === 0 ? (
          <div className="py-20 text-center bg-card rounded-2xl border border-border/50">
            <ImageIcon size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground">We are currently updating our portfolio for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openLightbox(event)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.coverImage} 
                    alt={event.clientName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* View Gallery Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                    <ImageIcon size={14} /> View {event.images.length} Photos
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.clientName}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Header / Close */}
            <div className="absolute top-0 left-0 w-full p-4 pt-6 md:p-6 flex justify-between items-start md:items-center z-[210] bg-gradient-to-b from-black/90 via-black/50 to-transparent">
              <div className="text-white pr-4">
                <h2 className="font-heading text-xl md:text-2xl font-bold leading-tight">{selectedEvent.clientName}</h2>
                <p className="text-white/60 text-xs md:text-sm mt-1">
                  Photo {currentImageIndex + 1} of {selectedEvent.images.length}
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Controls */}
            {selectedEvent.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md z-[210] hover:scale-110"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md z-[210] hover:scale-110"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={selectedEvent.images[currentImageIndex]}
                  alt={`${selectedEvent.clientName} - Photo ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails (Optional, adding for premium feel) */}
            {selectedEvent.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 z-[210]" onClick={(e) => e.stopPropagation()}>
                {selectedEvent.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${currentImageIndex === idx ? 'ring-2 ring-primary scale-110 z-10' : 'opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPortfolio;
