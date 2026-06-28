import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export const TaskFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for search to debounce input
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchValue) {
        newParams.set('search', searchValue);
      } else {
        newParams.delete('search');
      }
      // Only update if changed to avoid loop
      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, searchParams, setSearchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'ALL') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchValue('');
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = Array.from(searchParams.keys()).length;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-secondary)]">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)]" />
        <Input
          className="pl-9"
          placeholder="Search tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          className="w-full sm:w-36"
          value={searchParams.get('status') || 'ALL'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={[
            { label: 'All Status', value: 'ALL' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'In Progress', value: 'IN_PROGRESS' },
            { label: 'Completed', value: 'COMPLETED' },
          ]}
        />
        <Select
          className="w-full sm:w-36"
          value={searchParams.get('priority') || 'ALL'}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          options={[
            { label: 'All Priorities', value: 'ALL' },
            { label: 'High', value: 'HIGH' },
            { label: 'Medium', value: 'MEDIUM' },
            { label: 'Low', value: 'LOW' },
          ]}
        />
        <Select
          className="w-full sm:w-36"
          value={searchParams.get('sort') || 'createdAt'}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          options={[
            { label: 'Newest First', value: 'createdAt' },
            { label: 'Due Date Asc', value: 'dueDate' },
            { label: 'Due Date Desc', value: '-dueDate' },
          ]}
        />
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="px-2">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
