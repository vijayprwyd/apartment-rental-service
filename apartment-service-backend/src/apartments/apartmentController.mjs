import ApiFeatures from '../common/apiFeatures.mjs';
import AppError from '../errors/appError.mjs';
import Apartment from './apartmentModel.mjs';
import ApartmentFilter from './utils/apartmentFilter.mjs';

class ApartmentController {
  async getApartments(req, res) {
    const apartmentFilter = new ApartmentFilter();
    const features = new ApiFeatures(Apartment.find(), req)
      .filter(apartmentFilter.filterQueryBuilder)
      .sort('dateAdded')
      .limitFields()
      .paginate();

    const apartments = await features.query;
    res.status(200).json({
      status: 'success',
      results: apartments && apartments.length,
      data: {
        apartments,
      },
    });
  }

  async getApartment(req, res, next) {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return next(new AppError('No Apartment found with the ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        apartment,
      },
    });
  }

  async createApartment(req, res) {
    const newApartment = await Apartment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        apartment: newApartment,
      },
    });
  }

  async updateApartment(req, res, next) {
    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runWithValidators: true }
    );
    if (!apartment) {
      return next(new AppError('No apartment found with the ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        apartment,
      },
    });
  }

  async deleteApartment(req, res, next) {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) {
      return next(new AppError('No apartment found with the ID', 404));
    }

    res.status(204).send({
      status: 'success',
      data: null,
    });
  }
}
export default ApartmentController;
