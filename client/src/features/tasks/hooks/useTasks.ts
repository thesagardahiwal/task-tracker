import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { taskApi } from '../api/task.api';
import type { CreateTaskDTO, UpdateTaskDTO } from '../../../types/task';
import { toast } from 'sonner';

export const TASK_KEYS = {
  all: (queryString: string = '') => ['tasks', queryString] as const,
  detail: (id: string) => ['tasks', id] as const,
};

export function useTasks(queryString: string = '') {
  return useQuery({
    queryKey: TASK_KEYS.all(queryString),
    queryFn: () => taskApi.getTasks(queryString),
    placeholderData: keepPreviousData,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDTO) => taskApi.createTask(data),
    onSuccess: () => {
      toast.success('Task created successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDTO }) => taskApi.updateTask(id, data),
    onSuccess: () => {
      toast.success('Task updated successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.deleteTask(id),
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });
}
