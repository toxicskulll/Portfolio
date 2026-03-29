import { motion } from "framer-motion";

interface FormGroup3DProps {
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  color: string;
  glow: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

export const FormGroup3D = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  color,
  glow,
  rows = 1,
  options,
}: FormGroup3DProps) => {
  const baseStyle = {
    backgroundColor: "rgba(19,19,31,0.7)",
    border: `1.5px solid ${color}40`,
    color: "var(--white)",
    borderRadius: "var(--radius)",
  };

  const inputProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(e.target.value),
    placeholder,
    className:
      "w-full px-4 py-3 min-h-12 font-body text-sm outline-none transition-all rounded-lg",
    style: baseStyle as React.CSSProperties,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="element-3d"
      style={{ perspective: "1000px" }}
    >
      <label className="block text-xs uppercase font-mono mb-2" style={{ color: "var(--white-faint)" }}>
        {label}
      </label>

      <motion.div
        initial={{ rotateX: 0 }}
        whileFocus={{ rotateX: 3 }}
        transition={{ duration: 0.2 }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {type === "textarea" ? (
          <motion.textarea
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows}
            className="w-full px-4 py-3 min-h-12 font-body text-sm outline-none resize-none transition-all rounded-lg"
            style={baseStyle as React.CSSProperties}
            whileFocus={{
              scale: 1.02,
              boxShadow: `0 0 30px ${color}60, inset 0 0 15px ${color}20`,
              borderColor: `${color}80`,
              transformStyle: "preserve-3d",
              rotateX: 2,
            }}
            animate={
              error
                ? { borderColor: "rgba(255,75,75,0.8)", boxShadow: "0 0 20px rgba(255,75,75,0.4)" }
                : {}
            }
            transition={{ duration: 0.2 }}
          />
        ) : type === "select" ? (
          <motion.select
            {...(inputProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
            className="w-full px-4 py-3 min-h-12 font-body text-sm outline-none transition-all rounded-lg"
            style={baseStyle as React.CSSProperties}
            whileFocus={{
              scale: 1.02,
              boxShadow: `0 0 30px ${color}60, inset 0 0 15px ${color}20`,
              borderColor: `${color}80`,
            }}
            transition={{ duration: 0.2 }}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ backgroundColor: "rgba(11,11,24,0.9)" }}>
                {opt.label}
              </option>
            ))}
          </motion.select>
        ) : (
          <motion.input
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
            type={type}
            whileFocus={{
              scale: 1.02,
              boxShadow: `0 0 30px ${color}60, inset 0 0 15px ${color}20`,
              borderColor: `${color}80`,
              rotateX: 2,
            }}
            animate={
              error
                ? { borderColor: "rgba(255,75,75,0.8)", boxShadow: "0 0 20px rgba(255,75,75,0.4)" }
                : {}
            }
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-red-400 text-xs mt-1.5 font-body"
        >
          {error}
        </motion.p>
      )}

      {/* Character counter for textarea */}
      {type === "textarea" && (
        <motion.p
          className="text-[0.65rem] mt-1 font-mono uppercase"
          style={{
            color:
              value.length > 500
                ? "rgba(255,75,75,0.7)"
                : value.length > 400
                  ? color + "99"
                  : "var(--white-faint)",
          }}
        >
          {value.length} / 500 characters
        </motion.p>
      )}
    </motion.div>
  );
};
