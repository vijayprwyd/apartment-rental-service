import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter valid first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter valid last name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  role: {
    type: String,
    required: [true, 'Please enter role associated with user'],
    enum: ['CLIENT', 'REALTOR', 'ADMIN'],
    default: 'CLIENT',
  },
  createdAt: {
    type: Date,
    required: [true, 'User creation date must be entered'],
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.hasChangedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChagedAt) {
    const changedTimestamp = parseInt(this.password.getTime() / 1000, 10);
    return jwtTimeStamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
export default User;
