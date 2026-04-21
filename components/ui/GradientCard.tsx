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
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#011509',
        transformStyle: 'preserve-3d',
        height: '100%',
        minHeight: '260px',
        cursor: 'pointer',
      }}
      animate={{
        y: isHovered ? -6 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        boxShadow: isHovered
          ? '0 24px 64px rgba(30,153,83,0.28), 0 0 0 1px rgba(30,153,83,0.35)'
          : '0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.07)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.04) 100%)',
        }}
      />

      {/* Green glow — bottom */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background:
            'radial-gradient(ellipse at bottom center, rgba(30,153,83,0.55) -10%, rgba(0,102,51,0.3) 40%, transparent 70%)',
          filter: 'blur(32px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.35 }}
      />

      {/* Bottom border glow */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(30,153,83,0.9) 50%, transparent 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
        animate={{
          boxShadow: isHovered
            ? '0 0 18px 5px rgba(30,153,83,0.55)'
            : '0 0 10px 2px rgba(30,153,83,0.35)',
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Content */}
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
            gap: '18px',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(30,153,83,0.14)',
              border: '1px solid rgba(30,153,83,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
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
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* Link */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1e9953',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {linkLabel}
            <IconArrowRight size={14} color="#1e9953" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
