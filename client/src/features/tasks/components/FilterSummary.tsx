import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface FilterSummaryProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterSummary: React.FC<FilterSummaryProps> = ({
  searchParams,
  setSearchParams,
  totalCount,
  filteredCount,
}) => {
  const allParams = Array.from(searchParams.entries());

  if (allParams.length === 0) {
    return null;
  }

  const removeFilter = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearAll = () => {
    setSearchParams(new URLSearchParams());
  };

  const formatKey = (key: string) => {
    if (key === 'search') return 'Search';
    if (key === 'status') return 'Status';
    if (key === 'priority') return 'Priority';
    if (key === 'sort') return 'Sort';
    return key;
  };

  const formatValue = (key: string, value: string) => {
    if (key === 'sort') {
      if (value === 'createdAt') return 'Newest';
      if (value === 'dueDate') return 'Due Date (Asc)';
      if (value === '-dueDate') return 'Due Date (Desc)';
    }
    if (key === 'search') return `"${value}"`;
    return value.charAt(0) + value.slice(1).toLowerCase().replace('_', ' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="bg-[var(--color-secondary)]/50 border border-[var(--color-border)] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--color-background)] rounded-xl shadow-sm border border-[var(--color-border)]/50">
          <SlidersHorizontal className="w-4 h-4 text-[var(--color-muted)]" />
        </div>
        <div>
          <p className="text-sm font-medium">
            Showing {filteredCount} of {totalCount} Tasks
          </p>
          <p className="text-xs text-[var(--color-muted)]">Active filters applied</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 flex-1 justify-start sm:justify-end">
        <AnimatePresence mode="popLayout">
          {allParams.map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <Badge
                variant="default"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[var(--color-background)] hover:bg-[var(--color-border)]/50 border border-[var(--color-border)]/50 transition-colors shadow-sm cursor-pointer"
                onClick={() => removeFilter(key)}
              >
                <span className="text-[var(--color-muted)]">{formatKey(key)}:</span>
                <span className="font-medium">{formatValue(key, value)}</span>
                <X className="w-3 h-3 ml-1 opacity-60 hover:opacity-100" />
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div layout>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-8 px-3 text-xs ml-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            Clear All
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
