import { motion } from "framer-motion";

interface SectionDividerProps {
    className?: string;
    variant?: "line" | "wave" | "dots";
}

const SectionDivider = ({ className = "", variant = "line" }: SectionDividerProps) => {
    return (
        <div className={`w-full flex justify-center py-6 px-4 overflow-hidden pointer-events-none ${className}`}>
            {variant === "line" && (
                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent relative"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-primary/40 bg-background" />
                </motion.div>
            )}

            {variant === "dots" && (
                <div className="flex gap-3">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: i === 1 ? 1.2 : 0.8, opacity: 1 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            className="w-2 h-2 rounded-full bg-primary/30 border border-primary/20"
                        />
                    ))}
                </div>
            )}

            {variant === "wave" && (
                <svg viewBox="0 0 100 20" className="w-full max-w-2xl text-primary/10 fill-current h-4 opacity-50">
                    <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            )}
        </div>
    );
};

export default SectionDivider;
