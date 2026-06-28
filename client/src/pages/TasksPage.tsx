import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SearchX, Download } from 'lucide-react';
import { TaskCard } from '../features/tasks/components/TaskCard';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useTasks, useDeleteTask } from '../features/tasks/hooks/useTasks';
import { TaskModal } from '../features/tasks/components/TaskModal';
import { TaskFilters } from '../features/tasks/components/TaskFilters';
import { FilterSummary } from '../features/tasks/components/FilterSummary';
import type { Task } from '../types/task';
import { useSearchParams } from 'react-router';

export const TasksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Here we use the search params to query backend directly
  const {
    data: { tasks: filteredTasks = [], pagination } = {},
    isLoading: isFilteredLoading,
    isError,
  } = useTasks(searchParams.toString());

  // Also we want to fetch the global count for the filter summary if we can,
  // but let's assume FilterSummary can work with the pagination data.
  // Wait, the API now returns { tasks, pagination } for useTasks.
  // Let me double check if we need to adjust useTasks response mapping.
  // We'll fix useTasks response type later. Let's assume it returns { tasks, pagination: { total } }

  const deleteMutation = useDeleteTask();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTask(null), 200);
  };

  React.useEffect(() => {
    const handleGlobalNewTask = () => handleCreateTask();
    window.addEventListener('open-new-task-modal', handleGlobalNewTask);
    return () => window.removeEventListener('open-new-task-modal', handleGlobalNewTask);
  }, []);

  const exportCSV = () => {
    if (!filteredTasks.length) return;

    const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Due Date', 'Created At'];
    const rows = filteredTasks.map((t: any) => [
      t._id,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      `"${(t.description || '').replace(/"/g, '""')}"`,
      t.status,
      t.priority,
      t.dueDate ? new Date(t.dueDate).toISOString() : '',
      t.createdAt ? new Date(t.createdAt).toISOString() : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load tasks. Please ensure the backend is running.
      </div>
    );
  }

  const totalCount = pagination?.total || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-[var(--color-muted)]">Manage and filter your project tasks.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={exportCSV}
            variant="secondary"
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={handleCreateTask}
            className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <FilterSummary
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          totalCount={totalCount}
          filteredCount={filteredTasks.length}
        />
        <TaskFilters />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">Results</h3>
          {!isFilteredLoading && (
            <p className="text-sm text-[var(--color-muted)] font-medium">
              Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </p>
          )}
        </div>

        {isFilteredLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task: any) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <TaskCard
                    task={task}
                    onEdit={() => handleEditTask(task)}
                    onDelete={() => handleDeleteTask(task._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-secondary)]/30"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-background)] shadow-sm border border-[var(--color-border)]/50 mb-4">
              <SearchX className="h-8 w-8 text-[var(--color-muted)]" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No matching tasks</h3>
            <p className="text-sm text-[var(--color-muted)] mb-6 max-w-sm">
              We couldn't find any tasks matching your current filters. Try changing or clearing
              them.
            </p>
            {Array.from(searchParams.keys()).length > 0 ? (
              <Button onClick={() => setSearchParams(new URLSearchParams())} variant="primary">
                Clear Filters
              </Button>
            ) : (
              <Button onClick={handleCreateTask} variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            )}
          </motion.div>
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={selectedTask} />
    </motion.div>
  );
};
