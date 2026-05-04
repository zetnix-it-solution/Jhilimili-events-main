import { motion } from "framer-motion";
import { Heart, Eye, Sparkles } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 pt-40 bg-soft-pink">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Our Story</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6"><h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">About Jhilimili Events</h1></h1>
            <div className="w-20 h-0.5 gradient-primary mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={gallery1} alt="Our story" className="rounded-xl shadow-xl w-full" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Who We Are</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Crafting Unforgettable Celebrations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Jhilimili Events specializes in creating unforgettable celebrations with unique themes and professional planning. Based in Kathmandu & Chitwan, we have been transforming dreams into reality for couples, families, and corporations. in creating unforgettable celebrations with unique themes and professional planning. Based in Kathmandu, Nepal, we have been transforming dreams into reality for couples, families, and corporations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated team of creative planners, designers, and coordinators work tirelessly to ensure every event is executed with precision, elegance, and a personal touch that makes each celebration truly one-of-a-kind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-light-teal">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Our Mission", text: "To create beautiful, memorable events that exceed expectations and celebrate life's most precious moments with elegance and creativity." },
              { icon: Eye, title: "Our Vision", text: "To be Nepal's most trusted and innovative event planning company, setting new standards in celebration design and execution." },
              { icon: Sparkles, title: "Our Philosophy", text: "Every event tells a story. We believe in weaving emotions, culture, and personal touches into every celebration we craft." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card p-8 rounded-xl shadow-md text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-foreground/70" size={26} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-secondary mb-3">Our Team</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">The Creative Minds Behind Every Event</h2>
            <div className="w-20 h-0.5 gradient-primary mx-auto mb-8" />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-xl overflow-hidden">
              <img src={gallery2} alt="Our team at work" className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-6">
                <p className="text-muted-foreground text-sm">Our passionate team of event planners, designers, and coordinators bring years of experience and creativity to every celebration.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card rounded-xl overflow-hidden">
              <img src={gallery1} alt="Event setup" className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-6">
                <p className="text-muted-foreground text-sm">From concept to execution, we handle every aspect of your event with meticulous attention to detail and a commitment to excellence.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
