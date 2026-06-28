import Setting, { ISetting } from '../models/Setting';

export class SettingsService {
  async getSettings(): Promise<ISetting> {
    let settings = await Setting.findOne({ userId: 'default_user' });

    if (!settings) {
      settings = await Setting.create({ userId: 'default_user' });
    }

    return settings;
  }

  async updateSettings(data: Partial<ISetting>): Promise<ISetting> {
    const settings = await Setting.findOneAndUpdate(
      { userId: 'default_user' },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    );

    return settings;
  }
}

export const settingsService = new SettingsService();
