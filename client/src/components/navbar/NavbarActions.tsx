import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NotificationButton } from './NotificationButton';
import { UserMenu } from './UserMenu';

export const NavbarActions: React.FC = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <ThemeToggle />
      <NotificationButton />
      <div className="h-5 w-px bg-[var(--color-border)] mx-1" />
      <UserMenu />
    </div>
  );
};
