import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import Footer from '@/components/common/Footer';
import { adminNavigation } from '@/utils/navigation';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onMenuToggle={() => setMobileMenuOpen((value) => !value)} mobileMenuOpen={mobileMenuOpen} links={adminNavigation} />

      <div className="relative mx-auto flex max-w-7xl lg:px-0">
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
        )}

        <Sidebar
          title="Admin Panel"
          items={adminNavigation}
          open={mobileMenuOpen}
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <Footer compact />
    </div>
  );
}