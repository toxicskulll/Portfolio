import { motion } from "framer-motion";

export const Floating3DElements = () => {
  const elements = [
    { id: 1, top: "5%", left: "10%", delay: 0, color: "cyan", size: 120 },
    { id: 2, top: "20%", right: "5%", delay: 0.5, color: "purple", size: 80 },
    { id: 3, bottom: "15%", left: "5%", delay: 1, color: "teal", size: 100 },
    { id: 4, top: "50%", right: "10%", delay: 1.5, color: "orange", size: 70 },
    { id: 5, bottom: "20%", right: "15%", delay: 2, color: "purple", size: 90 },
  ];

  const colorMap = {
    cyan: "rgba(6, 214, 208, 0.1)",
    purple: "rgba(167, 139, 250, 0.1)",
    teal: "rgba(20, 184, 166, 0.08)",
    orange: "rgba(249, 115, 22, 0.08)",
  };

  const glowMap = {
    cyan: "0 0 50px rgba(6, 214, 208, 0.4)",
    purple: "0 0 50px rgba(167, 139, 250, 0.3)",
    teal: "0 0 50px rgba(20, 184, 166, 0.3)",
    orange: "0 0 50px rgba(249, 115, 22, 0.3)",
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full element-3d float-3d-element"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            width: el.size,
            height: el.size,
            backgroundColor: colorMap[el.color as keyof typeof colorMap],
            boxShadow: glowMap[el.color as keyof typeof glowMap],
            filter: "blur(60px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: el.delay, duration: 0.8 }}
        />
      ))}
    </div>
  );
};
