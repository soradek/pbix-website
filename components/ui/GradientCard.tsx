'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight } from '@/components/Icons';

interface GradientCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export function GradientCard({ icon, title, description, href, linkLabel }: GradientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: -(y / rect.height) * 6,
      y: (x / rect.width) * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="gradient-card"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        transformStyle: 'preserve-3d',
        height: '100%',
        minHeight: '260px',
        cursor: 'pointer',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
      animate={{
        y: isHovered ? -4 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(30,153,83,0.15), 0 0 0 1px rgba(30,153,83,0.2)'
          : '0 10px 25px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.08)',
        borderColor: isHovered ? 'rgba(30,153,83,0.3)' : 'rgba(0,0,0,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Subtle top highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)',
        }}
      />

      {/* Emerald accent glow — bottom on hover */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background:
            'radial-gradient(ellipse at bottom center, rgba(212,241,228,0.4) -10%, rgba(30,153,83,0.1) 40%, transparent 70%)',
          filter: 'blur(32px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Bottom border accent */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(30,153,83,0.3) 50%, transparent 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
        animate={{
          boxShadow: isHovered
            ? '0 0 16px 4px rgba(30,153,83,0.12)'
            : '0 0 0px 0px rgba(30,153,83,0)',
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Content */}
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
            gap: '16px',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#d4f1e4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1d1d1f',
                margin: 0,
                letterSpacing: '-0.3px',
                lineHeight: 1.25,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#6e6e73',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Link */}
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1e9953',
              fontSize: '13px',
              fontWeight: 600,
              marginTop: 'auto',
            }}
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {linkLabel}
            <IconArrowRight size={14} color="#1e9953" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
