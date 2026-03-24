import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Coffee, PencilRuler, Sparkles, PartyPopper } from "lucide-react";

const steps = [
    {
        icon: Coffee,
        title: "Consultation",
        description: "We start with a coffee and a conversation to understand your vision, preferences, and requirements.",
        color: "from-pink-100 to-pink-50 text-pink-600"
    },
    {
        icon: PencilRuler,
        title: "Concept & Design",
        description: "Our creative team crafts a unique theme and detailed plan tailored specifically to your story.",
        color: "from-teal-100 to-teal-50 text-teal-600"
    },
    {
        icon: Sparkles,
        title: "Curation",
        description: "We source the finest decor, coordindate with top vendors, and manage every logistical detail.",
        color: "from-amber-100 to-amber-50 text-amber-600"
    },
    {
        icon: PartyPopper,
        title: "The Celebration",
        description: "Experience a stress-free event as our on-site team ensures everything runs flawlessly.",
        color: "from-primary/15 to-primary/5 text-primary"
    }
];

const ProcessSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="section-padding bg-background relative" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Our Process</p>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4 italic">The Jhilimili Way</h2>
                    <div className="w-24 h-1 gradient-primary mx-auto rounded-full" />
                </motion.div>

                <div className="relative">
                    {/* Progress Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.15, duration: 0.7 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg relative group transition-transform duration-500 hover:scale-110`}>
                                    <step.icon size={32} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-xs border border-slate-100">
                                        0{i + 1}
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
