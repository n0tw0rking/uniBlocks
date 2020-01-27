import { ISubscription } from '../interfaces/ISubscription';
import mongoose from 'mongoose';

const Subscription = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },
  balance:{
      $ref: "Balance"
      required: true,

  }
});
