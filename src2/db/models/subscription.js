const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  balance: {
    type: Schema.Types.ObjectId,
    ref: 'Balance',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Subscription', schema);