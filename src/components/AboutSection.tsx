import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";

const stats = [
  { value: 5, label: "Research Papers", suffix: "+" },
  { value: 3, label: "Projects", suffix: "+" },
  { value: 9, label: "Months Experience", suffix: "+" },
  { value: 12, label: "GitHub Repositories", suffix: "+" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-3xl font-extrabold gradient-text">
      {count}{suffix}
    </span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 grid-bg" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-number mb-2">01 · About</p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-8 sm:mb-12 md:mb-16"
            style={{ color: "var(--purple-light)" }}
          >
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Left: Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Morphing blob behind with gradient */}
              <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)]" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(108,63,197,0.2)" />
                    <stop offset="50%" stopColor="rgba(6,214,208,0.15)" />
                    <stop offset="100%" stopColor="rgba(249,115,22,0.1)" />
                  </linearGradient>
                </defs>
                <path fill="url(#blobGradient)">
                  <animate
                    attributeName="d"
                    dur="8s"
                    repeatCount="indefinite"
                    values="M45,-52.3C56.5,-44.5,62.3,-28.5,64.8,-12.1C67.3,4.3,66.6,21.1,58.6,33.3C50.6,45.5,35.3,53.1,19.3,57.4C3.3,61.7,-13.3,62.7,-28.6,57.3C-43.9,51.9,-57.8,40.1,-63.5,25.3C-69.2,10.5,-66.7,-7.3,-60.1,-22.5C-53.5,-37.7,-42.8,-50.3,-30,-56.5C-17.2,-62.7,-2.3,-62.5,11.4,-59C25.1,-55.5,33.5,-60.1,45,-52.3Z;
                    M42.4,-49.2C53.8,-40.3,61.5,-25.5,64.1,-9.5C66.7,6.5,64.2,23.7,55.1,36.5C46,49.3,30.3,57.7,13.7,60.9C-2.9,64.1,-20.4,62.1,-34.7,54.1C-49,46.1,-60.1,32.1,-64.7,15.9C-69.3,-0.3,-67.4,-18.7,-58.8,-32.7C-50.2,-46.7,-34.9,-56.3,-19.1,-59.1C-3.3,-61.9,13,-58.1,42.4,-49.2Z"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
                </path>
              </svg>

              <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  border: "2px solid var(--purple-mid)",
                  boxShadow: "0 0 30px rgba(167,139,250,0.3), 0 0 20px rgba(6,214,208,0.2)",
                  background: "linear-gradient(135deg, var(--purple-deep), var(--purple-mid))",
                }}
              >
                <div className="w-full h-full flex items-center justify-center font-display text-5xl font-extrabold" style={{ color: "var(--purple-light)" }}>
                  AP
                </div>
              </div>

              {/* Floating tags with color cycling */}
              {["Quantum", "NLP", "TensorFlow", "Research"].map((tag, i) => {
                const colors = ["var(--cyan-light)", "var(--teal-light)", "var(--emerald-light)", "var(--orange-light)"];
                const bgColors = ["rgba(6,214,208,0.15)", "rgba(13,148,136,0.15)", "rgba(5,150,105,0.12)", "rgba(249,115,22,0.15)"];
                return (
                  <motion.span
                    key={tag}
                    className="tag-pill absolute text-[0.6rem] backdrop-blur-md transition-all hover:scale-110"
                    style={{
                      top: `${[10, 80, 5, 75][i]}%`,
                      left: `${[-20, 110, 105, -25][i]}%`,
                      color: colors[i],
                      background: bgColors[i],
                      border: `1px solid ${colors[i]}40`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                      boxShadow: [
                        `0 0 8px ${colors[i]}40`,
                        `0 0 16px ${colors[i]}60`,
                        `0 0 8px ${colors[i]}40`,
                      ],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {tag}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--white-dim)" }}>
              Research-driven AI/ML engineer with a strong foundation in machine learning, natural language processing, and quantum computing. Experienced in building end-to-end research systems and leading student innovation teams.
            </p>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "var(--white-dim)" }}>
              Currently exploring generative AI, interpretable systems, and quantum-inspired machine learning. Passionate about creating intelligent systems that are not just powerful, but also transparent and sustainable.
            </p>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--white-dim)" }}>
              My research interests span cognitive systems, multimodal learning, privacy-preserving computation, and explainable AI. I believe in making complex AI research accessible through code, papers, and community collaboration.
            </p>

            <a
              href="/Aadishesh_Padasalgi_Resume.pdf"
              download
              className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm transition-all"
              style={{
                border: "1px solid rgba(155,109,255,0.3)",
                color: "var(--purple-light)",
              }}
            >
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16 md:mt-20"
        >
          {stats.map((stat, idx) => {
            const accentColors = ["var(--cyan-light)", "var(--teal-light)", "var(--emerald-light)", "var(--orange-light)"];
            const accentColor = accentColors[idx];
            return (
              <motion.div
                key={stat.label}
                className="glass-card p-6 text-center transition-all hover:scale-105 group"
                style={{ 
                  boxShadow: `0 0 20px rgba(167,139,250,0.2), 0 0 15px ${accentColor}30`,
                }}
                whileHover={{ y: -5 }}
              >
                <div className="group-hover:text-cyan-light transition-colors duration-300">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-body text-xs mt-2 group-hover:text-white transition-colors duration-300" style={{ color: "var(--white-dim)" }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
