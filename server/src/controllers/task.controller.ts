import { Request, Response } from 'express';
import { taskService } from '../services/task.service';
import { asyncHandler } from '../utils/asyncHandler';

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const result = await taskService.getTasks(req.query);

  res.status(200).json({
    success: true,
    message: 'Tasks retrieved successfully',
    data: result,
  });
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.id as string);

  res.status(200).json({
    success: true,
    message: 'Task retrieved successfully',
    data: { task },
  });
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: { task },
  });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.updateTask(req.params.id as string, req.body);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: { task },
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id as string);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: null,
  });
});
