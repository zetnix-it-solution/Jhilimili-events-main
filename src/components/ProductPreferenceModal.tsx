import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layout, MapPin, Sofa, Armchair, Flame, Check } from "lucide-react";
import { DecorationItem, addonOptions } from "@/data/decorations";

interface ProductPreferenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: DecorationItem | null;
    onAdd: (preference: "Indoor" | "Outdoor", addons: string[]) => void;
}

const ProductPreferenceModal = ({ isOpen, onClose, item, onAdd }: ProductPreferenceModalProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [preference, setPreference] = useState<"Indoor" | "Outdoor" | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    if (!item) return null;

    const handleNext = (pref: "Indoor" | "Outdoor") => {
        setPreference(pref);
        setStep(2);
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const handleAddToCart = () => {
        if (preference) {
            onAdd(preference, selectedAddons);
            handleClose();
        }
    };

    const handleClose = () => {
        setStep(1);
        setPreference(null);
        setSelectedAddons([]);
        onClose();
    };

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "sofa": return <Sofa size={20} />;
            case "chair": return <Armchair size={20} />;
            case "flame": return <Flame size={20} />;
            default: return <Layout size={20} />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-heading text-2xl text-[#1E293B] italic">
                                    {step === 1 ? "Select Preference" : "Select Add-ons"}
                                </h2>
                                <button onClick={handleClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>
                            <p className="text-sm text-slate-500 mb-8">
                                {step === 1 
                                    ? "Is this decoration for an Indoor or Outdoor setting?" 
                                    : "Would you like to include any of these items?"}
                            </p>

                            {step === 1 ? (
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => handleNext("Indoor")}
                                        className="flex flex-col items-center justify-center p-8 rounded-xl border border-slate-200 hover:border-[#D9A05B] hover:bg-amber-50/30 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                                            <MapPin className="text-[#D9A05B]" />
                                        </div>
                                        <span className="font-bold text-[#1E293B]">Indoor</span>
                                    </button>
                                    <button
                                        onClick={() => handleNext("Outdoor")}
                                        className="flex flex-col items-center justify-center p-8 rounded-xl border border-slate-200 hover:border-[#D9A05B] hover:bg-amber-50/30 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                                            <MapPin className="text-[#D9A05B]" />
                                        </div>
                                        <span className="font-bold text-[#1E293B]">Outdoor</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3 mb-8">
                                    {addonOptions.map((addon) => (
                                        <button
                                            key={addon.id}
                                            onClick={() => toggleAddon(addon.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                                selectedAddons.includes(addon.id)
                                                    ? "border-[#D9A05B] bg-amber-50/30"
                                                    : "border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                selectedAddons.includes(addon.id)
                                                    ? "bg-[#D9A05B] border-[#D9A05B]"
                                                    : "border-slate-300"
                                            }`}>
                                                {selectedAddons.includes(addon.id) && <Check size={14} className="text-white" />}
                                            </div>
                                            <div className="text-slate-600">
                                                {getIcon(addon.icon)}
                                            </div>
                                            <span className="font-medium text-slate-700">{addon.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                {step === 1 ? (
                                    <button
                                        onClick={handleClose}
                                        className="px-6 py-2.5 rounded-xl bg-[#641E24] text-white font-medium hover:bg-[#52191d] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-6 py-2.5 rounded-xl bg-[#641E24] text-white font-medium hover:bg-[#52191d] transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleAddToCart}
                                            className="px-8 py-2.5 rounded-xl bg-[#D9A05B] text-white font-medium hover:bg-[#c28f51] transition-colors shadow-sm"
                                        >
                                            Add to Cart
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductPreferenceModal;
