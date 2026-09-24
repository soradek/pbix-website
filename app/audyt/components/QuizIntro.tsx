'use client';

import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: Props) {
  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: '32px',
        border: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #003d20 0%, #1e9953 55%, #006633 100%)',
          padding: 'clamp(32px, 6vw, 56px) clamp(28px, 5vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orb */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '10%',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 500,
              color: 'var(--white)',
              margin: '0 0 12px',
              letterSpacing: 'var(--ls-h2)',
              lineHeight: 'var(--lh-h2)',
            }}
          >
            Audyt dojrzałości raportowej
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-lead)',
              color: 'rgba(255,255,255,0.82)',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            Sprawdź, ile tracisz na ręczne raportowanie — 2 minuty, 10 pytań
          </p>
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p
            style={{
              fontSize: 'var(--fs-ui)',
              color: 'var(--muted)',
              lineHeight: 1.65,
              margin: '0 0 28px',
            }}
          >
            Quiz diagnostyczny dla firm produkcyjnych i logistycznych. Odpowiedz na 10 pytań i dowiedz się,
            na jakim poziomie automatyzacji raportowania jest Twoja firma — i ile możesz zyskać.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '10', label: 'pytań' },
              { value: '~2 min', label: 'czas' },
              { value: '3', label: 'poziomy' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  flex: '1 1 80px',
                  background: 'var(--paper)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--fs-h3)',
                    fontWeight: 500,
                    color: 'var(--accent)',
                    letterSpacing: 'var(--ls-h3)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 'var(--fs-label)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            style={{
              width: '100%',
              background: 'var(--accent)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '980px',
              padding: '16px 32px',
              fontSize: 'var(--fs-body)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.2s, transform 0.15s',
              letterSpacing: '-0.2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-deep)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Rozpocznij audyt →
          </button>
        </motion.div>

        {/* Footer attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #003d20, #1e9953)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--white)',
              fontSize: 'var(--fs-small)',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            RS
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text)' }}>Radosław Sobczak</div>
            <div style={{ fontSize: 'var(--fs-label)', color: 'var(--muted)' }}>PBIX.pl · Certyfikowany Trener Microsoft (MCT)</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
