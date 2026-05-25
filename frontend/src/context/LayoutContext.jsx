import { createContext, useContext, useMemo, useState } from 'react';

const LayoutContext = createContext(null);

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      setSidebarOpen,
      toggleSidebar: () => setSidebarOpen((current) => !current),
      closeSidebar: () => setSidebarOpen(false),
    }),
    [isSidebarOpen]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used inside LayoutProvider');
  }

  return context;
}