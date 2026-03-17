import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { DecorationItem } from "@/data/decorations";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

interface CartContextType {
    cart: DecorationItem[];
    addToCart: (item: DecorationItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<DecorationItem[]>(() => {
        const saved = sessionStorage.getItem("jhilimili_cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { toast } = useToast();

    // Sync to session storage whenever cart changes
    useEffect(() => {
        sessionStorage.setItem("jhilimili_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((item: DecorationItem) => {
        setCart((prev) => {
            if (!prev.find(c => c.id === item.id)) {
                toast({
                    title: (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            <span>Added to Quote</span>
                        </div>
                    ) as any, // Cast to any to bypass strict type checking for ReactNode in this specific Shadcn setup
                    description: (
                        <span className="ml-7 block">{item.code} has been added to your quotation request.</span>
                    ) as any,
                    duration: 3000,
                });
                return [...prev, item];
            }
            return prev;
        });
    }, [toast]);

    const removeFromCart = useCallback((id: string) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
