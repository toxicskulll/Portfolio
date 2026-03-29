import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, ChevronDown } from "lucide-react";
import { Floating3DElements } from "./Floating3DElements";

const roles = [
  "Neural Architectures",
  "LLM Systems",
  "Research Models",
  "Intelligent Agents",
  "Computer Vision Pipelines",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentRole) {
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.slice(0, text.length - 1)
            : currentRole.slice(0, text.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, roleIndex]);

  const nameLetters = "Aadishesh Padasalgi".split("");

  const socials = [
    { icon: Github, href: "https://github.com/toxicskulll", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aadishesh-padasalgi/", label: "LinkedIn" },
    { icon: GraduationCap, href: "https://orcid.org/0009-0009-5153-0902", label: "ORCID" },
    { icon: Mail, href: "mailto:aadishesh.bmsit@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Floating3DElements />

      {/* Gradient halo with multi-color glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[600px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(108,63,197,0.25) 0%, rgba(6,214,208,0.1) 35%, transparent 70%)",
          animation: "float-orb 12s ease-in-out infinite",
        }}
      />

      {/* Enhanced floating orbs with accent colors */}
      <div
        className="floating-orb w-[120px] sm:w-[180px] md:w-[240px] lg:w-[300px] h-[120px] sm:h-[180px] md:h-[240px] lg:h-[300px] top-[10%] left-[10%]"
        style={{ background: "linear-gradient(135deg, rgba(155,109,255,0.12), rgba(6,214,208,0.08))" }}
      />
      <div
        className="floating-orb w-[80px] sm:w-[120px] md:w-[160px] lg:w-[200px] h-[80px] sm:h-[120px] md:h-[160px] lg:h-[200px] bottom-[20%] right-[15%]"
        style={{ background: "linear-gradient(45deg, rgba(249,115,22,0.1), rgba(108,63,197,0.12))", animationDelay: "3s" }}
      />
      <div
        className="floating-orb w-[60px] sm:w-[90px] md:w-[120px] lg:w-[150px] h-[60px] sm:h-[90px] md:h-[120px] lg:h-[150px] top-[60%] left-[60%]"
        style={{ background: "linear-gradient(180deg, rgba(13,148,136,0.1), rgba(45,27,105,0.15))", animationDelay: "5s" }}
      />

      {/* Particle dots with enhanced colors */}
      {Array.from({ length: 50 }).map((_, i) => {
        const colors = [
          "var(--purple-bright)",
          "var(--cyan-light)",
          "var(--teal-light)",
          "var(--emerald-light)",
          "var(--orange-light)",
        ];
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none blur-[0.5px]"
            style={{
              backgroundColor: color,
              opacity: Math.random() * 0.4 + 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mono-label mb-6"
        >
          AI · ML · RESEARCH
        </motion.p>

        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] mb-6">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{ color: "var(--white)" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-body text-lg md:text-xl mb-4"
          style={{ color: "var(--white-dim)" }}
        >
          I build{" "}
          <span className="gradient-text font-medium">{text}</span>
          <span className="animate-pulse" style={{ color: "var(--purple-bright)" }}>|</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-body text-base max-w-2xl mx-auto mb-10"
          style={{ color: "var(--white-dim)" }}
        >
          Crafting intelligent systems at the intersection of deep learning,
          language models, and applied research.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a
            href="#projects"
            className="magnetic-btn px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--purple-mid), var(--purple-bright))",
              color: "var(--white)",
              boxShadow: "0 0 20px rgba(167,139,250,0.3)",
            }}
          >
            <span className="relative z-10">View My Work →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-accent/20 to-orange-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="#publications"
            className="magnetic-btn px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:-translate-y-1 group"
            style={{
              border: "1px solid rgba(155,109,255,0.4)",
              color: "var(--purple-light)",
              background: "rgba(155,109,255,0.05)",
            }}
          >
            <span className="group-hover:text-cyan-light transition-colors duration-300">Read My Research →</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-center gap-5"
        >
          {socials.map(({ icon: Icon, href, label }, idx) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + idx * 0.08 }}
              className="p-2.5 rounded-full transition-all duration-300 group relative"
              style={{ background: "rgba(155,109,255,0.08)" }}
            >
              <Icon size={18} className="relative z-10 group-hover:text-cyan-light transition-colors duration-300" style={{ color: "var(--white-dim)" }} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-bright/20 to-cyan-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "scroll-cue 2s ease-in-out infinite" }}
      >
        <span className="mono-label text-[0.65rem]">scroll</span>
        <ChevronDown size={16} style={{ color: "var(--purple-bright)" }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
