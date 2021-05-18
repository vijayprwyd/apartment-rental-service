import express from 'express';
import AuthController from '../authentication/authController.mjs';
import catchAsync from '../common/catchAsync.mjs';
import USER_ROLES from '../constants/userRoles.mjs';
import UserController from './userController.mjs';

const router = express.Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/signup', catchAsync(authController.signup));
router.post('/login', catchAsync(authController.login));

router
  .route('/')
  .get(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN),
    catchAsync(userController.getUsers)
  )
  .post(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN, USER_ROLES.REALTOR),
    catchAsync(userController.createUser)
  );

router
  .route('/:id')
  .get(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN),
    catchAsync(userController.getUser)
  )
  .put(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN),
    catchAsync(userController.updateUser)
  )
  .delete(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN),
    catchAsync(userController.deleteUser)
  );

/*router
  .route('/me')
  .get(
    catchAsync(authController.authenticate),
    catchAsync(userController.getUser)
  )
  .patch(
    catchAsync(authController.authenticate),
    catchAsync(userController.updateUser)
  )
  .delete(
    catchAsync(authController.authenticate),
    catchAsync(userController.deleteUser)
  );*/

export default router;
