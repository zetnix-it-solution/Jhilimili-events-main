import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ShoppingBag, X, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories, decorationItems, DecorationCategory, addonOptions } from "@/data/decorations";
import { useCart, CartItem } from "@/contexts/CartContext";
import ProductPreferenceModal from "@/components/ProductPreferenceModal";

interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
    eventType: string;
    eventDate: string;
}

const Decorations = () => {
    const [activeCategory, setActiveCategory] = useState<DecorationCategory>("All");
    const { cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
    const [cartStep, setCartStep] = useState<"cart" | "form">("cart");
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: "", phone: "", email: "", eventType: "", eventDate: ""
    });
    
    // Preference Modal State
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const navigate = useNavigate();

    const filteredItems = activeCategory === "All"
        ? decorationItems
        : decorationItems.filter((img) => img.category === activeCategory);

    const handleRequestQuotation = () => {
        setCartStep("form");
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem("jhilimili_customer", JSON.stringify(customerDetails));
        setIsCartOpen(false);
        navigate("/quotation");
    };

    const handleAddToCartClick = (item: any) => {
        if (item.category === "Stage Decor") {
            setSelectedItem(item);
            setIsPreferenceModalOpen(true);
        } else {
            addToCart(item);
        }
    };

    const handlePreferenceAdd = (preference: "Indoor" | "Outdoor", addons: string[]) => {
        if (selectedItem) {
            addToCart(selectedItem, preference, addons);
            setIsPreferenceModalOpen(false);
        }
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
                                                className="w-full py-2.5 rounded-full text-sm font-medium bg-soft-pink text-primary border border-primary/20 flex items-center justify-center gap-2 transition-colors cursor-default"
                                            >
                                                <Check size={16} strokeWidth={2.5} /> Added
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAddToCartClick(item)}
                                                className="w-full py-2.5 rounded-full text-sm font-medium gradient-primary text-white flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
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
                                    {cartStep === "form" ? (
                                        <button onClick={() => setCartStep("cart")} className="mr-2 hover:bg-slate-200 p-1 rounded-full transition-colors">
                                            <ArrowLeft size={20} />
                                        </button>
                                    ) : (
                                        <ShoppingBag className="text-primary" />
                                    )}
                                    {cartStep === "form" ? "Your Details" : "My Quotation Cart"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        setTimeout(() => setCartStep("cart"), 300); // Reset step after closing animation
                                    }}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {cartStep === "cart" ? (
                                    cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                                            <ShoppingCart size={48} className="text-secondary/50" />
                                            <p>Your quotation cart is empty.</p>
                                            <button
                                                onClick={() => setIsCartOpen(false)}
                                                className="text-primary font-medium mt-2 hover:underline"
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
                                                    key={item.cartId}
                                                    className="flex gap-4 p-3 border border-border rounded-lg bg-card items-center relative overflow-hidden group"
                                                >
                                                    <img src={item.image} alt={item.code} className="w-20 h-20 object-cover rounded-md" />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-foreground truncate">{item.code}</h4>
                                                        <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                                                        
                                                        {(item.preference || (item.addons && item.addons.length > 0)) && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {item.preference && (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-600 border border-slate-200">
                                                                        {item.preference}
                                                                    </span>
                                                                )}
                                                                {item.addons?.map(addonId => {
                                                                    const addon = addonOptions.find(a => a.id === addonId);
                                                                    return (
                                                                        <span key={addonId} className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-50 text-[10px] font-medium text-amber-600 border border-amber-100">
                                                                            + {addon?.label || addonId}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartId)}
                                                        className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    <form id="quotation-form" onSubmit={handleFormSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={customerDetails.name}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={customerDetails.phone}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                placeholder="Your Phone Number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={customerDetails.email}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-[#D9A05B]"
                                                placeholder="Your Email Address"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Event Type *</label>
                                            <select
                                                required
                                                value={customerDetails.eventType}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, eventType: e.target.value })}
                                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-[#D9A05B]"
                                            >
                                                <option value="" disabled>Select event type</option>
                                                <option value="Wedding">Wedding</option>
                                                <option value="Engagement">Engagement</option>
                                                <option value="Birthday">Birthday</option>
                                                <option value="Anniversary">Anniversary</option>
                                                <option value="Corporate">Corporate</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">Event Date *</label>
                                            <input
                                                type="date"
                                                required
                                                value={customerDetails.eventDate}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, eventDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-[#D9A05B]"
                                            />
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="p-6 border-t border-border bg-slate-50">
                                {cartStep === "cart" ? (
                                    <>
                                        <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
                                            <span>Total Items:</span>
                                            <span className="text-foreground">{cart.length}</span>
                                        </div>
                                        <button
                                            disabled={cart.length === 0}
                                            onClick={handleRequestQuotation}
                                            className="w-full py-4 rounded-full text-white font-medium gradient-primary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Request Custom Quotation <ArrowRight size={18} />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        form="quotation-form"
                                        className="w-full py-4 rounded-full text-white font-medium gradient-primary flex justify-center items-center gap-2 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Generate Quotation <ArrowRight size={18} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <ProductPreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
                item={selectedItem}
                onAdd={handlePreferenceAdd}
            />
        </div>
    );
};

export default Decorations;
