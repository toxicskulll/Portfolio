import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Brain,
  Zap,
  Cpu,
  BarChart3,
  Database,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Terminal,
  Package,
  Cloud,
} from "lucide-react";
import { Rotating3DIcon } from "./3DRotatingIcon";

const technicalSkills = [
  { name: "Python", level: 95, icon: Code },
  { name: "C", level: 85, icon: Cpu },
  { name: "TensorFlow", level: 92, icon: Brain },
  { name: "HuggingFace Transformers", level: 90, icon: Zap },
  { name: "Pandas", level: 88, icon: BarChart3 },
  { name: "FastAPI", level: 82, icon: Code },
  { name: "Qiskit", level: 80, icon: Cpu },
  { name: "PennyLane", level: 78, icon: Lightbulb },
];

const researchSkills = [
  { name: "Literature Review", level: 95, icon: BookOpen },
  { name: "Experimental Design", level: 90, icon: Lightbulb },
  { name: "Statistical Analysis", level: 85, icon: BarChart3 },
  { name: "Academic Writing", level: 88, icon: Terminal },
  { name: "Peer Review", level: 80, icon: TrendingUp },
];

const toolsWithIcons = [
  { name: "Git", icon: Code },
  { name: "Linux", icon: Terminal },
  { name: "Jupyter", icon: Code },
  { name: "VS Code", icon: Code },
  { name: "LaTeX", icon: BookOpen },
  { name: "AWS", icon: Cloud },
  { name: "GCP", icon: Cloud },
  { name: "FastAPI", icon: Zap },
  { name: "Streamlit", icon: Zap },
  { name: "Ollama", icon: Package },
  { name: "Docker", icon: Terminal },
  { name: "Pandas", icon: BarChart3 },
  { name: "NumPy", icon: Cpu },
  { name: "Matplotlib", icon: BarChart3 },
  { name: "Jupyter Lab", icon: Code },
  { name: "GitHub", icon: Code },
];

const SkillBar = ({ name, level, delay, icon: Icon }: { name: string; level: number; delay: number; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  // Rotate through accent colors
  const colors = [
    { gradient: "linear-gradient(90deg, #7c4dff, #a78bfa)", glow: "rgba(167,139,250,0.4)" },
    { gradient: "linear-gradient(90deg, #06d6d0, #26f0de)", glow: "rgba(6,214,208,0.4)" },
    { gradient: "linear-gradient(90deg, #0d9488, #14b8a6)", glow: "rgba(20,184,166,0.4)" },
    { gradient: "linear-gradient(90deg, #059669, #10b981)", glow: "rgba(16,185,129,0.4)" },
    { gradient: "linear-gradient(90deg, #7c4dff, #f97316)", glow: "rgba(249,115,22,0.4)" },
  ];
  
  const colorIndex = name.length % colors.length;
  const { gradient, glow } = colors[colorIndex];
  
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color: "var(--purple-light)" }} />
          <span className="font-body text-sm" style={{ color: "var(--white-dim)" }}>{name}</span>
        </div>
        <span className="font-mono text-xs" style={{ color: "var(--purple-light)" }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(155,109,255,0.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: gradient,
            boxShadow: `0 0 12px ${glow}`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const CircularProgress = ({ name, level, delay, icon: Icon }: { name: string; level: number; delay: number; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 32;
  
  // Rotate through accent colors
  const colors = ["#06d6d0", "#14b8a6", "#10b981", "#fb923c", "#a78bfa"];
  const glows = ["rgba(6,214,208,0.5)", "rgba(20,184,166,0.5)", "rgba(16,185,129,0.4)", "rgba(249,115,22,0.5)", "rgba(167,139,250,0.5)"];
  
  const colorIndex = name.length % colors.length;
  const color = colors[colorIndex];
  const glow = glows[colorIndex];
  
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative">
        <svg width="80" height="80" className="transform -rotate-90" style={{ filter: `drop-shadow(0 0 10px ${glow})` }}>
          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(155,109,255,0.1)" strokeWidth="3" />
          <motion.circle
            cx="40" cy="40" r="32" fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - (level / 100) * circumference } : {}}
            transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Rotating3DIcon icon={<Icon size={24} />} color={color} delay={delay} scale={1} />
        </div>
      </div>
      <span className="font-body text-xs mt-2 text-center" style={{ color: "var(--white-dim)" }}>{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-28 grid-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">02 · Skills</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8 sm:mb-12 md:mb-16" style={{ color: "var(--purple-light)" }}>
            Skills & Expertise
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Technical */}
          <motion.div
            className="glass-card p-8 transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              borderColor: "rgba(6,214,208,0.3)",
              boxShadow: "0 0 20px rgba(167,139,250,0.15), 0 0 15px rgba(6,214,208,0.1)",
            }}
            whileHover={{
              boxShadow: "0 0 25px rgba(167,139,250,0.2), 0 0 15px rgba(6,214,208,0.15)",
              transition: { duration: 0 },
            }}
          >
            <h3 className="font-display text-lg font-bold mb-6 text-cyan-light transition-colors" style={{ color: "var(--white)" }}>
              Core Technical
            </h3>
            {technicalSkills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={0.1 + i * 0.08} />
            ))}
          </motion.div>

          {/* Research */}
          <motion.div
            className="glass-card p-8 transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              borderColor: "rgba(13,148,136,0.3)",
              boxShadow: "0 0 20px rgba(167,139,250,0.15), 0 0 15px rgba(13,148,136,0.1)",
            }}
            whileHover={{
              boxShadow: "0 0 25px rgba(167,139,250,0.2), 0 0 15px rgba(13,148,136,0.15)",
              transition: { duration: 0 },
            }}
          >
            <h3 className="font-display text-lg font-bold mb-6 text-teal-light" style={{ color: "var(--white)" }}>
              Research Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {researchSkills.map((skill, i) => (
                <CircularProgress key={skill.name} {...skill} delay={0.1 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            className="glass-card p-8 transition-shadow hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              borderColor: "rgba(249,115,22,0.3)",
              boxShadow: "0 0 20px rgba(167,139,250,0.15), 0 0 15px rgba(249,115,22,0.1)",
            }}
            whileHover={{
              boxShadow: "0 0 25px rgba(167,139,250,0.2), 0 0 15px rgba(249,115,22,0.15)",
              transition: { duration: 0 },
            }}
          >
            <h3 className="font-display text-lg font-bold mb-6 text-orange-light" style={{ color: "var(--white)" }}>
              Tools & Ecosystem
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolsWithIcons.map((tool, i) => {
                const colors = [
                  { bg: "rgba(6,214,208,0.12)", border: "rgba(6,214,208,0.4)", text: "var(--cyan-light)" },
                  { bg: "rgba(13,148,136,0.12)", border: "rgba(13,148,136,0.4)", text: "var(--teal-light)" },
                  { bg: "rgba(5,150,105,0.12)", border: "rgba(5,150,105,0.4)", text: "var(--emerald-light)" },
                  { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.4)", text: "var(--orange-light)" },
                ];
                const colorSet = colors[i % colors.length];
                const Icon = tool.icon;
                return (
                  <motion.span
                    key={tool.name}
                    className="tag-pill cursor-default transition-transform hover:scale-110 flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    style={{
                      fontSize: `${0.7 + Math.random() * 0.15}rem`,
                      background: colorSet.bg,
                      border: `1px solid ${colorSet.border}`,
                      color: colorSet.text,
                    }}
                  >
                    <Icon size={12} />
                    {tool.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
