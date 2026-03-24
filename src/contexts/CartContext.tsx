import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { DecorationItem } from "@/data/decorations";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

export interface CartItem extends DecorationItem {
    cartId: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: DecorationItem, preference?: "Indoor" | "Outdoor", addons?: string[]) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = sessionStorage.getItem("jhilimili_cart");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure all items have a cartId for backwards compatibility
                return parsed.map((item: any) => ({
                    ...item,
                    cartId: item.cartId || item.id
                }));
            } catch (e) {
                console.error("Error parsing cart from session storage", e);
                return [];
            }
        }
        return [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { toast } = useToast();

    // Sync to session storage whenever cart changes
    useEffect(() => {
        sessionStorage.setItem("jhilimili_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((item: DecorationItem, preference?: "Indoor" | "Outdoor", addons?: string[]) => {
        const cartId = `${item.id}-${preference || "default"}-${(addons || []).sort().join(",")}`;
        
        setCart((prev) => {
            if (!prev.find(c => c.cartId === cartId)) {
                toast({
                    title: (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            <span>Added to Quote</span>
                        </div>
                    ) as any,
                    description: (
                        <div className="ml-7 space-y-1">
                            <span className="block font-medium">{item.code} has been added.</span>
                            {preference && <span className="block text-xs text-muted-foreground italic">({preference} setting)</span>}
                        </div>
                    ) as any,
                    duration: 3000,
                });
                return [...prev, { ...item, cartId, preference, addons }];
            }
            return prev;
        });
    }, [toast]);

    const removeFromCart = useCallback((cartId: string) => {
        setCart((prev) => prev.filter(item => item.cartId !== cartId));
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
