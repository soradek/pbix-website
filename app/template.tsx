'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [showMask] = useState(() => hasNavigated && !reduced);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {showMask && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#0b0d0c',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', width: '100%', height: 3, background: 'var(--accent)', transformOrigin: 'left' }}
          />
        </motion.div>
      )}
      {children}
    </>
  );
}
