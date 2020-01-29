const Schema = require("mongoose").Schema;

const Subscription = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a full name"],
    index: true
  },
  balance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Balance"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Subscribtion", Subscription);
