import { motion } from "framer-motion";
import { useRef } from "react";
import traditionImg from "@/assets/Stage.png";
import innovationImg from "@/assets/hero-wedding.jpg";

const InteractiveVision = () => {
    return (
        <section className="bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[700px]">
                {/* Tradition Pillar */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex-1 group"
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700 z-9" />
                    <img
                        src={traditionImg}
                        alt="Tradition"
                        className="absolute inset-0 w-full h-full object-cover object-[center_80%] transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-12 lg:p-20 text-white">
                        <p className="font-display text-sm tracking-[0.5em] uppercase mb-6 text-black drop-shadow-md">Pillar One</p>
                        <h3 className="font-heading text-4xl lg:text-6xl font-black  mb-8 italic">The Art of Tradition</h3>
                        <p className="max-w-md text-white/80 leading-relaxed text-sm lg:text-base border-t border-white/20 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            Honoring heritage through meticulous detail. We bring the soul of classic celebrations into the modern age with grace and respect.
                        </p>
                    </div>
                </motion.div>

                {/* Innovation Pillar */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex-1 group border-t lg:border-t-0 lg:border-l border-white/10"
                >
                    <div className="absolute inset-0 bg-[#C2187A]/30 group-hover:bg-[#C2187A]/10 transition-all duration-700 z-10" />
                    <img
                        src={innovationImg}
                        alt="Innovation"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-12 lg:p-20 text-white">
                        <p className="font-display text-sm tracking-[0.5em] uppercase mb-6 text-pink-200 drop-shadow-md">Pillar Two</p>
                        <h3 className="font-heading text-4xl lg:text-6xl font-black mb-8 italic">Future of Celebration</h3>
                        <p className="max-w-md text-white/80 leading-relaxed text-sm lg:text-base border-t border-white/20 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            Pushing boundaries with avant-garde designs and seamless technology. Your dream events, reimagined with limitless creativity.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveVision;
