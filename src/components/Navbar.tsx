import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#open-source" },
  { label: "Publications", href: "#publications" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    setClickedLink(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setMobileOpen(false);
    }
    setTimeout(() => setClickedLink(null), 600);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = links.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">
          <motion.a
            href="#home"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, "#home")}
            className="font-display text-xl font-extrabold transition-all cursor-pointer"
            style={{ color: "var(--purple-bright)" }}
            whileHover={{ scale: 1.1, textShadow: "0 0 12px rgba(155,109,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            AP
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              const isClicked = clickedLink === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, link.href)}
                  className="relative font-body text-sm font-medium transition-colors duration-300 cursor-pointer"
                  style={{
                    color: isActive ? "var(--purple-bright)" : "var(--white-dim)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isClicked ? { y: -2 } : { y: 0 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        backgroundColor: "var(--purple-bright)",
                        boxShadow: "0 0 8px rgba(155,109,255,0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href="/Aadishesh_Padasalgi_Resume.pdf"
              download
              className="inline-flex items-center justify-center p-2 rounded-lg font-body text-sm font-medium transition-all"
              style={{
                border: "1px solid rgba(155,109,255,0.4)",
                color: "var(--purple-light)",
                background: "rgba(155,109,255,0.08)",
              }}
              whileHover={{
                scale: 1.05,
                background: "rgba(155,109,255,0.15)",
                boxShadow: "0 0 16px rgba(155,109,255,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--white)" }}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "rgba(10,10,15,0.95)", backdropFilter: "blur(30px)" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, link.href)}
                className="font-display text-2xl font-bold transition-colors duration-300"
                style={{
                  color: activeSection === link.href.slice(1) ? "var(--purple-bright)" : "var(--white)",
                }}
                whileHover={{ scale: 1.05, color: "var(--purple-bright)" }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/Aadishesh_Padasalgi_Resume.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 }}
              className="inline-flex items-center justify-center p-3 rounded-lg font-display text-xl font-bold transition-colors duration-300"
              style={{
                color: "var(--purple-light)",
              }}
              whileHover={{ scale: 1.05, color: "var(--purple-bright)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={24} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
