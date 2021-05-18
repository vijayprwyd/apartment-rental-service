import express from 'express';
import AuthController from '../authentication/authController.mjs';
import catchAsync from '../common/catchAsync.mjs';
import USER_ROLES from '../constants/userRoles.mjs';
import ApartmentController from './apartmentController.mjs';

const router = express.Router();
const apartmentController = new ApartmentController();
const authController = new AuthController();
router
  .route('/')
  .get(
    catchAsync(authController.authenticate),
    catchAsync(apartmentController.getApartments)
  )
  .post(
    catchAsync(authController.authenticate),
    authController.restrictTo(USER_ROLES.ADMIN, USER_ROLES.REALTOR),
    catchAsync(apartmentController.createApartment)
  );

router
  .route('/:id')
  .get(
    catchAsync(authController.authenticate),
    catchAsync(apartmentController.getApartment)
  )
  .put(
    catchAsync(authController.authenticate),
    catchAsync(apartmentController.updateApartment)
  )
  .delete(
    catchAsync(authController.authenticate),
    catchAsync(apartmentController.deleteApartment)
  );

export default router;
