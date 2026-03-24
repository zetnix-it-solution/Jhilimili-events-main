import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Printer, MessageCircle, ArrowLeft, Calendar, User, Phone, Mail, Tag } from "lucide-react";
import { DecorationItem, addonOptions } from "@/data/decorations";
import { CartItem } from "@/contexts/CartContext";

interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
    eventType: string;
    eventDate: string;
}

const Quotation = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [customer, setCustomer] = useState<CustomerDetails | null>(null);

    useEffect(() => {
        // Load data from session storage
        const storedCart = sessionStorage.getItem("jhilimili_cart");
        const storedCustomer = sessionStorage.getItem("jhilimili_customer");

        if (storedCart && storedCustomer) {
            setCart(JSON.parse(storedCart));
            setCustomer(JSON.parse(storedCustomer));
        } else {
            // If accessed directly without data, redirect back
            navigate("/decorations");
        }
    }, [navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        if (!customer || cart.length === 0) return;

        const cartItemsText = cart.map(item => {
            let spec = `- ${item.category}: ${item.code}`;
            if (item.preference) spec += ` (${item.preference})`;
            if (item.addons && item.addons.length > 0) {
                const addonsStr = item.addons.map(id => addonOptions.find(a => a.id === id)?.label || id).join(', ');
                spec += ` [Add-ons: ${addonsStr}]`;
            }
            return spec;
        }).join('%0A');
        
        const message = `*New Quotation Request*%0A%0A*Customer Details:*%0AName: ${customer.name}%0APhone: ${customer.phone}%0AEmail: ${customer.email || "N/A"}%0AEvent Type: ${customer.eventType}%0AEvent Date: ${customer.eventDate}%0A%0A*Requested Items:*%0A${cartItemsText}%0A%0APlease provide a quotation for the above items.`;

        // Using the predefined WhatsApp number from WhatsAppButton.tsx
        const whatsappUrl = `https://wa.me/9779800000000?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!customer || cart.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 print:pt-0 print:pb-0 print:bg-white text-black">
            <div className="container-custom max-w-4xl mx-auto print:max-w-none print:px-4">
                {/* Header Actions - Hidden on Print */}
                <div className="flex justify-between items-center mb-8 print:hidden">
                    <button
                        onClick={() => navigate("/decorations")}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Decorations
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-6 py-2 bg-white border border-border rounded-full text-foreground shadow-sm hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
                        >
                            <Printer size={18} /> Print Quotation
                        </button>
                        <button
                            onClick={handleWhatsApp}
                            className="flex items-center gap-2 px-6 py-2 bg-[#25D366] text-white rounded-full shadow-sm hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageCircle size={18} /> Send via WhatsApp
                        </button>
                    </div>
                </div>

                {/* Printable Quotation Document */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-md border border-border p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:m-0"
                >
                    {/* Document Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-8 mb-8 print:pb-4 print:mb-6 print:flex-row print:items-center">
                        <div className="flex items-center gap-4 mb-6 md:mb-0 print:mb-0">
                            <img src="/logo.jpg" alt="Jhilimili Events" className="h-16 w-auto rounded-md print:h-12" />
                            <div>
                                <h1 className="font-display text-2xl font-bold text-primary print:text-xl print:text-black">Jhilimili Events</h1>
                                <p className="text-sm text-muted-foreground print:text-xs">Kathmandu, Nepal</p>
                                <p className="text-sm text-muted-foreground print:text-xs">+977-9800000000</p>
                            </div>
                        </div>
                        <div className="text-left md:text-right print:text-right">
                            <h2 className="text-3xl font-heading font-bold text-foreground uppercase tracking-wide print:text-xl">Quotation Request</h2>
                            <p className="text-muted-foreground mt-1 print:text-xs">Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 bg-slate-50 p-6 rounded-lg print:bg-transparent print:p-0 print:gap-4 print:grid-cols-2 print:mb-6">
                        <div>
                            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2 inline-block">Client Details</h3>
                            <div className="space-y-3">
                                <p className="flex items-center gap-3 text-sm"><User size={16} className="text-muted-foreground" /> <span className="font-medium">{customer.name}</span></p>
                                <p className="flex items-center gap-3 text-sm"><Phone size={16} className="text-muted-foreground" /> <span>{customer.phone}</span></p>
                                {customer.email && (
                                    <p className="flex items-center gap-3 text-sm"><Mail size={16} className="text-muted-foreground" /> <span>{customer.email}</span></p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2 inline-block">Event Details</h3>
                            <div className="space-y-3">
                                <p className="flex items-center gap-3 text-sm"><Tag size={16} className="text-muted-foreground" /> <span className="font-medium">{customer.eventType}</span></p>
                                <p className="flex items-center gap-3 text-sm"><Calendar size={16} className="text-muted-foreground" /> <span>{new Date(customer.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-10 print:mb-6">
                        <h3 className="font-semibold text-foreground mb-4 text-lg print:text-base print:mb-2">Requested Items</h3>
                        <div className="overflow-x-auto rounded-lg border border-border print:border-none">
                            <table className="w-full text-left text-sm print:text-xs border-collapse">
                                <thead className="bg-slate-50 text-muted-foreground border-b border-border print:bg-transparent print:text-black print:border-b-2">
                                    <tr>
                                        <th className="px-6 py-4 font-medium print:py-2 print:px-2">#</th>
                                        <th className="px-6 py-4 font-medium print:hidden">Image</th>
                                        <th className="px-6 py-4 font-medium print:py-2 print:px-2">Item Code</th>
                                        <th className="px-6 py-4 font-medium print:py-2 print:px-2">Category</th>
                                        <th className="px-6 py-4 font-medium print:py-2 print:px-2">Specifications</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {cart.map((item, index) => (
                                        <tr key={item.cartId} className="bg-white print:border-b print:border-gray-200">
                                            <td className="px-6 py-4 print:py-2 print:px-2">{index + 1}</td>
                                            <td className="px-6 py-4 print:hidden">
                                                <img src={item.image} alt={item.code} className="h-12 w-12 object-cover rounded-md" />
                                            </td>
                                            <td className="px-6 py-4 font-medium print:py-2 print:px-2">{item.code}</td>
                                            <td className="px-6 py-4 text-muted-foreground print:py-2 print:px-2 print:text-black">{item.category}</td>
                                            <td className="px-6 py-4 print:py-2 print:px-2 whitespace-pre-wrap">
                                                {item.preference && (
                                                    <div className="text-xs font-semibold text-primary mb-1">{item.preference} Setting</div>
                                                )}
                                                {item.addons && item.addons.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.addons.map(id => (
                                                            <span key={id} className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600 border border-slate-200">
                                                                {addonOptions.find(a => a.id === id)?.label || id}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {!item.preference && (!item.addons || item.addons.length === 0) && (
                                                    <span className="text-muted-foreground italic text-xs">Standard</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="border-t border-border pt-8 mt-12 text-center text-sm text-muted-foreground space-y-2 print:pt-4 print:mt-6 print:text-xs print:text-black">
                        <p>This is a formal quotation request generated from the Jhilimili Events website.</p>
                        <p>Our team will review your requested items and get back to you with the final pricing shortly.</p>
                        <p className="font-medium mt-4 print:mt-2">Thank you for choosing Jhilimili Events!</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Quotation;
