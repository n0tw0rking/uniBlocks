const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userMesg: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

module.exports = mongoose.model('User', schema);
