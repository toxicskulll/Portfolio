import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ParticleEffectProps {
  isActive: boolean;
  position: { x: number; y: number };
  colors?: string[];
}

export const ParticleEffect = ({
  isActive,
  position,
  colors = ["#06d6d0", "#0d9488", "#a78bfa", "#f97316"],
}: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: position.x,
        y: position.y,
        color: colors[i % colors.length],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, position, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => {
        const angle = (particle.id / 12) * Math.PI * 2;
        const distance = 150;
        const endX = particle.x + Math.cos(angle) * distance;
        const endY = particle.y + Math.sin(angle) * distance;

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: endX - particle.x,
              y: endY - particle.y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};
