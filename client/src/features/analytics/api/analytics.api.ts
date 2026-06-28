import { api } from '../../../lib/axios';

export interface AnalyticsData {
  taskStatusDistribution: { name: string; value: number }[];
  priorityDistribution: { name: string; value: number }[];
  completionTrend: { created: number; completed: number };
  completionTrendChart: { date: string; count: number }[];
  productivityScore: number;
  overduePercentage: number;
  tasksCreatedThisWeek: number;
  tasksCompletedThisWeek: number;
}

export const analyticsApi = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get('/analytics');
    return response.data.data;
  },
};
