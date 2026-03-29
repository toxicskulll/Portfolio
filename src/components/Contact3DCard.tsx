import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Contact3DCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  color: string;
  glow: string;
  accentBg: string;
  href?: string;
  delay: number;
}

export const Contact3DCard = ({
  icon: Icon,
  label,
  value,
  color,
  glow,
  accentBg,
  href,
  delay,
}: Contact3DCardProps) => {
  const copyValue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied!`);
  };

  const commonProps = {
    className: "flex items-center gap-4 p-4 rounded-lg border backdrop-blur transition-all cursor-pointer",
    style: {
      backgroundColor: accentBg,
      borderColor: `${color}40`,
      boxShadow: `${glow}20`,
    },
    whileHover: {
      scale: 1.02,
      boxShadow: `${glow}40`,
    },
    transition: { duration: 0 },
  } as const;

  const cardContent = (
    <>
      {/* Icon circle */}
      <motion.div
        className="relative w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center"
        style={{
          background: `${color}20`,
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 10px ${color}20`,
        }}
        whileHover={{
          rotate: 360,
          boxShadow: `0 0 15px ${color}40`,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon size={20} style={{ color }} />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-bold" style={{ color }}>
          {label}
        </p>
        <p className="font-mono text-xs mt-1 truncate" style={{ color: "var(--white-dim)" }}>
          {value}
        </p>
      </div>

      {/* Action buttons */}
      <motion.div
        className="flex gap-2 flex-shrink-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        <motion.button
          onClick={copyValue}
          className="p-2 rounded-md transition-all"
          style={{
            background: `${color}20`,
            border: `1px solid ${color}`,
            color,
          }}
          whileHover={{ scale: 1.15, background: `${color}40` }}
          whileTap={{ scale: 0.9 }}
          title="Copy"
        >
          <Copy size={14} />
        </motion.button>
        {href && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md transition-all"
            style={{
              background: `${color}20`,
              border: `1px solid ${color}`,
              color,
            }}
            whileHover={{ scale: 1.15, background: `${color}40` }}
            whileTap={{ scale: 0.9 }}
            title="Open in new tab"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
          </motion.a>
        )}
      </motion.div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {href ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(commonProps as any)}
        >
          {cardContent}
        </motion.a>
      ) : (
        <motion.div
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(commonProps as any)}
        >
          {cardContent}
        </motion.div>
      )}
    </motion.div>
  );
};
