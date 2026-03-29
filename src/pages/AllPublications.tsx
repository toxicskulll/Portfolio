import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PortfolioFooter from "@/components/PortfolioFooter";
import { publications } from "@/components/PublicationsSection";

function getStatusColor(status: string): { bg: string; border: string; text: string; label: string } {
  switch (status) {
    case "Published":
      return { bg: "rgba(34,211,153,0.15)", border: "rgba(34,211,153,0.4)", text: "#34d399", label: "✓ Published" };
    case "Accepted":
      return { bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.4)", text: "#3b82f6", label: "✓ Accepted" };
    case "Communicated":
      return { bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.4)", text: "#a78bfa", label: "→ Communicated" };
    default:
      return { bg: "rgba(156,163,175,0.15)", border: "rgba(156,163,175,0.4)", text: "#9ca3af", label: status };
  }
}

export default function AllPublications() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPub, setSelectedPub] = useState<(typeof publications)[0] | null>(null);
  const [pageExiting, setPageExiting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    setPageExiting(true);
    setTimeout(() => {
      sessionStorage.setItem("scrollToPublications", "true");
      navigate("/");
    }, 300);
  };

  const TimelineLayout = () => {
    return (
      <div className="space-y-6 relative">
        {/* Timeline line - gradient */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
          style={{
            background: "linear-gradient(180deg, var(--cyan-accent), var(--teal-accent), var(--emerald-accent), var(--purple-mid))",
            boxShadow: "0 0 15px rgba(6,214,208,0.3), 0 0 10px rgba(167,139,250,0.2)",
          }}
        />

        {publications.map((pub, i) => {
          const dotColors = ["#06d6d0", "#0d9488", "#059669", "#a78bfa"];
          const dotColor = dotColors[i % dotColors.length];
          const dotGlows = ["var(--glow-cyan)", "var(--glow-teal)", "var(--glow-emerald)", "var(--glow-purple)"];
          const dotGlow = dotGlows[i % dotGlows.length];
          const statusColor = getStatusColor(pub.status);
          
          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + (i % 10) * 0.15, duration: 0.6 }}
              className="glass-card p-6 md:ml-10 relative transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              style={{ 
                borderLeft: `3px solid ${dotColor}`,
                boxShadow: `inset 0 0 20px ${dotColor}15, 0 0 15px ${dotColor}20`,
              }}
              whileHover={{
                boxShadow: `inset 0 0 20px ${dotColor}25, 0 0 25px ${dotColor}40`,
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg" style={{
                background: `linear-gradient(90deg, ${dotColor}20, transparent)`,
              }} />

              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[calc(2.5rem+7px)] top-6 w-3 h-3 rounded-full hidden md:block"
                style={{
                  backgroundColor: dotColor,
                  boxShadow: dotGlow,
                }}
                whileHover={{ scale: 1.3 }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-base md:text-lg font-bold flex-1" style={{ color: "var(--white)" }}>
                    {pub.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    <motion.span
                      className="tag-pill text-[0.6rem] cursor-default"
                      style={{
                        borderColor: dotColor,
                        color: dotColor,
                        background: `${dotColor}15`,
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: `${dotColor}25` }}
                    >
                      {pub.venue}
                    </motion.span>
                    <motion.span
                      className="tag-pill text-[0.6rem] cursor-default"
                      style={{
                        borderColor: statusColor.border,
                        color: statusColor.text,
                        background: statusColor.bg,
                      }}
                      whileHover={{ scale: 1.05, backgroundColor: `${statusColor.text}30` }}
                    >
                      {statusColor.label}
                    </motion.span>
                  </div>
                </div>

                <p className="font-body text-sm mb-3" style={{ color: "var(--white-dim)" }}>
                  {pub.authors.map((a, idx) => (
                    <span key={a}>
                      {a.toLowerCase().includes("aadishesh") ? (
                        <span style={{ color: "var(--purple-light)", fontWeight: "bold" }}>{a}</span>
                      ) : (
                        <span style={{ color: "inherit" }}>{a}</span>
                      )}
                      {idx < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <p className="font-body text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                  📅 {pub.date}
                </p>

                {/* Abstract always visible */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-4"
                >
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--white-dim)" }}>
                    {pub.abstract}
                  </p>
                </motion.div>

                {/* Links */}
                <div className="flex gap-2 flex-wrap">
                  {pub.links.doi && (
                    <motion.a
                      href={pub.links.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs transition-all px-2.5 py-1.5 rounded-md"
                      style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}40` }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: `${dotColor}40`,
                        boxShadow: `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={11} /> DOI
                    </motion.a>
                  )}
                  {pub.links.arxiv && (
                    <motion.a
                      href={pub.links.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs transition-all px-2.5 py-1.5 rounded-md"
                      style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}40` }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: `${dotColor}40`,
                        boxShadow: `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={11} /> arXiv
                    </motion.a>
                  )}
                  {pub.links.code && (
                    <motion.a
                      href={pub.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs transition-all px-2.5 py-1.5 rounded-md"
                      style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}40` }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: `${dotColor}40`,
                        boxShadow: `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code size={11} /> Code
                    </motion.a>
                  )}
                  <motion.button
                    onClick={() => setSelectedPub(pub)}
                    className="flex items-center gap-1 font-mono text-xs transition-all px-2.5 py-1.5 rounded-md"
                    style={{ color: "var(--purple-light)", backgroundColor: "rgba(167, 139, 250, 0.1)", border: "1px solid rgba(167, 139, 250, 0.3)" }}
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(167, 139, 250, 0.2)",
                      boxShadow: `0 0 15px rgba(167, 139, 250, 0.4)`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info size={11} /> Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const DetailsModal = ({ publication }: { publication: (typeof publications)[0] }) => {
    const dotColors = ["#06d6d0", "#0d9488", "#059669", "#a78bfa"];
    const dotColor = dotColors[publications.indexOf(publication) % dotColors.length];
    const statusColor = getStatusColor(publication.status);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={() => setSelectedPub(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="glass-card p-8 relative overflow-hidden max-h-[85vh] overflow-y-auto"
            style={{
              borderColor: `${dotColor}60`,
              boxShadow: `0 0 40px ${dotColor}40, inset 0 0 30px ${dotColor}15`,
            }}
          >
            <motion.button
              onClick={() => setSelectedPub(null)}
              className="absolute top-4 right-4 p-2 rounded-lg transition-all z-10"
              style={{ backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}40` }}
              whileHover={{ backgroundColor: `${dotColor}40`, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} style={{ color: dotColor }} />
            </motion.button>

            <div className="relative z-10 pr-8">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-white mb-3">{publication.title}</h2>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <motion.span
                    className="tag-pill text-xs px-3 py-1 cursor-default"
                    style={{
                      borderColor: dotColor,
                      color: dotColor,
                      background: `${dotColor}15`,
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: `${dotColor}25` }}
                  >
                    {publication.venue}
                  </motion.span>
                  <span
                    className="tag-pill text-xs px-3 py-1"
                    style={{
                      borderColor: statusColor.border,
                      color: statusColor.text,
                      background: statusColor.bg,
                      fontWeight: "bold",
                    }}
                  >
                    {statusColor.label}
                  </span>
                  <span
                    className="tag-pill text-xs px-3 py-1"
                    style={{
                      borderColor: "rgba(167, 139, 250, 0.4)",
                      color: "var(--purple-light)",
                      background: "rgba(167, 139, 250, 0.1)",
                    }}
                  >
                    {publication.year}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-sm font-semibold text-purple-light mb-2">Authors</h3>
                <p className="font-body text-sm text-white-dim">
                  {publication.authors.map((a, idx) => (
                    <span key={a}>
                      {a.toLowerCase().includes("aadishesh") ? (
                        <span style={{ color: "var(--purple-light)", fontWeight: "bold" }}>{a}</span>
                      ) : (
                        <span style={{ color: "inherit" }}>{a}</span>
                      )}
                      {idx < publication.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mb-6 pb-4 border-b border-white/10">
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span className="text-purple-light font-semibold">📅 Published:</span> {publication.date}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-sm font-semibold text-purple-light mb-2">Abstract</h3>
                <p className="font-body text-sm leading-relaxed text-white-dim">{publication.abstract}</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {publication.links.doi && (
                  <motion.a
                    href={publication.links.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                    style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}60` }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${dotColor}40`,
                      boxShadow: `0 0 20px ${dotColor}80, 0 0 40px ${dotColor}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} /> DOI
                  </motion.a>
                )}
                {publication.links.arxiv && (
                  <motion.a
                    href={publication.links.arxiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                    style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}60` }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${dotColor}40`,
                      boxShadow: `0 0 20px ${dotColor}80, 0 0 40px ${dotColor}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} /> arXiv
                  </motion.a>
                )}
                {publication.links.code && (
                  <motion.a
                    href={publication.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                    style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}60` }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${dotColor}40`,
                      boxShadow: `0 0 20px ${dotColor}80, 0 0 40px ${dotColor}40`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code size={16} /> Code
                  </motion.a>
                )}
                <motion.button
                  onClick={() => setSelectedPub(null)}
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
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <motion.section
          className="relative py-28 grid-bg"
          style={{ backgroundColor: "var(--bg-primary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={pageExiting ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: pageExiting ? 0.3 : 0.6, ease: "easeInOut" }}
        >
          <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.button
                onClick={handleBackClick}
                className="inline-flex items-center gap-2 mb-6 font-mono text-sm transition-all px-4 py-2 rounded-lg"
                style={{
                  color: "#2dd4bf",
                  backgroundColor: "rgba(45,212,191,0.1)",
                  border: "1px solid rgba(45,212,191,0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(45,212,191,0.2)",
                  boxShadow: "0 0 15px rgba(45,212,191,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} />
                <span>Back to Portfolio</span>
              </motion.button>
              
              <p className="section-number mb-2">All Publications</p>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.1em]" style={{ color: "var(--purple-light)" }}>
                Research Publications
              </h1>
              <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                A comprehensive collection of {publications.length} peer-reviewed publications
              </p>
            </motion.div>

            {/* Publication Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Total Papers", value: publications.length.toString() },
                { label: "Published", value: publications.filter((p) => p.status === "Published").length.toString() },
                { label: "Accepted", value: publications.filter((p) => p.status === "Accepted").length.toString() },
                { label: "Communicated", value: publications.filter((p) => p.status === "Communicated").length.toString() },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="glass-card px-6 py-4 text-center rounded-lg"
                  style={{
                    backgroundColor: "rgba(45,212,191,0.08)",
                    border: "1px solid rgba(45,212,191,0.2)",
                  }}
                >
                  <div className="font-display text-2xl font-bold text-teal-300 mb-1">{stat.value}</div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <TimelineLayout />

            {/* Modal */}
            <AnimatePresence>
              {selectedPub && <DetailsModal publication={selectedPub} />}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>
      <PortfolioFooter />
    </>
  );
}
