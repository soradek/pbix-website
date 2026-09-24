'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h1 style={{ fontSize: 'var(--fs-num)', fontWeight: 500, color: 'var(--text)', letterSpacing: 'var(--ls-h2)', margin: '0 0 16px' }}>
          Coś poszło nie tak
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--fs-body)', margin: '0 0 32px' }}>
          Spróbuj odświeżyć stronę lub wróć za chwilę.
        </p>
        <button
          onClick={reset}
          style={{
            background: 'var(--accent)', color: 'var(--white)', border: 'none',
            padding: '12px 28px', borderRadius: '980px', fontSize: 'var(--fs-ui)',
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Spróbuj ponownie
        </button>
      </div>
    </main>
  );
}
