'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Training } from '@/data/trainings';
import { IconBarChart, IconExcel, IconDatabase, IconPieChart } from '@/components/Icons';

interface TrainingCardProps {
  training: Training;
  index?: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Power BI': <IconBarChart size={24} color="#1e9953" />,
  'Excel': <IconExcel size={24} color="#1e9953" />,
  'SQL': <IconDatabase size={24} color="#1e9953" />,
  'Wizualizacja danych': <IconPieChart size={24} color="#1e9953" />,
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
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        boxShadow: '0 10px 25px -10px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(30,153,83,0.3)';
        e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(30,153,83,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
        e.currentTarget.style.boxShadow = '0 10px 25px -10px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ width: '44px', height: '44px', background: '#d4f1e4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {categoryIcons[training.category] || <IconBarChart size={24} color="#1e9953" />}
      </div>
      <div>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e9953', marginBottom: '8px', fontWeight: 500 }}>{training.category}</div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f', margin: 0, lineHeight: 1.3 }}>{training.title}</h3>
      </div>
      <div style={{ color: '#6e6e73', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>
        {training.description.substring(0, 120)}...
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#6e6e73', fontWeight: 500 }}>{training.duration}</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e9953', marginTop: '2px' }}>{training.priceLabel}</div>
        </div>
        <Link
          href={`/szkolenia/${training.slug}`}
          style={{
            color: '#1e9953',
            textDecoration: 'none',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
        >
          Szczegóły →
        </Link>
      </div>
    </motion.div>
  );
}
