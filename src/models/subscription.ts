import { ISubscribtion } from '../interfaces/ISubscribtion';
import mongoose from 'mongoose';

const Subscription = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },
  balance: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: 'Balance',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: 'User',
  },
});
export default mongoose.model<ISubscribtion & mongoose.Document>('Subscribtion', Subscription);
