import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Rotating3DIconProps {
  icon: ReactNode;
  color: string;
  delay?: number;
  scale?: number;
}

export const Rotating3DIcon = ({
  icon,
  color,
  delay = 0,
  scale = 1,
}: Rotating3DIconProps) => {
  return (
    <motion.div
      className="element-3d"
      style={{ perspective: "1000px" }}
      animate={{
        rotateX: [0, 360, 0],
        rotateY: [0, 360, 360],
        rotateZ: [0, 0, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      <div
        style={{
          color,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          scale={scale}
          whileHover={{ scale: scale * 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};
