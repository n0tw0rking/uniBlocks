const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  subscriptionId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
    },
  ],
});

module.exports = mongoose.model('Service', schema);
