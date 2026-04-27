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
    <section style={{ padding: '120px 24px', background: '#ffffff' }}>
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
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#1d1d1f', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
                {title}
              </h2>
              <p style={{ color: '#6e6e73', fontSize: '15px', lineHeight: 1.65, margin: 0 }}>
                {description}
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                background: '#1e9953',
                color: 'white',
                border: 'none',
                padding: '14px 26px',
                borderRadius: '980px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#17803f')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1e9953')}
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
