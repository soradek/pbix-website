'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { IconFileText, IconDownload } from '@/components/Icons';

interface Props {
  title: string;
  description: string;
  fileName: string;
  source: string;
  buttonLabel?: string;
  modalTitle?: string;
  modalDescription?: string;
}

export default function LeadMagnetSection({
  title,
  description,
  fileName,
  source,
  buttonLabel = 'Pobierz materiał',
  modalTitle,
  modalDescription,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section style={{ padding: '120px 24px', background: 'var(--white)' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <ScrollReveal>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30,153,83,0.06) 0%, rgba(30,153,83,0.02) 100%)',
              border: '1px solid rgba(30,153,83,0.18)',
              borderRadius: '28px',
              padding: '56px 48px',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '32px',
              alignItems: 'center',
            }}
            className="lead-magnet-grid"
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                background: 'rgba(30,153,83,0.12)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconFileText size={32} color="#1e9953" />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 500, color: 'var(--text)', margin: '0 0 10px', letterSpacing: 'var(--ls-h3)' }}>
                {title}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-ui)', lineHeight: 1.65, margin: 0 }}>
                {description}
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                padding: '14px 26px',
                borderRadius: '980px',
                fontSize: 'var(--fs-small)',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-deep)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              <IconDownload size={16} color="#ffffff" />
              {buttonLabel}
            </button>
          </div>
        </ScrollReveal>
      </div>

      <LeadCaptureModal
        open={open}
        onClose={() => setOpen(false)}
        fileName={fileName}
        source={source}
        title={modalTitle ?? title}
        description={modalDescription ?? 'Wypełnij formularz, a wyślę Ci materiał na podany adres email.'}
      />
    </section>
  );
}
