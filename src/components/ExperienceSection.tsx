import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    role: "AI/ML Intern",
    company: "Aviratha Digital Labs",
    duration: "Feb 2025 — Present",
    location: "Bengaluru, India",
    type: ["Part Time", "On Site"],
    bullets: [
      "Built and deployed machine learning models using Python and TensorFlow, improving efficiency metrics",
      "Optimized inference pipelines reducing computational cost and accelerating model deployment",
      "Collaborated with cross-functional teams to integrate AI solutions in computer vision and NLP",
      "Contributed to internal ML tools for model benchmarking and performance profiling",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "FastAPI"],
  },
  {
    role: "Research Intern",
    company: "Indian Institute of Science (IISc)",
    duration: "Nov 2025 — Present",
    location: "Bengaluru, India",
    type: ["Part Time", "On Site"],
    bullets: [
      "Developing predictive models using Python and Pandas to optimize last-mile connectivity",
      "Integrating H3/OSM spatial-temporal data for urban analysis and planning",
      "Collaborating with urban planners on data-driven infrastructure optimization",
      "Working on quantum-inspired machine learning approaches for optimization problems",
    ],
    tech: ["Python", "Pandas", "Quantum Computing", "Data Analysis"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-28" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">06 · Experience</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8 sm:mb-12 md:mb-16" style={{ color: "var(--purple-light)" }}>
            Work Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line - Enhanced with gradient and glow */}
          <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px" 
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ 
              transformOrigin: "top",
              background: "linear-gradient(180deg, rgba(139,92,246,0.8) 0%, var(--cyan-accent) 30%, var(--teal-accent) 60%, var(--emerald-accent) 100%)",
              boxShadow: "0 0 30px rgba(139,92,246,0.6), 0 0 60px rgba(6,182,212,0.4), var(--glow-multi)",
              filter: "drop-shadow(0 0 10px rgba(6,182,212,0.5))",
            }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const dotColors = [
              { bg: "var(--cyan-accent)", glow: "var(--glow-cyan)" },
              { bg: "var(--orange-accent)", glow: "var(--glow-orange)" },
              { bg: "var(--purple-bright)", glow: "var(--glow-md)" },
              { bg: "var(--teal-accent)", glow: "var(--glow-teal)" },
              { bg: "var(--emerald-accent)", glow: "var(--glow-emerald)" },
            ];
            const dotColor = dotColors[i % dotColors.length];
            const typeColorMap: Record<string, { badge: string; text: string; glow: string }> = {
              "Research Intern": { badge: "rgba(6,182,212,0.15)", text: "var(--cyan-accent)", glow: "var(--glow-cyan)" },
              "Full-time": { badge: "rgba(20,184,166,0.15)", text: "var(--teal-accent)", glow: "var(--glow-teal)" },
              "Part-time": { badge: "rgba(249,115,22,0.15)", text: "var(--orange-accent)", glow: "var(--glow-orange)" },
              "On Site": { badge: "rgba(16,185,129,0.15)", text: "var(--emerald-accent)", glow: "var(--glow-emerald)" },
              "Remote": { badge: "rgba(168,85,247,0.15)", text: "var(--purple-bright)", glow: "var(--glow-md)" },
            };
            const typeStyle = typeColorMap[exp.type] || { badge: "rgba(155,109,255,0.15)", text: "var(--purple-bright)", glow: "var(--glow-md)" };
            
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ 
                  delay: 0.15 + i * 0.25, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className={`relative mb-12 md:w-[45%] ${
                  isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                } ml-10 md:ml-auto`}
              >
                {/* Dot - Enhanced with gradient and pulse animation */}
                <motion.div
                  className="absolute top-6 w-5 h-5 rounded-full hidden md:block"
                  style={{
                    [isLeft ? "right" : "left"]: "-2.5rem",
                    left: isLeft ? "auto" : "-2.5rem",
                    backgroundColor: dotColor.bg,
                    boxShadow: `0 0 25px ${dotColor.bg}, ${dotColor.glow}`,
                  }}
                  whileHover={{ 
                    scale: 1.4,
                    boxShadow: `0 0 50px ${dotColor.bg}, 0 0 40px rgba(155,109,255,0.4)`
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 0 25px ${dotColor.bg}, ${dotColor.glow}`,
                      `0 0 35px ${dotColor.bg}, 0 0 20px rgba(155,109,255,0.3)`,
                      `0 0 25px ${dotColor.bg}, ${dotColor.glow}`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-6 w-5 h-5 rounded-full md:hidden"
                  style={{
                    left: "-2.25rem",
                    backgroundColor: dotColor.bg,
                    boxShadow: `0 0 20px ${dotColor.bg}, ${dotColor.glow}`,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 0 20px ${dotColor.bg}, ${dotColor.glow}`,
                      `0 0 30px ${dotColor.bg}, 0 0 15px rgba(155,109,255,0.3)`,
                      `0 0 20px ${dotColor.bg}, ${dotColor.glow}`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div 
                  className="glass-card p-6 transition-all duration-300"
                  style={{
                    boxShadow: dotColor.glow,
                    border: `1px solid ${dotColor.bg}80`,
                    perspective: "1000px",
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    rotateX: 3,
                    rotateY: 2,
                    boxShadow: `0 25px 60px ${dotColor.bg}50, 0 0 40px ${dotColor.bg}, 0 0 25px rgba(155,109,255,0.4)`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold" style={{ color: "var(--white)" }}>
                      {exp.role}
                    </h3>
                    {Array.isArray(exp.type) ? (
                      exp.type.map((t) => {
                        const tStyle = typeColorMap[t] || { badge: "rgba(155,109,255,0.15)", text: "var(--purple-bright)", glow: "var(--glow-md)" };
                        return (
                          <motion.span 
                            key={t}
                            className="tag-pill text-[0.55rem]"
                            style={{
                              background: tStyle.badge,
                              border: `1px solid ${tStyle.text}`,
                              color: tStyle.text,
                              boxShadow: tStyle.glow + "40",
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {t}
                          </motion.span>
                        );
                      })
                    ) : (
                      <motion.span 
                        className="tag-pill text-[0.55rem]"
                        style={{
                          background: typeStyle.badge,
                          border: `1px solid ${typeStyle.text}`,
                          color: typeStyle.text,
                          boxShadow: typeStyle.glow + "40",
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {exp.type}
                      </motion.span>
                    )}
                  </div>
                  <p className="font-display text-sm font-bold mb-1" style={{ color: dotColor.bg }}>
                    {exp.company}
                  </p>
                  <p className="font-mono text-xs mb-4 font-semibold" style={{ color: dotColor.bg, opacity: 0.9 }}>
                    {exp.duration} · {exp.location}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, idx) => (
                      <motion.li 
                        key={idx} 
                        className="font-body text-sm flex gap-2" 
                        style={{ color: "var(--white-dim)" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.25 + idx * 0.1, duration: 0.5 }}
                      >
                        <span style={{ color: dotColor.bg, flexShrink: 0 }}>▹</span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div 
                    className="flex flex-wrap gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.5 }}
                  >
                    {exp.tech.map((t, idx) => (
                      <motion.span 
                        key={t} 
                        className="tag-pill text-[0.55rem] cursor-pointer"
                        style={{ boxShadow: dotColor.glow + "40" }}
                        whileHover={{ scale: 1.15, boxShadow: dotColor.glow + "80" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.55 + i * 0.25 + idx * 0.08, duration: 0.4 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
