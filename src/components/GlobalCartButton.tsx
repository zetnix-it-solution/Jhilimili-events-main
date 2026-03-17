import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLocation } from "react-router-dom";

const GlobalCartButton = () => {
    const { cart, setIsCartOpen } = useCart();
    const location = useLocation();

    // Do not show the global cart button on the quotation page or if the cart is empty
    if (cart.length === 0 || location.pathname === "/quotation") {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => {
                    // If not on decorations page, the drawer is currently only implemented inside Decorations.tsx
                    // For a true global drawer, we'd move the drawer code itself to a global component.
                    // However, we can simply redirect to /decorations which will then open the drawer via context
                    if (location.pathname !== "/decorations") {
                        window.location.href = "/decorations";
                    }
                    setIsCartOpen(true);
                }}
                // Position it clearly above the WhatsApp icon
                className="fixed bottom-24 right-6 z-50 bg-foreground text-background p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center print:hidden"
            >
                <div className="relative">
                    <ShoppingBag size={24} />
                    <span className="absolute -top-2 -right-2 bg-[#D9A05B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.length}
                    </span>
                </div>
            </motion.button>
        </AnimatePresence>
    );
};

export default GlobalCartButton;
