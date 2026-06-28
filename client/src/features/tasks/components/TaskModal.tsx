import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../../types/task';
import { useCreateTask, useUpdateTask } from '../hooks/useTasks';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const isEditing = !!task;
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const [formData, setFormData] = useState<CreateTaskDTO>({
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'PENDING',
        priority: 'MEDIUM',
        dueDate: '',
      });
    }
  }, [task, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty strings
    const payload = { ...formData };
    if (!payload.dueDate) delete payload.dueDate;
    if (!payload.description) delete payload.description;

    if (isEditing && task) {
      updateMutation.mutate(
        { id: task._id, data: payload as UpdateTaskDTO },
        { onSuccess: onClose }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-[var(--color-secondary)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Title *</label>
                <Input
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Task description..."
                  className="flex min-h-[80px] w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm ring-offset-[var(--color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                      { label: 'Pending', value: 'PENDING' },
                      { label: 'In Progress', value: 'IN_PROGRESS' },
                      { label: 'Completed', value: 'COMPLETED' },
                    ]}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Priority</label>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={[
                      { label: 'Low', value: 'LOW' },
                      { label: 'Medium', value: 'MEDIUM' },
                      { label: 'High', value: 'HIGH' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  {isEditing ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
