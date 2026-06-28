import Task from '../models/Task';
import { TaskStatus } from '../interfaces/task.interface';

export class AnalyticsService {
  async getAnalytics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Distribution by Status
    const statusDistribution = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Distribution by Priority
    const priorityDistribution = await Task.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    // Trend: Completed vs Created in the last 7 days
    const recentTasks = await Task.find({
      createdAt: { $gte: sevenDaysAgo },
    });
    const tasksCreatedThisWeek = recentTasks.length;
    const tasksCompletedThisWeek = recentTasks.filter(
      (t) => t.status === TaskStatus.COMPLETED
    ).length;

    // Total tasks for global percentages
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: TaskStatus.COMPLETED });

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      status: { $ne: TaskStatus.COMPLETED },
      dueDate: { $lt: today, $ne: null },
    });

    const completionTrend = {
      created: tasksCreatedThisWeek,
      completed: tasksCompletedThisWeek,
    };

    const overduePercentage = totalTasks === 0 ? 0 : Math.round((overdueTasks / totalTasks) * 100);
    const productivityScore =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Grouping by date (Last 7 days completion trend)
    const completionTrendChart = await Task.aggregate([
      {
        $match: {
          status: TaskStatus.COMPLETED,
          updatedAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return {
      taskStatusDistribution: statusDistribution.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      priorityDistribution: priorityDistribution.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      completionTrend,
      completionTrendChart: completionTrendChart.map((item) => ({
        date: item._id,
        count: item.count,
      })),
      productivityScore,
      overduePercentage,
      tasksCreatedThisWeek,
      tasksCompletedThisWeek,
    };
  }
}

export const analyticsService = new AnalyticsService();
