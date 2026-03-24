import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How far in advance should I book my event?",
        answer: "We recommend booking at least 6–12 months in advance for major events like weddings and large corporate galas. For smaller celebrations and decor-only requests, 3 months is usually sufficient, though availability varies by season."
    },
    {
        question: "What are your service areas?",
        answer: "We primarily serve Kathmandu Valley and Chitwan, but we also handle destination events across nearby locations. Whether it's a mountain wedding in Pokhara or a corporate retreat in Chitwan, our team is equipped to manage logistics and design."
    },
    {
        question: "Can you work within a specific budget?",
        answer: "Yes, we pride ourselves on being creative problem solvers. During our initial consultation, we'll discuss your budget and help prioritize elements that will have the biggest impact on your vision."
    },
    {
        question: "What makes Jhilimili Events different from other planners?",
        answer: "Our signature approach combines traditional Nepalese hospitality with modern, high-end aesthetics. We don't just plan events; we curate experiences with a focus on precision, storytelling, and premium design."
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="section-padding bg-white relative">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Questions & Answers</p>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Curious Minds</h2>
                    <div className="w-20 h-0.5 gradient-primary mx-auto" />
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-sm">
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <HelpCircle className="text-primary/40 hidden sm:block" size={20} />
                                    <span className="font-heading font-bold text-slate-800 md:text-lg">{faq.question}</span>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === i ? 'bg-primary text-white rotate-0' : 'bg-slate-50 text-slate-400 rotate-90'}`}>
                                    {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 leading-relaxed text-sm md:text-base">
                                            <div className="h-px w-full bg-slate-50 mb-6" />
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
