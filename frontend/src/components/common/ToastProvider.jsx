import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider({ children }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options
          duration: 4000,
          style: {
            background: '#0f1724',
            color: '#e6f6ff',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '12px 16px',
            borderRadius: '12px',
          },
        }}
      />
      {children}
    </>
  );
}
