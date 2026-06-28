import React from 'react';
import { Outlet } from 'react-router';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <header className="border-b border-[var(--color-border)] p-4 bg-[var(--color-secondary)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">TaskTracker</h1>
          {/* We will add theme toggle or other global header items here later */}
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
