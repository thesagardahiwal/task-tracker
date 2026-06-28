import { api } from '../../../lib/axios';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../../types/task';

export const taskApi = {
  getTasks: async (queryString: string = ''): Promise<Task[]> => {
    const response = await api.get(`/tasks?${queryString}`);
    return response.data.data.tasks;
  },
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data.task;
  },
  createTask: async (data: CreateTaskDTO): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data.data.task;
  },
  updateTask: async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.data.task;
  },
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
