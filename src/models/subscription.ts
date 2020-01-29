import mongoose from 'mongoose';

const Subscription = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },
  balance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balance',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
<<<<<<< HEAD:src/models/subscribtion.js
export default mongoose.model('Subscribtion', Subscribtion);
=======
export default mongoose.model<ISubscribtion & mongoose.Document>('Subscribtion', Subscription);
>>>>>>> parent of 9f5bf92... implementing the subscribtion population:src/models/subscription.ts
