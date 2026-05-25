import React from 'react';

export default function ErrorAlert({ children }) {
  return (
    <div className="rounded-md bg-rose-900/40 border border-rose-700/30 p-3 text-rose-100">
      {children}
    </div>
  );
}
