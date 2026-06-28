import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  static generateToken(id: string, type: 'access' | 'refresh') {
    const secret = type === 'access' ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET;
    const expiresIn =
      type === 'access' ? process.env.JWT_EXPIRES_IN : process.env.JWT_REFRESH_EXPIRES_IN;

    return jwt.sign({ id }, secret as string, {
      expiresIn: expiresIn as any,
    });
  }

  static async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const accessToken = this.generateToken(user.id, 'access');
    const refreshToken = this.generateToken(user.id, 'refresh');

    return { user, accessToken, refreshToken };
  }

  static async login(data: any) {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password!);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateToken(user.id, 'access');
    const refreshToken = this.generateToken(user.id, 'refresh');

    return { user, accessToken, refreshToken };
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('No refresh token provided');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as {
        id: string;
      };
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new Error('User not found');
      }

      const accessToken = this.generateToken(user.id, 'access');
      const newRefreshToken = this.generateToken(user.id, 'refresh');

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
