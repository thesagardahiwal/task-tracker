import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-secondary)] mb-4">
        <Icon className="h-8 w-8 text-[var(--color-muted)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-[var(--color-muted)] max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
