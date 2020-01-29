import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    salt: String,
    role: {
      type: String,
      default: 'user',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    subcribtions: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Subscribtion',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('User', User);
