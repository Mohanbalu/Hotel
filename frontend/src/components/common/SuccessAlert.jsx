import React from 'react';

export default function SuccessAlert({ children }) {
  return (
    <div className="rounded-md bg-emerald-900/20 border border-emerald-700/30 p-3 text-emerald-200">
      {children}
    </div>
  );
}
