const mongoose = require("mongoose");

const SubService = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: "services",
    required: [true, "Please enter a full name"],
    index: true
  },
  subscribtion: {
    type: mongoose.Schema.Types.ObjectId,
    $ref: "subscribtions"
  }
});
module.exports = mongoose.model("SubService", SubService);
