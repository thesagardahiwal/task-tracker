import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { StatsCard } from '../features/tasks/components/StatsCard';
import { TaskCard } from '../features/tasks/components/TaskCard';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useDashboardSummary } from '../features/dashboard/hooks/useDashboard';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage: React.FC = () => {
  const { data: summary, isLoading, isError } = useDashboardSummary();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load dashboard. Please ensure the backend is running.
      </div>
    );
  }

  const handleStatClick = (filter: string) => {
    navigate(`/tasks?${filter}`);
  };

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
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-[var(--color-muted)]">Welcome back, {user?.firstName} 👋</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div onClick={() => handleStatClick('')} className="cursor-pointer group relative">
          <StatsCard
            title="Total Tasks"
            value={isLoading ? <Skeleton className="h-8 w-12" /> : summary?.totalTasks}
            icon={LayoutDashboard}
            accent="default"
          />
          <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[var(--color-accent)] rounded-2xl transition-all" />
        </div>
        <div
          onClick={() => handleStatClick('status=COMPLETED')}
          className="cursor-pointer group relative"
        >
          <StatsCard
            title="Completed"
            value={isLoading ? <Skeleton className="h-8 w-12" /> : summary?.completedTasks}
            icon={CheckCircle}
            description={isLoading ? '' : `${summary?.completionRate}% completion rate`}
            trend="up"
            accent="success"
          />
          <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-emerald-500 rounded-2xl transition-all" />
        </div>
        <div
          onClick={() => handleStatClick('status=IN_PROGRESS')}
          className="cursor-pointer group relative"
        >
          <StatsCard
            title="In Progress"
            value={isLoading ? <Skeleton className="h-8 w-12" /> : summary?.inProgressTasks}
            icon={Clock}
            accent="info"
          />
          <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-500 rounded-2xl transition-all" />
        </div>
        <div
          onClick={() => handleStatClick('status=PENDING')}
          className="cursor-pointer group relative"
        >
          <StatsCard
            title="Pending"
            value={isLoading ? <Skeleton className="h-8 w-12" /> : summary?.pendingTasks}
            icon={AlertCircle}
            accent="warning"
          />
          <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-yellow-500 rounded-2xl transition-all" />
        </div>
        <div
          onClick={() => handleStatClick('status=PENDING&sort=dueDate')}
          className="cursor-pointer group relative"
        >
          <StatsCard
            title="Overdue"
            value={isLoading ? <Skeleton className="h-8 w-12" /> : summary?.overdueTasks}
            icon={AlertTriangle}
            trend={(summary?.overdueTasks ?? 0) > 0 ? 'down' : 'neutral'}
            accent="error"
          />
          <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-red-500 rounded-2xl transition-all" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold tracking-tight">Upcoming Deadlines</h3>
            <Button
              variant="ghost"
              onClick={() => handleStatClick('sort=dueDate')}
              className="text-sm"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-2xl" />
          ) : summary?.upcomingDueTasks?.length ? (
            <div className="flex flex-col gap-3">
              {summary.upcomingDueTasks.map((task: any) => (
                <div
                  onClick={() => handleStatClick(`search=${encodeURIComponent(task.title)}`)}
                  key={task._id}
                  className="cursor-pointer"
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-secondary)]/30">
              <p className="text-[var(--color-muted)]">No upcoming deadlines.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold tracking-tight">Recently Updated</h3>
            <Button
              variant="ghost"
              onClick={() => handleStatClick('sort=createdAt')}
              className="text-sm"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-2xl" />
          ) : summary?.recentlyUpdatedTasks?.length ? (
            <div className="flex flex-col gap-3">
              {summary.recentlyUpdatedTasks.map((task: any) => (
                <div
                  onClick={() => handleStatClick(`search=${encodeURIComponent(task.title)}`)}
                  key={task._id}
                  className="cursor-pointer"
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-secondary)]/30">
              <p className="text-[var(--color-muted)]">No recent tasks.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
