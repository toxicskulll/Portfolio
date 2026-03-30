import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, X, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";

export const publications = [
  {
    title: "The Impact of Artificial Intelligence on Side-Channel Security in the Quantum Transition",
    authors: ["Aadishesh Gopal Padasalgi", "M Krishna Prasad", "Rajesh I S", "Bharathi Malakreddy A", "Indumathi S"],
    type: "conference",
    venue: "International Conference on Secure Data Science and Applications (ICSDSA 2026)",
    status: "Accepted",
    date: "2026-01",
    abstract: "This paper reviews AI-driven side-channel attacks and defenses in the quantum era by analyzing 17 research works (2017–2026). It highlights the shift from statistical to data-driven adaptive attacks using deep learning and reinforcement learning. The study finds that post-quantum cryptography implementations exhibit significantly higher leakage (up to 23×) due to structured computations. Hybrid defenses combining classical techniques with AI-based noise injection and masking achieve up to ~95–99% leakage reduction. The work also identifies gaps in NIST PQC standards regarding side-channel evaluation and proposes frameworks for secure implementation.",
    links: { doi: "", arxiv: "", code: "" },
    year: 2026,
  },
  {
    title: "KMNIST: A Large-Scale Dataset and Deep Learning Approach for Kannada Handwritten Character Recognition",
    authors: ["Aadishesh Gopal Padasalgi", "M Krishna Prasad", "Rajesh I S", "Bharathi Malakreddy A"],
    type: "journal",
    venue: "IAENG International Journal of Computer Science (IAENG-IJCS)",
    status: "Communicated",
    date: "2026-01",
    abstract: "This work introduces KMNIST, a large-scale writer-independent dataset of 97,917 Kannada handwritten character samples across 12 classes. The dataset is preprocessed into MNIST-compatible 28×28 images and used to train a CNN model with 421,900 parameters. The model achieves 99.54% classification accuracy with 2.93% loss. The system is deployed in real-world applications including a Tkinter GUI and a Raspberry Pi-based camera system with text-to-speech, demonstrating scalability and practical usability.",
    links: { doi: "", arxiv: "", code: "" },
    year: 2026,
  },
  {
    title: "Architects of Stability in a Noisy Quantum World: Learning to Outsmart Noise with Neural Alchemy",
    authors: ["Aadishesh Gopal Padasalgi", "M Krishna Prasad", "Sreelakshmi T K", "Rajesh I S", "Bharathi Malakreddy A", "Sagargouda Patil"],
    type: "conference",
    venue: "9th International Conference on Innovative Computing and Communication (ICICC 2026)",
    status: "Accepted",
    date: "2025-11",
    abstract: "This paper surveys machine learning and reinforcement learning approaches for quantum error correction (QEC), focusing on decoding strategies for noisy quantum systems. It shows that ML-based decoders outperform traditional algorithms like MWPM under complex noise conditions. Reinforcement learning enables adaptive decoding, improved generalization, and scalability across noise models, though challenges remain in training complexity and convergence. The study highlights simulation environments, evaluation metrics such as logical error rate, and future directions toward automated, fault-tolerant quantum systems.",
    links: { doi: "", arxiv: "", code: "" },
    year: 2025,
  },
  {
    title: "AI-Driven Brain Tumor Segmentation: Innovations, Constraints and the Path Toward Clinical Adoption",
    authors: ["Dr. Archana Bhat", "Aadishesh Gopal Padasalgi", "Aditya B", "Abhay Prabhakar"],
    type: "conference",
    venue: "International Conference on Computing for Sustainability and Intelligent Future (COMP SIF 2025)",
    status: "Published",
    date: "2025-03",
    abstract: "This survey reviews deep learning and machine learning approaches for brain tumor segmentation using medical imaging modalities such as MRI and CT. It highlights the effectiveness of CNNs, U-Nets, and hybrid models in achieving high accuracy in tumor detection. The paper identifies key challenges including limited labeled datasets, class imbalance, computational cost, and lack of clinical validation. It also discusses evaluation metrics such as Dice coefficient and Hausdorff distance, and emphasizes future directions including multi-modal integration, explainability, and real-time clinical deployment.",
    links: { doi: "https://doi.org/10.1109/COMP-SIF65618.2025.10969924", arxiv: "", code: "" },
    year: 2025,
  },
];

const scholarStats = [
  { label: "Publications", value: "4" },
  { label: "Research Areas", value: "4" },
  { label: "Collaborators", value: "12" },
];

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

const PublicationsSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPub, setSelectedPub] = useState<(typeof publications)[0] | null>(null);
  const [pageExiting, setPageExiting] = useState(false);

  const handleBrowseAllClick = () => {
    setPageExiting(true);
    setTimeout(() => {
      navigate("/all-publications");
    }, 300);
  };

  const copyBibtex = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    toast.success("BibTeX copied to clipboard!");
  };

  // Timeline Variant - Classic gradient timeline
  const TimelineLayout = ({ showAll = false }) => {
    const displayPublications = showAll ? publications : publications.slice(0, 3);
    
    return (
      <div className="space-y-6 relative">
        {/* Timeline line - gradient */}
        <div className="absolute left-4 top-0 bottom-0 w-px hidden md:block" style={{ 
          background: "linear-gradient(180deg, var(--cyan-accent), var(--teal-accent), var(--emerald-accent), var(--purple-mid))",
          boxShadow: "0 0 15px rgba(6,214,208,0.3), 0 0 10px rgba(167,139,250,0.2)",
        }} />

        {displayPublications.map((pub, i) => {
          const dotColors = ["#06d6d0", "#0d9488", "#059669"];
          const dotColor = dotColors[i % dotColors.length];
          const dotGlows = ["var(--glow-cyan)", "var(--glow-teal)", "var(--glow-emerald)"];
          const dotGlow = dotGlows[i % dotGlows.length];
          const statusColor = getStatusColor(pub.status);
          
          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
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
                    <button
                      onClick={() => {
                        const raw = pub.links.doi;
                        const url = raw.startsWith("http") ? raw : `https://doi.org/${raw}`;
                        console.log("Opening DOI:", url);
                        window.open(url, "_blank");
                      }}
                      className="flex items-center gap-1 font-mono text-xs transition-all px-2.5 py-1.5 rounded-md hover:scale-105 active:scale-95 cursor-pointer border-none"
                      style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}40` }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${dotColor}40`; e.currentTarget.style.boxShadow = `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${dotColor}20`; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <ExternalLink size={11} /> DOI
                    </button>
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
                        boxShadow: `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`
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
                        boxShadow: `0 0 15px ${dotColor}80, 0 0 30px ${dotColor}40`
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
                      boxShadow: `0 0 15px rgba(167, 139, 250, 0.4)`
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

  // Details Modal Component
  const DetailsModal = ({ publication }: { publication: (typeof publications)[0] }) => {
    const dotColors = ["#06d6d0", "#0d9488", "#059669", "#a78bfa"];
    const dotColor = dotColors[publications.indexOf(publication) % dotColors.length];

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
            {/* Close button */}
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
              {/* Header */}
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-white mb-3">
                  {publication.title}
                </h2>
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
                      borderColor: dotColor,
                      color: dotColor,
                      background: `${dotColor}20`,
                      fontWeight: "bold",
                    }}
                  >
                    {publication.type}
                  </span>
                  <span className="tag-pill text-xs px-3 py-1" style={{
                    borderColor: "rgba(167, 139, 250, 0.4)",
                    color: "var(--purple-light)",
                    background: "rgba(167, 139, 250, 0.1)",
                  }}>
                    {publication.year}
                  </span>
                </div>
              </div>

              {/* Authors */}
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

              {/* Status */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <motion.span
                  className="tag-pill text-xs px-3 py-1 cursor-default inline-block"
                  style={{
                    borderColor: getStatusColor(publication.status).border,
                    color: getStatusColor(publication.status).text,
                    background: getStatusColor(publication.status).bg,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {getStatusColor(publication.status).label}
                </motion.span>
              </div>

              {/* Abstract */}
              <div className="mb-6">
                <h3 className="font-display text-sm font-semibold text-purple-light mb-2">Abstract</h3>
                <p className="font-body text-sm leading-relaxed text-white-dim">
                  {publication.abstract}
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-3 flex-wrap">
                {publication.links.doi && (
                  <button
                    onClick={() => {
                      const raw = publication.links.doi;
                      const url = raw.startsWith("http") ? raw : `https://doi.org/${raw}`;
                      console.log("Opening DOI:", url);
                      window.open(url, "_blank");
                    }}
                    className="flex items-center gap-2 font-mono text-sm transition-all px-4 py-2 rounded-lg hover:scale-105 active:scale-95 cursor-pointer border-none"
                    style={{ color: "var(--white)", backgroundColor: `${dotColor}20`, border: `1px solid ${dotColor}60` }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${dotColor}40`; e.currentTarget.style.boxShadow = `0 0 20px ${dotColor}80, 0 0 40px ${dotColor}40`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${dotColor}20`; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <ExternalLink size={16} /> DOI
                  </button>
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
    <section id="publications" className="relative py-28 grid-bg" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">04 · Publications</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8" style={{ color: "var(--purple-light)" }}>
            Research Publications
          </h2>
        </motion.div>

        {/* Scholar stats */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {scholarStats.map((s, idx) => {
            const colors = ["var(--cyan-light)", "var(--teal-light)", "var(--emerald-light)"];
            const color = colors[idx % colors.length];
            return (
              <motion.div 
                key={s.label} 
                className="glass-card px-6 py-3 flex items-center gap-3 hover:scale-105 transition-all"
                style={{
                  borderColor: `${color}60`,
                  boxShadow: `0 0 15px ${color}20`,
                }}
                whileHover={{
                  boxShadow: `0 0 25px ${color}40`,
                }}
              >
                <span className="font-display text-xl font-bold" style={{ color: color }}>{s.value}</span>
                <span className="font-body text-xs  transition-colors" style={{ color: "var(--white-dim)" }}>{s.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Publications timeline */}
        <TimelineLayout showAll={false} />

        {/* Read More Papers Button */}
        <motion.button
          onClick={handleBrowseAllClick}
          initial={{ opacity: 0, y: 20 }}
          animate={pageExiting ? { opacity: 0, y: -20 } : inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: pageExiting ? 0.3 : 0.6, delay: pageExiting ? 0 : 0.7 }}
          className="inline-flex items-center gap-2 font-mono text-sm transition-all px-6 py-3 rounded-lg mt-8"
          style={{
            color: "#f0fafa",
            backgroundColor: "rgba(45,212,191,0.15)",
            border: "1px solid rgba(45,212,191,0.4)",
            cursor: "pointer",
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(45,212,191,0.25)",
            boxShadow: "0 0 20px rgba(45,212,191,0.5), 0 0 40px rgba(45,212,191,0.25)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Browse All {publications.length} Papers</span>
          <ArrowRight size={16} />
        </motion.button>

        {/* Modal */}
        <AnimatePresence>
          {selectedPub && <DetailsModal publication={selectedPub} />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PublicationsSection;
