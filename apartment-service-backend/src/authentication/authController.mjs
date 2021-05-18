import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../errors/appError.mjs';
import User from '../users/userModel.mjs';

export default class AuthController {
  constructor() {
    this.login = this.login.bind(this);
  }

  signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async signup(req, res, next) {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    //Remove password field from response
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));
    // 2. Check if user exists and password is correct
    const user = await User.findOne({
      email,
    }).select('+password');
    if (!user || !(await user.verifyPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));
    // 3. Send token to client
    const token = this.signToken(user._id);
    res.status(200).json({
      success: 'success',
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  }

  async authenticate(req, res, next) {
    let token;
    // 1. Get token and check if it exist
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Verify token
    if (!token) return next(new AppError('Please login to get access', 401));
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3. Check if user exists
    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError('The user belonging to the token no longer exist', 401)
      );
    // 4. Check if user changed password after jwt was issued
    if (user.hasChangedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('Password changed recently. Please login again', 401)
      );
    }
    // 5. Grant access to protected route
    req.user = user;
    next();
  }

  restrictTo(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  }
}
