import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard.api';
import { QUERY_KEYS } from '../../../lib/queryKeys';

export function useDashboardSummary() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.summary,
    queryFn: dashboardApi.getSummary,
  });
}
