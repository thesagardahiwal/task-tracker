import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { analyticsService } from '../services/analytics.service';

export const getAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await analyticsService.getAnalytics();

    res.status(200).json({
      success: true,
      message: 'Analytics fetched successfully',
      data,
    });
  }
);
