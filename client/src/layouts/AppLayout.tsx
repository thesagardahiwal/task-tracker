import { Outlet } from 'react-router';
import { Navbar } from '../components/navbar/Navbar';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const AppLayout: React.FC = () => {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 mt-4">
        <Outlet />
      </main>
    </div>
  );
};
