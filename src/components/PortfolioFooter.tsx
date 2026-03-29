import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, ArrowUp } from "lucide-react";

const PortfolioFooter = () => {
  const [showTop, setShowTop] = useState(false);

  const socials = [
    { icon: Github, href: "https://github.com/toxicskulll", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aadishesh-padasalgi/", label: "LinkedIn" },
    { icon: GraduationCap, href: "https://orcid.org/0009-0009-5153-0902", label: "ORCID" },
    { icon: Mail, href: "mailto:aadishesh.bmsit@gmail.com", label: "Email" },
  ];

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative pt-12 pb-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
        {/* Top gradient line */}
        <div className="glow-divider mb-6 sm:mb-8 md:mb-12" />

        <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <motion.a 
              href="#home" 
              className="font-display text-3xl sm:text-4xl font-extrabold cursor-pointer relative"
              style={{ perspective: "1200px" }}
              whileHover={{ scale: 1.15, rotateZ: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow background layer */}
              <motion.div
                className="absolute inset-0 rounded-lg blur-xl"
                style={{
                  background: "linear-gradient(135deg, #9b6dff, #2dd4bf)",
                  zIndex: -1,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Main text with gradient */}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--purple-bright), var(--cyan-accent), var(--teal-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 30px rgba(155,109,255,0.5)",
                  filter: "drop-shadow(0 0 20px rgba(45,212,191,0.3))",
                  display: "inline-block",
                  letterSpacing: "-0.02em",
                }}
              >
                AP
              </span>
            </motion.a>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all hover:scale-110"
                  style={{ color: "var(--white-dim)", background: "rgba(155,109,255,0.08)" }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="font-mono text-xs" style={{ color: "var(--white-faint)" }}>
              © 2025 Aadishesh Gopal Padasalgi · Built with passion & PyTorch ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: "var(--purple-mid)",
            color: "var(--white)",
            boxShadow: "var(--glow-sm)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
};

export default PortfolioFooter;
