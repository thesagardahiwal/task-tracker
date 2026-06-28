import Task from '../models/Task';
import { TaskStatus } from '../interfaces/task.interface';

export class DashboardService {
  async getSummary(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      upcomingDueTasks,
      recentlyUpdatedTasks,
    ] = await Promise.all([
      Task.countDocuments({ userId }),
      Task.countDocuments({ userId, status: TaskStatus.COMPLETED }),
      Task.countDocuments({ userId, status: TaskStatus.PENDING }),
      Task.countDocuments({ userId, status: TaskStatus.IN_PROGRESS }),
      Task.countDocuments({
        userId,
        status: { $ne: TaskStatus.COMPLETED },
        dueDate: { $lt: today, $ne: null },
      }),
      Task.find({
        userId,
        status: { $ne: TaskStatus.COMPLETED },
        dueDate: { $gte: today },
      })
        .sort({ dueDate: 1 })
        .limit(5),
      Task.find({ userId }).sort({ updatedAt: -1 }).limit(5),
    ]);

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      completionRate,
      upcomingDueTasks,
      recentlyUpdatedTasks,
    };
  }
}

export const dashboardService = new DashboardService();
