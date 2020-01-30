const mongoose = require("mongoose").Schema;

const Message = new mongoose.Schema({
  message: {
    type: String,
    require: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Message", Message);
