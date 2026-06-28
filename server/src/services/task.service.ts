import Task from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../validators/task.validator';
import { AppError } from '../utils/AppError';

export class TaskService {
  async getTasks(userId: string, query: any = {}) {
    const { page = 1, limit = 10, search, status, priority, sort } = query;

    // Build filter object
    const filter: any = { userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    let sortObj: any = { createdAt: -1 };
    if (sort === 'dueDate') sortObj = { dueDate: 1 };
    else if (sort === '-dueDate') sortObj = { dueDate: -1 };
    else if (sort === 'priority') sortObj = { priority: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(filter).sort(sortObj).skip(skip).limit(Number(limit));
    const total = await Task.countDocuments(filter);

    return {
      tasks,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    };
  }

  async getTaskById(id: string, userId: string) {
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    return task;
  }

  async createTask(userId: string, data: CreateTaskInput) {
    const task = await Task.create({ ...data, userId });
    return task;
  }

  async updateTask(id: string, userId: string, data: UpdateTaskInput) {
    const task = await Task.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }

  async deleteTask(id: string, userId: string) {
    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    return task;
  }
}

export const taskService = new TaskService();
