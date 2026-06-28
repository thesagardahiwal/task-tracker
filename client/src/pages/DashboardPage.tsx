import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { StatsCard } from '../features/tasks/components/StatsCard';
import { TaskCard } from '../features/tasks/components/TaskCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Skeleton } from '../components/ui/Skeleton';

// Temporary mock data until Phase 9
const mockTasks: any[] = [
  {
    _id: '1',
    title: 'Design API Architecture',
    description: 'Create the initial REST API endpoints structure and Swagger documentation.',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2023-11-20T00:00:00.000Z',
    createdAt: '2023-11-10T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Implement Authentication',
    description: 'Setup JWT based authentication with refresh tokens.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Frontend Dashboard Layout',
    description: 'Build the responsive grid layout using Tailwind CSS.',
    status: 'PENDING',
    priority: 'MEDIUM',
    createdAt: new Date().toISOString(),
  },
];

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const tasks = mockTasks; // Will be replaced by useQuery

  const handleCreateTask = () => {
    console.log('Create task clicked');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Tasks</h3>
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
                task={task}
                onEdit={(t) => console.log('Edit', t)}
                onDelete={(id) => console.log('Delete', id)}
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
    </div>
  );
};
