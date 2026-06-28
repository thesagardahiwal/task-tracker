import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { LayoutDashboard, CheckSquare, BarChart2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const NavbarNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-1 bg-[var(--color-secondary)]/30 p-1 rounded-xl border border-[var(--color-border)]/50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={cn(
              'relative px-3 py-1.5 text-sm font-medium transition-colors rounded-lg flex items-center gap-2',
              isActive
                ? 'text-[var(--color-foreground)]'
                : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-secondary)]'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="navbar-active-pill"
                className="absolute inset-0 bg-[var(--color-background)] rounded-lg shadow-sm border border-[var(--color-border)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <item.icon className={cn('w-4 h-4', isActive ? 'text-[var(--color-accent)]' : '')} />
              {item.name}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};
