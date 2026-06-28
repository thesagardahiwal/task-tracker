import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi, type SettingsData } from '../api/settings.api';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../../../lib/queryKeys';

export function useSettings() {
  return useQuery({
    queryKey: QUERY_KEYS.settings.preferences,
    queryFn: settingsApi.getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<SettingsData>) => settingsApi.updateSettings(data),
    onSuccess: (newData) => {
      queryClient.setQueryData(QUERY_KEYS.settings.preferences, newData);
      toast.success('Settings saved successfully');
    },
    onError: () => {
      toast.error('Failed to save settings');
    },
  });
}
