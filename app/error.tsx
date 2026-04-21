'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#6e6e73', marginBottom: '16px' }}>Błąd</div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', margin: '0 0 16px' }}>
          Coś poszło nie tak
        </h1>
        <p style={{ color: '#6e6e73', fontSize: '16px', margin: '0 0 32px' }}>
          Spróbuj odświeżyć stronę lub wróć za chwilę.
        </p>
        <button
          onClick={reset}
          style={{
            background: '#1e9953', color: '#fff', border: 'none',
            padding: '12px 28px', borderRadius: '980px', fontSize: '15px',
            fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Spróbuj ponownie
        </button>
      </div>
    </main>
  );
}
