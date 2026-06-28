import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, GitBranch, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    {
      icon: GitBranch,
      label: 'GitHub Repository',
      path: 'https://github.com/thesagardahiwal/task-tracker',
      external: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-1.5 rounded-full hover:bg-[var(--color-secondary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="User menu"
      >
        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-blue-400 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          SD
        </div>
        <ChevronDown
          className={`w-3 h-3 text-[var(--color-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-[var(--color-border)] shadow-lg overflow-hidden z-50 origin-top-right"
          >
            <div className="px-4 py-3 border-b border-[var(--color-border)]/50">
              <p className="text-sm font-medium text-[var(--color-foreground)]">Sagar Dahiwal</p>
              <p className="text-xs text-[var(--color-muted)] truncate">sagar@example.com</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 text-sm text-[var(--color-foreground)] hover:bg-[var(--color-secondary)] rounded-lg transition-colors group"
                >
                  <item.icon className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="p-1.5 border-t border-[var(--color-border)]/50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
