'use client';

import { motion } from 'framer-motion';

interface Props {
  score: number;
  maxScore: number;
  color: string;
}

const R = 70;
const CX = 100;
const CY = 100;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function ScoreGauge({ score, maxScore, color }: Props) {
  const progress = score / maxScore;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <svg viewBox="0 0 200 200" width="160" height="160" style={{ display: 'block', margin: '0 auto' }}>
      {/* Track */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="#f0f0f2"
        strokeWidth="14"
      />
      {/* Fill — rotated so arc starts from top */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        transform={`rotate(-90 ${CX} ${CY})`}
      />
      {/* Score text */}
      <text
        x={CX}
        y={CY - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#1d1d1f"
        fontSize="34"
        fontWeight="800"
        fontFamily="Inter, sans-serif"
        letterSpacing="-1"
      >
        {score}
      </text>
      <text
        x={CX}
        y={CY + 22}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#6e6e73"
        fontSize="13"
        fontFamily="Inter, sans-serif"
      >
        / {maxScore} pkt
      </text>
    </svg>
  );
}
