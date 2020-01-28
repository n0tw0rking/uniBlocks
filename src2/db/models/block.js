const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model('Block', schema);
