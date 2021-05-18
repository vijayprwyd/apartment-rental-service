import ApiFeatures from '../common/apiFeatures.mjs';
import AppError from '../errors/appError.mjs';
import User from './userModel.mjs';

export default class UserController {
  async getUsers(req, res) {
    const features = new ApiFeatures(User.find(), req)
      .paginate()
      .sort('createdAt');
    const users = await features.query;
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }

  async getUser(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError('No Apartment found with the ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }

  async createUser(req, res) {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    //Remove password field from response
    newUser.password = undefined;
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  }

  async updateUser(req, res, next) {
    const editUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    if (req.params.id !== req.user.id) {
      editUser.role = req.body.role;
    }

    const user = await User.findByIdAndUpdate(req.params.id, editUser, {
      new: true,
      runWithValidators: true,
    });

    if (!user) {
      return next(new AppError('No user found with the ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }

  async deleteUser(req, res, next) {
    if (req.user._id.toString() === req.params.id)
      return next(new AppError('Cannot delete yourself', 404));
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('No user found with the ID', 404));
    }
    res.status(204).send({
      status: 'success',
      data: null,
    });
  }
}
