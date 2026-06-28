import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { taskApi } from '../api/task.api';
import type { CreateTaskDTO, UpdateTaskDTO, Task } from '../../../types/task';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../../../lib/queryKeys';

export function useTasks(queryString: string = '') {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.list(queryString),
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analytics.summary });
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
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.tasks.detail(id) });

      // Snapshot the previous value
      const previousTask = queryClient.getQueryData<Task>(QUERY_KEYS.tasks.detail(id));

      // Optimistically update to the new value
      if (previousTask) {
        queryClient.setQueryData<Task>(QUERY_KEYS.tasks.detail(id), {
          ...previousTask,
          ...data,
        });
      }

      return { previousTask };
    },
    onSuccess: () => {
      toast.success('Task updated successfully');
      // Invalidate to refetch and ensure server state matches
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analytics.summary });
    },
    onError: (error: any, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTask) {
        queryClient.setQueryData(QUERY_KEYS.tasks.detail(variables.id), context.previousTask);
      }
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks.detail(variables.id) });
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analytics.summary });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    },
  });
}
