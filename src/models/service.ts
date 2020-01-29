import mongoose from 'mongoose';
const Service = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a service name'],
    index: true,
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
    index: true,
  },
});
export default mongoose.model('Service', Service);
