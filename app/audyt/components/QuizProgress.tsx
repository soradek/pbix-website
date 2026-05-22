'use client';

import { motion } from 'framer-motion';

interface Props {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: Props) {
  const pct = (current / total) * 100;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', color: '#6e6e73', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
          Pytanie {current} z {total}
        </span>
        <span style={{ fontSize: '11px', color: '#6e6e73', fontWeight: 500 }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{ width: '100%', height: '5px', background: '#f0f0f2', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: '#1e9953', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}
