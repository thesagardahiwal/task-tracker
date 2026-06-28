import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  accent = 'default',
}) => {
  const accentColors = {
    default: 'bg-[var(--color-secondary)] text-[var(--color-foreground)]',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <Card className="overflow-hidden relative h-full group border-[var(--color-border)]/60">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <p className="text-sm font-medium text-[var(--color-muted)] flex items-center gap-2">
              <span
                className={cn(
                  'p-2 rounded-xl flex items-center justify-center transition-colors',
                  accentColors[accent]
                )}
              >
                <Icon className="w-4 h-4" />
              </span>
              {title}
            </p>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
          </div>
        </div>
        {description && (
          <div className="mt-4 flex items-center text-sm">
            <span
              className={cn(
                'font-medium',
                trend === 'up' && 'text-green-500',
                trend === 'down' && 'text-red-500',
                trend === 'neutral' && 'text-[var(--color-muted)]'
              )}
            >
              {description}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
