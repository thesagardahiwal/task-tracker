import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics.api';
import { QUERY_KEYS } from '../../../lib/queryKeys';

export function useAnalytics() {
  return useQuery({
    queryKey: QUERY_KEYS.analytics.summary,
    queryFn: analyticsApi.getAnalytics,
  });
}
