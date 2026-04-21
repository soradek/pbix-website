export default function Loading() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '32px', height: '32px', border: '2.5px solid rgba(30,153,83,0.2)',
          borderTopColor: '#1e9953', borderRadius: '50%',
          animation: 'spin 0.7s linear infinite', margin: '0 auto',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </main>
  );
}
