import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, Award, MapPin } from "lucide-react";

const stats = [
    { icon: Calendar, label: "Events Planned", value: "500+", color: "bg-primary/10 text-primary" },
    { icon: Users, label: "Happy Clients", value: "450+", color: "bg-secondary/10 text-secondary" },
    { icon: Award, label: "Years Experience", value: "10+", color: "bg-accent/10 text-accent" },
    { icon: MapPin, label: "Locations", value: "5+", color: "bg-pink-100 text-pink-600" },
];

const ExperienceStats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden" ref={ref}>
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <stat.icon size={28} />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1 font-heading">
                                {stat.value}
                            </h3>
                            <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceStats;
