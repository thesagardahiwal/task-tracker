import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function useKeyboardShortcuts(onNewTask?: () => void) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search (we will focus the navbar search)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder="Search tasks..."]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // 'N' for new task (only if not typing in an input)
      if (
        e.key.toLowerCase() === 'n' &&
        !e.metaKey &&
        !e.ctrlKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        if (onNewTask) {
          onNewTask();
        } else {
          // If we're on a page without onNewTask handler, maybe redirect to tasks page and open modal?
          // Or just dispatch a global custom event
          window.dispatchEvent(new CustomEvent('open-new-task-modal'));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, onNewTask]);
}
