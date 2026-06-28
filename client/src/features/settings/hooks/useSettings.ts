import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi, type SettingsData } from '../api/settings.api';
import { toast } from 'sonner';

export const SETTINGS_KEYS = {
  all: ['settings'] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: SETTINGS_KEYS.all,
    queryFn: settingsApi.getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<SettingsData>) => settingsApi.updateSettings(data),
    onSuccess: (newData) => {
      queryClient.setQueryData(SETTINGS_KEYS.all, newData);
      toast.success('Settings saved successfully');
    },
    onError: () => {
      toast.error('Failed to save settings');
    },
  });
}
