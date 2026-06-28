import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard.api';

export const DASHBOARD_KEYS = {
  summary: ['dashboard', 'summary'] as const,
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.summary,
    queryFn: dashboardApi.getSummary,
  });
}
