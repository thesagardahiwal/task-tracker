import React from 'react';
import { Link } from 'react-router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded hover:opacity-90 transition-opacity"
      >
        Go back home
      </Link>
    </div>
  );
};
