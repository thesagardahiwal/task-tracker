import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { dashboardService } from '../services/dashboard.service';

export const getDashboardSummary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await dashboardService.getSummary();

    res.status(200).json({
      success: true,
      message: 'Dashboard summary fetched successfully',
      data,
    });
  }
);
