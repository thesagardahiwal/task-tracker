import Setting, { ISetting } from '../models/Setting';

export class SettingsService {
  async getSettings(userId: string): Promise<ISetting> {
    let settings = await Setting.findOne({ userId });

    if (!settings) {
      settings = await Setting.create({ userId });
    }

    return settings;
  }

  async updateSettings(userId: string, data: Partial<ISetting>): Promise<ISetting> {
    const settings = await Setting.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    );

    return settings;
  }
}

export const settingsService = new SettingsService();
