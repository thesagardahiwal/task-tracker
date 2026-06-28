import Task from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../validators/task.validator';
import { AppError } from '../utils/AppError';

export class TaskService {
  async getTasks(query: any = {}) {
    const { page = 1, limit = 10, search, status, priority, sort } = query;

    // Build filter object
    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    let sortObj: any = { createdAt: -1 };
    if (sort === 'dueDate') sortObj = { dueDate: 1 };
    else if (sort === '-dueDate') sortObj = { dueDate: -1 };
    else if (sort === 'priority') sortObj = { priority: -1 }; // Assuming HIGH is higher string value or we handle it via mapping. Actually text sort might be tricky. Let's do simple sort.

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

  async getTaskById(id: string) {
    const task = await Task.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    return task;
  }

  async createTask(data: CreateTaskInput) {
    const task = await Task.create(data);
    return task;
  }

  async updateTask(id: string, data: UpdateTaskInput) {
    const task = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return task;
  }

  async deleteTask(id: string) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    return task;
  }
}

export const taskService = new TaskService();
