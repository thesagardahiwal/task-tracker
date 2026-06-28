import React from 'react';
import { motion } from 'framer-motion';
import { useSettings, useUpdateSettings } from '../features/settings/hooks/useSettings';
import { Skeleton } from '../components/ui/Skeleton';
import { Moon, Sun, Monitor, CheckCircle, List, Layout, ToggleLeft, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const SettingsPage: React.FC = () => {
  const { data, isLoading, isError } = useSettings();
  const updateSettingsMutation = useUpdateSettings();
  const { setTheme } = useTheme();

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load settings. Please ensure the backend is running.
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    updateSettingsMutation.mutate({ [key]: value });

    // Also apply theme immediately
    if (key === 'theme') {
      setTheme(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 mx-auto pb-12 max-w-4xl"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-[var(--color-muted)]">
          Manage your preferences and application behavior.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Appearance Section */}
          <section className="bg-[var(--color-secondary)]/30 border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Palette className="w-5 h-5 text-[var(--color-muted)]" />
                Appearance
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Theme Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleChange('theme', 'light')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      data?.theme === 'light'
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                        : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => handleChange('theme', 'dark')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      data?.theme === 'dark'
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                        : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'
                    }`}
                  >
                    <Moon className="w-6 h-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => handleChange('theme', 'system')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      data?.theme === 'system'
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                        : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'
                    }`}
                  >
                    <Monitor className="w-6 h-6" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <ToggleLeft className="w-4 h-4 text-[var(--color-muted)]" />
                    Enable Animations
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Show fluid transitions across the app.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={data?.enableAnimations}
                    onChange={(e) => handleChange('enableAnimations', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Task Preferences Section */}
          <section className="bg-[var(--color-secondary)]/30 border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--color-border)]">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <List className="w-5 h-5 text-[var(--color-muted)]" />
                Task Preferences
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Default Sort Order</label>
                  <select
                    value={data?.defaultSort}
                    onChange={(e) => handleChange('defaultSort', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                    <option value="createdAt">Newest First</option>
                    <option value="-createdAt">Oldest First</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Default Status Filter</label>
                  <select
                    value={data?.defaultStatusFilter}
                    onChange={(e) => handleChange('defaultStatusFilter', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-[var(--color-border)]/50 pt-6">
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--color-muted)]" />
                    Show Completed Tasks
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Display completed tasks in the default view.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={data?.showCompletedTasks}
                    onChange={(e) => handleChange('showCompletedTasks', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Layout className="w-4 h-4 text-[var(--color-muted)]" />
                    Compact View
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Reduce spacing between task cards.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={data?.compactView}
                    onChange={(e) => handleChange('compactView', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                </label>
              </div>
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
};
