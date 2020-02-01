const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  message: {
    type: String,
    require: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Message', schema);
