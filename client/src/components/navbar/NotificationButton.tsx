import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotificationButton: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      aria-label="Notifications"
    >
      <Bell className="w-4 h-4" />
      <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] border border-[var(--color-background)]"></span>
    </motion.button>
  );
};
