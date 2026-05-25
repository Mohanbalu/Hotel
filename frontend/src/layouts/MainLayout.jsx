import Footer from '@/components/common/Footer';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';
import { mainNavigation } from '@/utils/navigation';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell min-h-screen text-slate-100">
      <Navbar onMenuToggle={() => setMobileMenuOpen((value) => !value)} mobileMenuOpen={mobileMenuOpen} links={mainNavigation} />

      <div className="relative mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
            <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
              <Sidebar
                title="Main Menu"
                items={mainNavigation}
                open={mobileMenuOpen}
                collapsed={false}
                onClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </>
        )}

        <main className="flex-1 py-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}