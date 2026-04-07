'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Training } from '@/data/trainings';

interface TrainingCardProps {
  training: Training;
  index?: number;
}

const categoryIcons: Record<string, string> = {
  'Power BI': '📊',
  'Excel': '📗',
  'SQL': '🗄️',
  'Wizualizacja danych': '📈',
};

export default function TrainingCard({ training, index = 0 }: TrainingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
    >
      <div style={{ fontSize: '32px' }}>{categoryIcons[training.category] || '📚'}</div>
      <div>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#0071e3', marginBottom: '8px' }}>{training.category}</div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f5f5f7', margin: 0, lineHeight: 1.3 }}>{training.title}</h3>
      </div>
      <div style={{ color: '#86868b', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
        {training.description.substring(0, 120)}...
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#86868b' }}>{training.duration}</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#f5f5f7' }}>{training.priceLabel}</div>
        </div>
        <Link
          href={`/szkolenia/${training.slug}`}
          style={{
            color: '#0071e3',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Szczegóły →
        </Link>
      </div>
    </motion.div>
  );
}
