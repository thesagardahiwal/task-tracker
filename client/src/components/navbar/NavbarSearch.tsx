import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const NavbarSearch: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group hidden md:flex items-center">
      <motion.div
        animate={{
          width: isFocused ? 280 : 200,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`flex items-center h-9 px-3 rounded-xl transition-colors border ${
          isFocused
            ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/20 bg-[var(--color-background)]'
            : 'border-[var(--color-border)]/60 bg-[var(--color-secondary)]/50 hover:bg-[var(--color-secondary)]'
        }`}
      >
        <Search
          className={`h-4 w-4 mr-2 flex-shrink-0 transition-colors ${isFocused ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`}
        />
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 w-full bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!isFocused && (
          <div className="flex items-center justify-center h-5 px-1.5 ml-2 rounded-[6px] border border-[var(--color-border)] bg-[var(--color-background)] text-[10px] font-medium text-[var(--color-muted)] shadow-sm">
            ⌘K
          </div>
        )}
      </motion.div>
    </div>
  );
};
