import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics.api';

export const ANALYTICS_KEYS = {
  summary: ['analytics', 'summary'] as const,
};

export function useAnalytics() {
  return useQuery({
    queryKey: ANALYTICS_KEYS.summary,
    queryFn: analyticsApi.getAnalytics,
  });
}
