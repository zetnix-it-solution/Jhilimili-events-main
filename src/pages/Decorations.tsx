import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ShoppingBag, X, Check, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories, decorationItems, DecorationCategory, DecorationItem } from "@/data/decorations";
import { useToast } from "@/components/ui/use-toast";

const Decorations = () => {
    const [activeCategory, setActiveCategory] = useState<DecorationCategory>("All");
    const [cart, setCart] = useState<DecorationItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const filteredItems = activeCategory === "All"
        ? decorationItems
        : decorationItems.filter((img) => img.category === activeCategory);

    const addToCart = (item: DecorationItem) => {
        if (!cart.find(c => c.id === item.id)) {
            setCart([...cart, item]);
            toast({
                title: "Added to Cart",
                description: `${item.code} has been added to your quotation request.`,
            });
        }
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleRequestQuotation = () => {
        // Navigate to contact and maybe pass cart data via state or localStorage
        // For now we'll store in sessionStorage so contact page could potentially read it
        sessionStorage.setItem("jhilimili_cart", JSON.stringify(cart));
        setIsCartOpen(false);
        navigate("/contact?subject=Quotation Request");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="relative bg-soft-pink pt-36 pb-16 overflow-hidden">

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-4"
                        >
                            Curated Collection
                        </motion.p>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">
                            Event <span className="gradient-text">Decorations</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-3 text-lg">
                            Browse our premium decoration collection and add items to your cart to request a custom quotation.
                        </p>
                        <p className="text-amber-600 text-sm font-medium">
                            ✦ Stage includes structure only — external items may cost extra
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filters */}
            <div className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat, i) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? "gradient-primary text-white shadow-md scale-105"
                                    : "bg-slate-100 text-foreground/80 hover:bg-slate-200 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-12">

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-card rounded-xl overflow-hidden shadow-sm border border-border group flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden image-hover-zoom">
                                    <img src={item.image} alt={item.code} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-heading font-semibold text-xl text-foreground mb-1 italic">{item.code}</h3>
                                    <p className="text-sm text-muted-foreground mb-5 font-normal">Code: {item.code}</p>

                                    <div className="mt-auto">
                                        {cart.find(c => c.id === item.id) ? (
                                            <button
                                                disabled
                                                className="w-full py-2.5 rounded-md text-sm font-medium bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Check size={16} /> Added
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-full py-2.5 rounded-md text-sm font-medium bg-[#D9A05B] hover:bg-[#c28f51] text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
                                            >
                                                <ShoppingCart size={16} /> Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredItems.length === 0 && (
                        <div className="col-span-full py-20 text-center text-muted-foreground">
                            No items found in this category.
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Floating Cart Button */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsCartOpen(true)}
                        className="fixed bottom-24 right-6 z-50 bg-foreground text-background p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                    >
                        <div className="relative">
                            <ShoppingBag size={24} />
                            <span className="absolute -top-2 -right-2 bg-[#D9A05B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-foreground/60 z-[100] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[110] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between bg-slate-50">
                                <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                                    <ShoppingBag className="text-[#D9A05B]" /> My Quotation Cart
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                                        <ShoppingCart size={48} className="text-secondary/50" />
                                        <p>Your quotation cart is empty.</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="text-[#D9A05B] font-medium mt-2 hover:underline"
                                        >
                                            Browse Decorations
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {cart.map((item) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                key={item.id}
                                                className="flex gap-4 p-3 border border-border rounded-lg bg-card items-center"
                                            >
                                                <img src={item.image} alt={item.code} className="w-20 h-20 object-cover rounded-md" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-foreground">{item.code}</h4>
                                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-border bg-slate-50">
                                <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
                                    <span>Total Items:</span>
                                    <span className="text-foreground">{cart.length}</span>
                                </div>
                                <button
                                    disabled={cart.length === 0}
                                    onClick={handleRequestQuotation}
                                    className="w-full py-4 rounded-md text-white font-medium bg-[#D9A05B] hover:bg-[#c28f51] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-colors shadow-md"
                                >
                                    Request Custom Quotation <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Decorations;
