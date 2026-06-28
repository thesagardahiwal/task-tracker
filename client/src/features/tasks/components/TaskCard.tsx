import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

// Temporary mock interface (will use real one in Phase 9)
interface TaskMock {
  _id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
}

interface TaskCardProps {
  task: TaskMock;
  onEdit?: (task: TaskMock) => void;
  onDelete?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getStatusConfig = (status: TaskMock['status']) => {
    switch (status) {
      case 'COMPLETED':
        return { variant: 'success' as const, label: 'Completed', icon: CheckCircle2 };
      case 'IN_PROGRESS':
        return { variant: 'info' as const, label: 'In Progress', icon: Clock };
      default:
        return { variant: 'default' as const, label: 'Pending', icon: AlertCircle };
    }
  };

  const getPriorityConfig = (priority: TaskMock['priority']) => {
    switch (priority) {
      case 'HIGH':
        return { variant: 'error' as const, label: 'High' };
      case 'MEDIUM':
        return { variant: 'warning' as const, label: 'Medium' };
      default:
        return { variant: 'default' as const, label: 'Low' };
    }
  };

  const statusConfig = getStatusConfig(task.status);
  const priorityConfig = getPriorityConfig(task.priority);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="group hover:border-[var(--color-muted)] transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-[var(--color-muted)] line-clamp-2 mt-2">
                {task.description}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant={statusConfig.variant} className="flex gap-1 items-center">
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </Badge>
            <Badge variant={priorityConfig.variant}>{priorityConfig.label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex gap-4 text-xs text-[var(--color-muted)]">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t border-[var(--color-border)]">
        <span className="text-xs text-[var(--color-muted)]">
          Created {format(new Date(task.createdAt), 'MMM d')}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm" onClick={() => onEdit?.(task)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete?.(task._id)}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
