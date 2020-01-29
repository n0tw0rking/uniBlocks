const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  value: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("Balance", schema);
