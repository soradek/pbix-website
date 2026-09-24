'use client';

import React from 'react';
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
  return (
    <Link href={href} className="gradient-card spec-card">
      <div className="spec-card-icon">{icon}</div>
      <h3 className="spec-card-title">{title}</h3>
      <p className="spec-card-desc">{description}</p>
      <span className="spec-card-link">
        {linkLabel}
        <IconArrowRight size={14} color="currentColor" />
      </span>
    </Link>
  );
}
