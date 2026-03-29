import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, GitFork, Sparkles } from "lucide-react";

const contributions = [
  {
    title: "FastLLM Router",
    type: "personal",
    description: "Intelligent LLM routing with latency & cost optimization",
    category: "Library",
    impact: "3.2K",
    impactLabel: "Stars",
    tech: ["Python", "FastAPI", "Redis", "LangChain"],
    links: { github: "#", demo: "#" },
  },
  {
    title: "Contributed GGML Optimization",
    type: "external",
    description: "Optimized matrix multiplication kernels for CPU inference",
    category: "Optimization",
    impact: "25%",
    impactLabel: "Latency ↓",
    tech: ["C++", "GGML", "SIMD"],
    links: { github: "#", pr: "#" },
  },
  {
    title: "Vision RAG Framework",
    type: "personal",
    description: "RAG system for multimodal AI and medical imaging analysis",
    category: "Framework",
    impact: "50+",
    impactLabel: "Projects",
    tech: ["PyTorch", "FAISS", "OpenAI", "FastAPI"],
    links: { github: "#", demo: "#" },
  },
  {
    title: "PyTorch Quantization PR",
    type: "external",
    description: "Implemented dynamic quantization for transformer models",
    category: "Integration",
    impact: "75%",
    impactLabel: "Size ↓",
    tech: ["PyTorch", "ONNX", "Quantization"],
    links: { github: "#", pr: "#" },
  },
  {
    title: "DevOps Automation Toolkit",
    type: "personal",
    description: "CI/CD pipeline automation for ML model deployment",
    category: "DevOps",
    impact: "1.8K",
    impactLabel: "Stars",
    tech: ["Docker", "Kubernetes", "Python", "GitHub Actions"],
    links: { github: "#" },
  },
  {
    title: "Transformer Attention Viz",
    type: "external",
    description: "Contributed visualization features to HuggingFace Transformers",
    category: "Tool",
    impact: "200K+",
    impactLabel: "Users",
    tech: ["React", "D3.js", "TypeScript"],
    links: { github: "#", pr: "#" },
  },
  {
    title: "Edge Inference Engine",
    type: "personal",
    description: "Real-time inference on resource-constrained devices",
    category: "Library",
    impact: "240+",
    impactLabel: "Discussions",
    tech: ["TensorFlow Lite", "WebGL", "React"],
    links: { github: "#", demo: "#" },
  },
];

export default function OpenSourceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="open-source"
      className="relative py-28 px-4"
      style={{ fontFamily: "'IBM Plex Mono', 'Fira Code', monospace" }}
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(34,211,197,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "5%",
            left: "5%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{
              color: "#f0fafa",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Community&nbsp;
            <span
              style={{
                background: "linear-gradient(90deg, #2dd4bf, #34d399, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Contributions
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "14px", letterSpacing: "0.02em" }}>
            Personal projects & open source contributions to the AI/ML ecosystem
          </p>
        </motion.div>

        {/* Contributions Grid with Blur Overlay */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ filter: "blur(4px)", opacity: 0.6 }}>
            {contributions.map((contrib, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.08 + index * 0.05,
                ease: "easeOut",
              }}
              className="group relative h-full"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative h-full rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  background: contrib.type === "personal" 
                    ? "linear-gradient(135deg, rgba(45,212,191,0.08) 0%, rgba(34,211,153,0.04) 100%)"
                    : "linear-gradient(135deg, rgba(167,139,250,0.07) 0%, rgba(139,92,246,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  padding: "24px",
                  borderRadius: "16px",
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: contrib.type === "personal"
                      ? "linear-gradient(90deg, #2dd4bf, #34d399, rgba(52,211,153,0))"
                      : "linear-gradient(90deg, #a78bfa, #8b5cf6, rgba(139,92,246,0))",
                  }}
                />

                {/* Personal project sparkle animation */}
                {contrib.type === "personal" && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "16px",
                      opacity: 0.6,
                    }}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles size={16} style={{ color: "#2dd4bf" }} />
                  </motion.div>
                )}

                {/* Category badge */}
                <div className="mb-3 inline-block">
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: contrib.type === "personal"
                        ? "rgba(45,212,191,0.15)"
                        : "rgba(167,139,250,0.15)",
                      color: contrib.type === "personal"
                        ? "#2dd4bf"
                        : "#a78bfa",
                      border: contrib.type === "personal"
                        ? "1px solid rgba(45,212,191,0.25)"
                        : "1px solid rgba(167,139,250,0.25)",
                    }}
                  >
                    {contrib.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold leading-snug mb-2 group-hover:text-teal-300 transition-colors"
                  style={{
                    color: "#f0fafa",
                    fontSize: "16px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {contrib.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: "16px",
                  }}
                >
                  {contrib.description}
                </p>

                {/* Impact metrics */}
                <div
                  className="mb-4 p-3 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {contrib.impactLabel}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: contrib.type === "personal" ? "#2dd4bf" : "#a78bfa",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {contrib.impact}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {contrib.tech.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "10px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  {contrib.links.github && (
                    <motion.a
                      href={contrib.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all"
                      style={{
                        background: "rgba(45,212,191,0.1)",
                        border: "1.5px solid rgba(45,212,191,0.3)",
                        color: "rgba(45,212,191,0.85)",
                        letterSpacing: "0.04em",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.18)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.55)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(45,212,191,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,212,191,0.3)";
                      }}
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </motion.a>
                  )}

                  {contrib.links.demo && (
                    <motion.a
                      href={contrib.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all"
                      style={{
                        background: "rgba(167,139,250,0.1)",
                        border: "1.5px solid rgba(167,139,250,0.3)",
                        color: "rgba(167,139,250,0.85)",
                        letterSpacing: "0.04em",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.18)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.55)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.3)";
                      }}
                    >
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </motion.a>
                  )}

                  {contrib.links.pr && (
                    <motion.a
                      href={contrib.links.pr}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all"
                      style={{
                        background: "rgba(251,146,60,0.1)",
                        border: "1.5px solid rgba(251,146,60,0.3)",
                        color: "rgba(251,146,60,0.85)",
                        letterSpacing: "0.04em",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(251,146,60,0.18)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,146,60,0.55)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(251,146,60,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,146,60,0.3)";
                      }}
                    >
                      <GitFork size={14} />
                      <span>PR</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
          
          {/* Coming Soon Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
              borderRadius: "12px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #2dd4bf, #34d399, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                }}
              >
                Coming Soon
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "8px", fontSize: "14px" }}>
                Exciting projects & contributions in development
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
