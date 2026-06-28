import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { StatsCard } from '../features/tasks/components/StatsCard';
import { TaskCard } from '../features/tasks/components/TaskCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';
import { useTasks, useDeleteTask } from '../features/tasks/hooks/useTasks';
import { TaskModal } from '../features/tasks/components/TaskModal';
import { TaskFilters } from '../features/tasks/components/TaskFilters';
import { Task } from '../types/task';
import { useSearchParams } from 'react-router';

export const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data: tasks = [], isLoading, isError } = useTasks(searchParams.toString());
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
    // Slight delay to allow modal out animation before clearing data
    setTimeout(() => setSelectedTask(null), 200);
  };

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load tasks. Please ensure the backend is running.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-[var(--color-muted)]">Here's an overview of your tasks.</p>
        </div>
        <Button onClick={handleCreateTask}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={isLoading ? <Skeleton className="h-8 w-12" /> : tasks.length.toString()}
          icon={LayoutDashboard}
        />
        <StatsCard
          title="In Progress"
          value={
            isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              tasks.filter((t) => t.status === 'IN_PROGRESS').length.toString()
            )
          }
          icon={Clock}
        />
        <StatsCard
          title="Completed"
          value={
            isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              tasks.filter((t) => t.status === 'COMPLETED').length.toString()
            )
          }
          icon={CheckCircle}
        />
        <StatsCard
          title="Pending"
          value={
            isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              tasks.filter((t) => t.status === 'PENDING').length.toString()
            )
          }
          icon={AlertCircle}
        />
      </div>

      <TaskFilters />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tasks</h3>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        ) : tasks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task as any}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task._id)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[var(--color-border)] rounded-xl py-12">
            <EmptyState
              icon={CheckCircle}
              title="No tasks found"
              description="You're all caught up! Create a new task to get started."
              action={
                <Button onClick={handleCreateTask}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              }
            />
          </div>
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={selectedTask} />
    </motion.div>
  );
};
