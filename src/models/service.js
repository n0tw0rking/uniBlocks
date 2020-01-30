const Schema = require("mongoose").Schema;

const Service = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a service name"],
    index: true
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
    index: true
  }
});
module.exports = mongoose.model("Service", Service);
