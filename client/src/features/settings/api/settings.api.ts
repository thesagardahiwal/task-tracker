import { api } from '../../../lib/axios';

export interface SettingsData {
  theme: 'light' | 'dark' | 'system';
  defaultSort: string;
  defaultStatusFilter: string;
  defaultPriorityFilter: string;
  showCompletedTasks: boolean;
  compactView: boolean;
  enableAnimations: boolean;
}

export const settingsApi = {
  getSettings: async (): Promise<SettingsData> => {
    const response = await api.get('/settings');
    return response.data.data;
  },

  updateSettings: async (data: Partial<SettingsData>): Promise<SettingsData> => {
    const response = await api.put('/settings', data);
    return response.data.data;
  },
};
