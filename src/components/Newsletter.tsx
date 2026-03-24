import { motion } from "framer-motion";
import { Send } from "lucide-react";

const Newsletter = () => {
    return (
        <section className="section-padding bg-slate-900 relative overflow-hidden">
            {/* Ambient light effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto glass-card-dark p-8 md:p-16 border-white/5 bg-white/[0.02]">
                    <div className="text-center mb-10">
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-accent font-display text-xs tracking-[0.4em] uppercase mb-4"
                        >
                            Exclusive Access
                        </motion.p>
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 italic"
                        >
                            Join the Signature Circle
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/50 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            Receive curated inspiration, early access to new collections, and signature event planning tips directly to your inbox.
                        </motion.p>
                    </div>

                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input 
                            type="email" 
                            placeholder="Your email address"
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all"
                            required
                        />
                        <button 
                            type="submit"
                            className="gradient-primary text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group"
                        >
                            SUBSCRIBE 
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.form>
                    
                    <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-8">
                        NO SPAM, JUST INSPIRATION.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
