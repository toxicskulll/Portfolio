import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, Zap, Info, X } from "lucide-react";

const projects = [
  {
    title: "Catalyst - AI Placement Platform",
    category: "LLM",
    description: "Intelligent placement preparation platform leveraging JavaScript and modern AI techniques",
    fullDescription: "End-to-end AI-powered placement preparation system featuring personalized learning paths, coding challenges, and adaptive interview preparation. Built with a modern JavaScript stack for high performance and scalability.",
    tech: ["JavaScript", "AI", "LLM", "Placement", "Education"],
    featured: true,
    impact: "Student Career Development",
    wide: true,
    links: { github: "https://github.com/toxicskulll/Catalyst" },
  },
  {
    title: "Quantum NLP with lambeq",
    category: "NLP",
    description: "Quantum-inspired natural language processing using lambeq framework",
    fullDescription: "Implementation of quantum natural language processing techniques using the lambeq framework. Explores intersection of quantum computing and NLP for novel language understanding approaches. Research-focused project combining theoretical quantum concepts with practical NLP applications.",
    tech: ["Jupyter Notebook", "Python", "Quantum Computing", "NLP", "Research"],
    featured: true,
    impact: "Quantum NLP Research",
    links: { github: "https://github.com/toxicskulll/lambeq-qnlp" },
  },
  {
    title: "Tripnosis - Travel Recommendation Engine",
    category: "Vision",
    description: "Intelligent travel destination recommendation system with preferential matching",
    fullDescription: "Travel recommendation system that analyzes travel preferences and suggests similar destinations with intelligent matching algorithms. Processes travel data to provide personalized recommendations and similarity metrics for destination discovery.",
    tech: ["Java", "Recommendation Engine", "Travel", "Algorithms", "Data Processing"],
    featured: false,
    impact: "Travel Intelligence",
    wide: false,
    links: { github: "https://github.com/toxicskulll/Tripnosis" },
  },
  {
    title: "Zhang-pro - Data Analysis & Processing",
    category: "Data",
    description: "Python-based data analysis and machine learning project",
    fullDescription: "Comprehensive Python project for advanced data analysis and machine learning workflows. Implements data processing pipelines, statistical analysis, and ML models for research and analysis purposes.",
    tech: ["Python", "Data Analysis", "Machine Learning", "Research"],
    featured: false,
    impact: "Data Science Research",
    links: { github: "https://github.com/toxicskulll/Zhang-pro" },
  },
];


