import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props },
    ref
  ) => {
    const variants = {
      primary: 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90',
      secondary:
        'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-border)]',
      outline: 'border border-[var(--color-border)] hover:bg-[var(--color-secondary)]',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'hover:bg-[var(--color-secondary)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
