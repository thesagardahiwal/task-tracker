import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await AuthService.register(req.body);
    setCookies(res, accessToken, refreshToken);

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);
    setCookies(res, accessToken, refreshToken);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid credentials',
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('accessToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.cookie('refreshToken', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {},
  });
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    const tokens = await AuthService.refresh(refreshToken);
    setCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Could not refresh token',
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  // req.user is set by the authenticate middleware
  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: req.user,
  });
};