const ProjectsSection = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = filter ? projects.filter((p) => p.category === filter) : projects;
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const categoryColorMap: { [key: string]: { color: string; glow: string } } = {
    NLP: { color: "#06d6d0", glow: "var(--glow-cyan)" },
    Vision: { color: "#0d9488", glow: "var(--glow-teal)" },
    LLM: { color: "#059669", glow: "var(--glow-emerald)" },
    Data: { color: "#7c3aed", glow: "var(--glow-violet)" },
  };

  // Showcase Variant - Featured cards with full descriptions
  const ShowcaseLayout = () => {
    const featured = filtered.filter((p) => p.featured);
    const other = filtered.filter((p) => !p.featured);

    return (
      <div>
        {/* Featured Projects */}
        {featured.length > 0 && (
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h3 className="font-display text-lg font-semibold mb-6" style={{ color: "var(--purple-light)" }}>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {featured.map((project, i) => {
                const { color, glow } = categoryColorMap[project.category] || { color: "#999", glow: "none" };
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group relative"
                    style={{ perspective: "1000px" }}
                    whileHover={{
                      y: -15,
                      scale: 1.03,
                      rotateX: 5,
                      rotateY: 2,
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{
                      background: `radial-gradient(circle at 50% 0%, ${color}20, transparent)`,
                    }} />
                    <div
                      className="glass-card p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-3 relative overflow-hidden"
                      style={{
                        borderColor: `${color}80`,
                        boxShadow: `0 0 20px ${color}25`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `0 0 40px ${color}60, inset 0 0 30px ${color}15`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `0 0 20px ${color}25`;
                      }}
                    >
                      {/* Animated gradient border */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg p-[1px]" style={{
                        background: `linear-gradient(135deg, ${color}, transparent)`,
                      }} />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <motion.span
                            className="tag-pill text-xs px-3 py-1 flex items-center gap-1"
                            style={{
                              borderColor: color,
                              color: color,
                              background: `${color}20`,
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Star size={12} fill={color} /> Featured
                          </motion.span>
                          <span
                            className="tag-pill text-xs px-2 py-1"
                            style={{
                              borderColor: color,
                              color: color,
                              background: `${color}15`,
                            }}
                          >
                            {project.category}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--white)" }}>
                          {project.title}
                        </h3>
                        <p className="font-body text-sm mb-4" style={{ color: "var(--white-dim)" }}>
                          {project.description}
                        </p>
                        <p className="font-body text-xs leading-relaxed mb-6 italic" style={{ color: "var(--white-dim)" }}>
                          {project.fullDescription}
                        </p>

                        {project.impact && (
                          <div
                            className="mb-6 px-4 py-3 rounded-lg text-xs overflow-hidden relative group/impact"
                            style={{
                              backgroundColor: `${color}15`,
                              borderLeft: `3px solid ${color}`,
                              color: "var(--white)",
                            }}
                          >
                            <div className="absolute inset-0 opacity-0 group-hover/impact:opacity-40 transition-opacity duration-300" style={{
                              background: `linear-gradient(90deg, ${color}30, transparent)`,
                            }} />
                            <div className="relative flex items-center gap-2">
                              <Zap size={12} style={{ color }} />
                              <span><strong>Impact:</strong> {project.impact}</span>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map((t) => (
                            <motion.span 
                              key={t} 
                              className="tag-pill text-[0.65rem] cursor-default"
                              whileHover={{ scale: 1.05, backgroundColor: `${color}30` }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>

                        <div className="flex gap-3 mt-auto flex-wrap">
                          <motion.button
                            onClick={() => setSelectedProject(project)}
                            className="flex items-center gap-1 font-mono text-xs transition-all px-3 py-1.5 rounded-lg"
                            style={{ color: "var(--white)", backgroundColor: `${color}20`, border: `1px solid ${color}60` }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: `${color}40`, 
                              boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Info size={12} /> Details
                          </motion.button>
                          {project.links.github && (
                            <motion.a 
                              href={project.links.github} 
                              className="flex items-center gap-1 font-mono text-xs transition-all px-3 py-1.5 rounded-lg"
                              style={{ color: "var(--white)", backgroundColor: `${color}20`, border: `1px solid ${color}60` }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: `${color}40`, 
                                boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Github size={12} /> GitHub
                            </motion.a>
                          )}
                          {project.links.demo && (
                            <motion.a 
                              href={project.links.demo} 
                              className="flex items-center gap-1 font-mono text-xs transition-all px-3 py-1.5 rounded-lg"
                              style={{ color: "var(--white)", backgroundColor: `${color}20`, border: `1px solid ${color}60` }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: `${color}40`, 
                                boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink size={12} /> Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {other.length > 0 && (
          <div>
            <h3 className="font-display text-lg font-semibold mb-6" style={{ color: "var(--purple-light)" }}>
              Other Notable Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {other.map((project, i) => {
                const { color, glow } = categoryColorMap[project.category] || { color: "#999", glow: "none" };
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: featured.length * 0.1 + i * 0.08, duration: 0.5 }}
                    className="group relative"
                  >
                    <div
                      className="glass-card p-6 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-2"
                      style={{
                        borderColor: `${color}60`,
                        boxShadow: `0 0 15px ${color}15`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `0 0 30px ${color}40, inset 0 0 20px ${color}10`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `0 0 15px ${color}15`;
                      }}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-display text-base font-bold flex-1" style={{ color: "var(--white)" }}>
                            {project.title}
                          </h3>
                          <span
                            className="tag-pill text-[0.65rem] px-2 py-1 shrink-0"
                            style={{
                              borderColor: color,
                              color: color,
                              background: `${color}15`,
                            }}
                          >
                            {project.category}
                          </span>
                        </div>
                        <p className="font-body text-xs mb-3" style={{ color: "var(--white-dim)" }}>
                          {project.description}
                        </p>
                        {project.impact && (
                          <p className="font-body text-[0.7rem] mb-3" style={{ color: color }}>
                            <strong>→</strong> {project.impact}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="tag-pill text-[0.6rem]">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <motion.button 
                            onClick={() => setSelectedProject(project)}
                            className="flex items-center gap-0.5 font-mono text-[0.65rem] transition-all" 
                            style={{ color: "var(--purple-light)" }}
                            whileHover={{ scale: 1.15, color: color }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Info size={10} /> Info
                          </motion.button>
                          {project.links.github && (
                            <motion.a 
                              href={project.links.github} 
                              className="flex items-center gap-0.5 font-mono text-[0.65rem] transition-all" 
                              style={{ color: "var(--purple-light)" }}
                              whileHover={{ scale: 1.15, color: color }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github size={10} /> GH
                            </motion.a>
                          )}
                          {project.links.demo && (
                            <motion.a 
                              href={project.links.demo} 
                              className="flex items-center gap-0.5 font-mono text-[0.65rem] transition-all" 
                              style={{ color: "var(--purple-light)" }}
                              whileHover={{ scale: 1.15, color: color }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={10} /> Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Details Modal Component
  const DetailsModal = ({ project }: { project: (typeof projects)[0] }) => {
    const { color } = categoryColorMap[project.category] || { color: "#999" };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="glass-card p-8 relative overflow-hidden"
            style={{
              borderColor: `${color}60`,
              boxShadow: `0 0 40px ${color}40, inset 0 0 30px ${color}15`,
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg transition-all z-10"
              style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
              whileHover={{ backgroundColor: `${color}40`, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} style={{ color }} />
            </motion.button>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      {project.featured && (
                        <span
                          className="tag-pill text-xs px-3 py-1 flex items-center gap-1"
                          style={{
                            borderColor: color,
                            color: color,
                            background: `${color}20`,
                          }}
                        >
                          <Star size={12} fill={color} /> Featured
                        </span>
                      )}
                      <span
                        className="tag-pill text-xs px-3 py-1"
                        style={{
                          borderColor: color,
                          color: color,
                          background: `${color}15`,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description sections */}
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-display text-sm font-semibold text-purple-light mb-2">Overview</h3>
                  <p className="font-body text-sm text-white-dim leading-relaxed">{project.description}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-purple-light mb-2">Full Description</h3>
                  <p className="font-body text-sm text-white-dim leading-relaxed">{project.fullDescription}</p>
                </div>
              </div>

              {/* Impact Box */}
              {project.impact && (
                <div
                  className="mb-8 px-4 py-3 rounded-lg text-sm overflow-hidden relative"
                  style={{
                    backgroundColor: `${color}15`,
                    borderLeft: `3px solid ${color}`,
                    color: "var(--white)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={16} style={{ color }} />
                    <div>
                      <strong>Impact:</strong> {project.impact}
                    </div>
                  </div>
                </div>
              )}

              {/* Technology Stack */}
              <div className="mb-8">
                <h3 className="font-display text-sm font-semibold text-purple-light mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tag-pill text-xs" style={{ color: color, borderColor: `${color}40`, backgroundColor: `${color}15` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 flex-wrap">
                {project.links.github && (
                  <motion.a
                    href={project.links.github}
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                    style={{ color: "var(--white)", backgroundColor: `${color}20`, border: `1px solid ${color}60` }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${color}40`,
                      boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} /> View Code
                  </motion.a>
                )}
                {project.links.demo && (
                  <motion.a
                    href={project.links.demo}
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                    style={{ color: "var(--white)", backgroundColor: `${color}20`, border: `1px solid ${color}60` }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${color}40`,
                      boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                  style={{ color: "var(--white)", backgroundColor: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.3)" }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(167, 139, 250, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} /> Close
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="relative py-28 grid-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">03 · Projects</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8" style={{ color: "var(--purple-light)" }}>
            Selected Projects
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 sm:mb-8 md:mb-12 flex-wrap">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
              filter === null ? "bg-purple-500" : "glass-card hover:border-opacity-100"
            }`}
            style={{
              borderColor: filter === null ? "#06060d" : "rgba(167, 139, 250, 0.3)",
              backgroundColor: filter === null ? "#a78bfa" : undefined,
              color: filter === null ? "#000" : "var(--white)",
            }}
          >
            All
          </button>
          {categories.map((cat) => {
            const { color } = categoryColorMap[cat] || { color: "#999" };
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-lg font-body text-sm transition-all glass-card"
                style={{
                  borderColor: isActive ? color : `${color}40`,
                  backgroundColor: isActive ? `${color}20` : undefined,
                  color: color,
                  boxShadow: isActive ? `0 0 15px ${color}40` : undefined,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Showcase Layout */}
        <ShowcaseLayout />
        
        {/* Modal */}
        <AnimatePresence>
          {selectedProject && <DetailsModal project={selectedProject} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
