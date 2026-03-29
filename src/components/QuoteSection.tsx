import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface QuoteSectionProps {
  quote: string;
  author?: string;
}

export default function QuoteSection({ quote, author }: QuoteSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative py-20 px-4"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(45,212,191,0.03) 50%, transparent 100%)',
      }}
    >
      <div className="relative max-w-3xl mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* Top-left decorative bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="absolute top-0 left-0 pointers-events-none"
          style={{
            fontSize: '28px',
            color: 'rgba(45, 212, 191, 0.6)',
            fontWeight: 'bold',
            letterSpacing: '4px',
            lineHeight: 1,
          }}
        >
          ||
        </motion.div>

        {/* Bottom-right decorative bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-0 right-0 pointers-events-none"
          style={{
            fontSize: '28px',
            color: 'rgba(45, 212, 191, 0.6)',
            fontWeight: 'bold',
            letterSpacing: '4px',
            lineHeight: 1,
          }}
        >
          ||
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative text-center py-8"
        >
          {/* Quote text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-light italic mb-8"
            style={{
              color: 'rgba(240,250,250,0.9)',
              letterSpacing: '0.01em',
              lineHeight: 1.8,
              fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            }}
          >
            {quote}
          </motion.p>

          {/* Author */}
          {author && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontSize: '14px',
                color: 'rgba(45,212,191,0.8)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              — {author}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
