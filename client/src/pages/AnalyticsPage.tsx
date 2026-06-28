import React from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../features/analytics/hooks/useAnalytics';
import { Skeleton } from '../components/ui/Skeleton';
import { useNavigate } from 'react-router';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { StatsCard } from '../features/tasks/components/StatsCard';

const STATUS_COLORS = {
  COMPLETED: '#10b981', // emerald-500
  PENDING: '#f59e0b', // amber-500
  IN_PROGRESS: '#3b82f6', // blue-500
};

const PRIORITY_COLORS = {
  LOW: '#64748b', // slate-500
  MEDIUM: '#eab308', // yellow-500
  HIGH: '#ef4444', // red-500
};

export const AnalyticsPage: React.FC = () => {
  const { data, isLoading, isError } = useAnalytics();
  const navigate = useNavigate();

  if (isError) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Failed to load analytics. Please ensure the backend is running.
      </div>
    );
  }

  const handleStatusClick = (entry: any) => {
    navigate(`/tasks?status=${entry.name}`);
  };

  const handlePriorityClick = (entry: any) => {
    navigate(`/tasks?priority=${entry.name}`);
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
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-[var(--color-muted)]">Insights and trends across all your projects.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Productivity Score"
          value={isLoading ? <Skeleton className="h-8 w-12" /> : `${data?.productivityScore}%`}
          icon={Target}
          accent="success"
        />
        <StatsCard
          title="Tasks Completed"
          value={isLoading ? <Skeleton className="h-8 w-12" /> : data?.tasksCompletedThisWeek}
          description="Last 7 days"
          icon={Zap}
          accent="info"
        />
        <StatsCard
          title="Tasks Created"
          value={isLoading ? <Skeleton className="h-8 w-12" /> : data?.tasksCreatedThisWeek}
          description="Last 7 days"
          icon={TrendingUp}
          accent="default"
        />
        <StatsCard
          title="Overdue Rate"
          value={isLoading ? <Skeleton className="h-8 w-12" /> : `${data?.overduePercentage}%`}
          icon={AlertTriangle}
          accent="error"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl bg-[var(--color-secondary)]/30 border border-[var(--color-border)]/50 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Task Status Distribution</h3>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.taskStatusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    onClick={handleStatusClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {data?.taskStatusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#ccc'}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                    }}
                    itemStyle={{ color: 'var(--color-foreground)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-[var(--color-secondary)]/30 border border-[var(--color-border)]/50 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Task Priority Distribution</h3>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.priorityDistribution}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-muted)"
                    tick={{ fill: 'var(--color-muted)' }}
                  />
                  <YAxis stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)' }} />
                  <RechartsTooltip
                    cursor={{ fill: 'var(--color-secondary)' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                    onClick={handlePriorityClick}
                    style={{ cursor: 'pointer' }}
                  >
                    {data?.priorityDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS] || '#ccc'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="md:col-span-2 p-6 rounded-2xl bg-[var(--color-secondary)]/30 border border-[var(--color-border)]/50 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Completion Trend (Last 7 Days)</h3>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.completionTrendChart}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="var(--color-muted)"
                    tick={{ fill: 'var(--color-muted)' }}
                  />
                  <YAxis stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)' }} />
                  <RechartsTooltip
                    cursor={{ fill: 'var(--color-secondary)' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--color-accent)"
                    radius={[6, 6, 0, 0]}
                    name="Tasks Completed"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
