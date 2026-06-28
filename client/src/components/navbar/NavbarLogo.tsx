import React from 'react';
import { Layers } from 'lucide-react';
import { Link } from 'react-router';

export const NavbarLogo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg transition-opacity hover:opacity-90"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-foreground)] text-[var(--color-background)] shadow-sm group-hover:scale-105 transition-transform duration-300">
        <Layers className="h-4 w-4" />
      </div>
      <span className="font-bold text-lg tracking-tight">TaskFlow</span>
    </Link>
  );
};
