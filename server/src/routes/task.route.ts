import { Router } from 'express';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';
import * as taskController from '../controllers/task.controller';

const router = Router();

router
  .route('/')
  .get(taskController.getTasks)
  .post(validate(createTaskSchema), taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .put(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;
