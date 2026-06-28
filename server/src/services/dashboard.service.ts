import Task from '../models/Task';
import { TaskStatus } from '../interfaces/task.interface';

export class DashboardService {
  async getSummary() {
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
      Task.countDocuments(),
      Task.countDocuments({ status: TaskStatus.COMPLETED }),
      Task.countDocuments({ status: TaskStatus.PENDING }),
      Task.countDocuments({ status: TaskStatus.IN_PROGRESS }),
      Task.countDocuments({
        status: { $ne: TaskStatus.COMPLETED },
        dueDate: { $lt: today, $ne: null },
      }),
      Task.find({
        status: { $ne: TaskStatus.COMPLETED },
        dueDate: { $gte: today },
      })
        .sort({ dueDate: 1 })
        .limit(5),
      Task.find().sort({ updatedAt: -1 }).limit(5),
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
