import { ISubService } from '../interfaces/ISubService';
import mongoose from 'mongoose';

const SubscriptionService = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: 'services',
    required: [true, 'Please enter a full name'],
    index: true,
  },
  subscribtion: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: 'subscribtions',
  },
});
export default mongoose.model<ISubService & mongoose.Document>('SubscriptionService', SubscriptionService);
