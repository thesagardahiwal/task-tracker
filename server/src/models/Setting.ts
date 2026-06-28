import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  defaultSort: string;
  defaultStatusFilter: string;
  defaultPriorityFilter: string;
  showCompletedTasks: boolean;
  compactView: boolean;
  enableAnimations: boolean;
}

const SettingSchema: Schema = new Schema(
  {
    // Since we don't have auth, we use a single document or a fixed user string
    userId: {
      type: String,
      default: 'default_user',
      unique: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    defaultSort: {
      type: String,
      default: 'createdAt',
    },
    defaultStatusFilter: {
      type: String,
      default: 'ALL',
    },
    defaultPriorityFilter: {
      type: String,
      default: 'ALL',
    },
    showCompletedTasks: {
      type: Boolean,
      default: true,
    },
    compactView: {
      type: Boolean,
      default: false,
    },
    enableAnimations: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISetting>('Setting', SettingSchema);
