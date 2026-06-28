import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { NavbarLogo } from './NavbarLogo';
import { NavbarSearch } from './NavbarSearch';
import { NavbarNavigation } from './NavbarNavigation';
import { NavbarActions } from './NavbarActions';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border-b border-[var(--color-border)]/50 shadow-sm'
            : 'bg-[var(--color-background)] border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left section */}
            <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
              <NavbarLogo />
              <NavbarSearch />
            </div>

            {/* Center section - Desktop Navigation */}
            <div className="flex-1 flex justify-center">
              <NavbarNavigation />
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <NavbarActions />

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 -mr-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors focus:outline-none"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-[var(--color-background)] shadow-2xl border-l border-[var(--color-border)] p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg">Menu</span>
              <button
                className="p-2 -mr-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-secondary)] transition-colors focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="px-4 py-3 rounded-xl bg-[var(--color-secondary)] font-medium text-[var(--color-foreground)]"
              >
                Dashboard
              </a>
              <a
                href="/tasks"
                className="px-4 py-3 rounded-xl text-[var(--color-muted)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              >
                Tasks
              </a>
              <a
                href="/analytics"
                className="px-4 py-3 rounded-xl text-[var(--color-muted)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              >
                Analytics
              </a>
              <a
                href="/settings"
                className="px-4 py-3 rounded-xl text-[var(--color-muted)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
              >
                Settings
              </a>
            </nav>
          </motion.div>
        </div>
      )}
    </>
  );
};
