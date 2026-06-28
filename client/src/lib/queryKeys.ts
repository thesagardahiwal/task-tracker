export const QUERY_KEYS = {
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
  },
  tasks: {
    list: (filters?: string) => ['tasks', 'list', filters] as const,
    detail: (id: string) => ['tasks', 'detail', id] as const,
  },
  analytics: {
    summary: ['analytics', 'summary'] as const,
  },
  settings: {
    preferences: ['settings', 'preferences'] as const,
  },
};
