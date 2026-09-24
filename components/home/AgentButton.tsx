'use client';

import Link from 'next/link';
import { ThinkingOrb } from 'thinking-orbs';
import s from './home.module.css';

export default function AgentButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={s.agentBtn}>
      <ThinkingOrb state="working" size={20} theme="dark" aria-hidden="true" />
      <span className={s.agentText}>{label}</span>
    </Link>
  );
}
