import { api } from '../../../lib/axios';

export interface DashboardSummary {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completionRate: number;
  upcomingDueTasks: any[];
  recentlyUpdatedTasks: any[];
}

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await api.get('/dashboard/summary');
    return response.data.data;
  },
};
