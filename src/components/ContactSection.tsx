import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Contact3DCard } from "./Contact3DCard";
import { FormGroup3D } from "./FormGroup3D";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.warn("EmailJS public key not configured. Please add VITE_EMAILJS_PUBLIC_KEY to .env.local");
    }
  }, []);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        throw new Error("EmailJS credentials not configured. Please add VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_TEMPLATE_ID to .env.local");
      }

      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: "aadishesh.bmsit@gmail.com",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully! 🎉");
        setForm({ name: "", email: "", subject: "general", message: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Contact methods with minimalist cards
  const contactMethods = [
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/toxicskulll",
      href: "https://github.com/toxicskulll",
      color: "#a78bfa",
      glow: "0 0 25px rgba(167,139,250,0.4)",
      bg: "rgba(167,139,250,0.08)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/aadishesh-padasalgi",
      href: "https://www.linkedin.com/in/aadishesh-padasalgi/",
      color: "#0d9488",
      glow: "0 0 25px rgba(20,184,166,0.4)",
      bg: "rgba(20,184,166,0.08)",
    },
    {
      icon: BookOpen,
      label: "ORCID",
      value: "0009-0009-5153-0902",
      href: "https://orcid.org/0009-0009-5153-0902",
      color: "#06d6d0",
      glow: "0 0 25px rgba(6,214,208,0.4)",
      bg: "rgba(6,214,208,0.08)",
    },
    {
      icon: Mail,
      label: "Email",
      value: "aadishesh.bmsit@gmail.com",
      href: "mailto:aadishesh.bmsit@gmail.com",
      color: "#f97316",
      glow: "0 0 25px rgba(249,115,22,0.4)",
      bg: "rgba(249,115,22,0.08)",
    },
  ];

  return (
    <section id="contact" className="relative py-32" style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(6,214,208,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      {/* Animated grid background for form */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,214,208,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,214,208,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        animate={{ opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="section-number mb-2">07 · Contact</p>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] mb-3"
            style={{ color: "var(--purple-light)" }}
          >
            Let's Build Something Intelligent
          </h2>
          <p className="font-body text-sm max-w-xs sm:max-w-sm md:max-w-2xl mb-6 sm:mb-8 md:mb-12" style={{ color: "var(--white-dim)" }}>
            I'm always open to discussing research collaborations, ML engineering opportunities, or interesting problems in AI. Pick your preferred method and let's connect.
          </p>
        </motion.div>

        {/* Response time badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-6 sm:mb-8 md:mb-12"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgb(34,197,94)" }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-body text-xs" style={{ color: "rgb(34,197,94)" }}>
            Typically responds within 24 hours
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-12 md:mb-16">
          {/* Left: Contact 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h3 className="font-display text-lg font-bold mb-6" style={{ color: "var(--white)" }}>
              Direct Contact
            </h3>
            <div className="flex flex-col gap-3">
              {contactMethods.map((method, idx) => (
                <Contact3DCard
                  key={method.label}
                  icon={method.icon}
                  label={method.label}
                  value={method.value}
                  color={method.color}
                  glow={method.glow}
                  accentBg={method.bg}
                  href={method.href}
                  delay={0.2 + idx * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-5"
            style={{ perspective: "1000px" }}
          >
            <FormGroup3D
              label="Your Name"
              placeholder="John Doe"
              value={form.name}
              onChange={(name) => setForm({ ...form, name })}
              error={errors.name}
              color="#06d6d0"
              glow="var(--glow-cyan)"
            />

            <FormGroup3D
              label="Your Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(email) => setForm({ ...form, email })}
              error={errors.email}
              color="#0d9488"
              glow="var(--glow-teal)"
            />

            <FormGroup3D
              label="Subject"
              type="select"
              placeholder="Select subject"
              value={form.subject}
              onChange={(subject) => setForm({ ...form, subject })}
              color="#a78bfa"
              glow="var(--glow-md)"
              options={[
                { value: "general", label: "General Inquiry" },
                { value: "research", label: "Research Collaboration" },
                { value: "job", label: "Job Opportunity" },
                { value: "project", label: "Project Collaboration" },
                { value: "other", label: "Other" },
              ]}
            />

            <FormGroup3D
              label="Your Message"
              type="textarea"
              placeholder="Tell me about your idea or inquiry..."
              value={form.message}
              onChange={(message) => setForm({ ...form, message })}
              error={errors.message}
              color="#f97316"
              glow="var(--glow-orange)"
              rows={5}
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-body font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #06d6d0, #0d9488)",
                color: "var(--white)",
                boxShadow: "0 0 25px rgba(6,214,208,0.4)",
                opacity: loading ? 0.9 : 1,
              }}
              whileHover={
                !loading
                  ? {
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(6,214,208,0.8), 0 0 60px rgba(20,184,166,0.5)",
                    }
                  : {}
              }
              whileTap={!loading ? { scale: 0.95 } : {}}
              animate={loading ? { opacity: [0.9, 1, 0.9] } : {}}
              transition={{ duration: loading ? 1.5 : 0.3, repeat: loading ? Infinity : 0 }}
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-transparent border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
