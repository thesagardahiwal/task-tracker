import { z, ZodError, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues || (error as any).errors || [];
        const formattedErrors = issues.map((e: any) => ({
          field: e.path ? e.path.join('.') : 'unknown',
          message: e.message,
        }));

        return res.status(400).json({
          success: false,
          status: 'fail',
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }
      return next(error);
    }
  };
