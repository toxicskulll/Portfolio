import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Brain, Zap, Target, Shield, Leaf, Eye, Cpu, Lock } from "lucide-react";

const interests = [
  { name: "Generative AI", icon: Brain, color: "#7c4dff", glow: "rgba(167,139,250,0.4)" },
  { name: "Cognitive Systems", icon: Lightbulb, color: "#06d6d0", glow: "rgba(6,214,208,0.4)" },
  { name: "Natural Language Processing", icon: Zap, color: "#0d9488", glow: "rgba(20,184,166,0.4)" },
  { name: "Multimodal Learning", icon: Eye, color: "#059669", glow: "rgba(16,185,129,0.4)" },
  { name: "Interpretable AI", icon: Target, color: "#f97316", glow: "rgba(249,115,22,0.4)" },
  { name: "Sustainable AI", icon: Leaf, color: "#06d6d0", glow: "rgba(6,214,208,0.4)" },
  { name: "Explainable AI", icon: Eye, color: "#0d9488", glow: "rgba(20,184,166,0.4)" },
  { name: "Quantum-Inspired ML", icon: Cpu, color: "#7c4dff", glow: "rgba(167,139,250,0.4)" },
  { name: "Privacy-Preserving Computation", icon: Shield, color: "#f97316", glow: "rgba(249,115,22,0.4)" },
];

const ResearchInterestsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research-interests" className="relative py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">03 · Research</p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8 sm:mb-12 md:mb-16"
            style={{ color: "var(--purple-light)" }}
          >
            Research Interests
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {interests.map((interest, i) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative"
              >
                <div
                  className="glass-card p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-default"
                  style={{
                    borderColor: `${interest.color}60`,
                    boxShadow: `0 0 20px ${interest.glow}`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = `0 0 40px ${interest.color}60, inset 0 0 30px ${interest.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = `0 0 20px ${interest.glow}`;
                  }}
                >
                  <motion.div
                    className="mb-4"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  >
                    <Icon
                      size={32}
                      style={{
                        color: interest.color,
                        filter: `drop-shadow(0 0 8px ${interest.color}60)`,
                      }}
                    />
                  </motion.div>

                  <h3
                    className="font-display text-lg font-semibold"
                    style={{ color: "var(--white)" }}
                  >
                    {interest.name}
                  </h3>

                  {/* Animated accent line */}
                  <motion.div
                    className="mt-4 h-0.5 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "40%" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ backgroundColor: interest.color }}
                  />
                </div>

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl pointer-events-none"
                  style={{ backgroundColor: `${interest.color}20` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-16 sm:mt-20 md:mt-28 h-px rounded-full"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            background: "linear-gradient(90deg, transparent, var(--purple-light), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>
    </section>
  );
};

export default ResearchInterestsSection;
