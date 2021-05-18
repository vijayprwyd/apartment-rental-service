import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Apartment must have name'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  floorAreaSize: {
    type: Number,
    required: [true, 'Apartment must have floor Area'],
  },
  pricePerMonth: {
    type: Number,
    required: [true, 'Apartment must have price'],
  },
  noOfRooms: {
    type: Number,
    required: [true, 'Apartment must have total no of rooms'],
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    cordinates: [Number], // lat and long
    address: String,
    description: String,
  },
  dateAdded: {
    type: Date,
    required: [true, 'Apartment must have date added property'],
    default: Date.now,
  },
  realtorEmail: {
    type: String,
    required: [true, 'Apartment must have an associated realtor'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Availiable', 'Rented'],
    default: 'Availiable',
  },
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
