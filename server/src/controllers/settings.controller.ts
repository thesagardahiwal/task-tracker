import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { settingsService } from '../services/settings.service';

export const getSettings = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data = await settingsService.getSettings();

  res.status(200).json({
    success: true,
    message: 'Settings fetched successfully',
    data,
  });
});

export const updateSettings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await settingsService.updateSettings(req.body);

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data,
    });
  }
);
