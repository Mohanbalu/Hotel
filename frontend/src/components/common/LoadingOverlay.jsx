import React from 'react';

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400" />
    </div>
  );
}

export function ButtonLoader({ size = 16 }) {
  return <div className="inline-block animate-spin rounded-full border-t-2 border-white/80" style={{ width: size, height: size }} />;
}

export default FullPageLoader;
