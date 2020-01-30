const Schema = require("mongoose").Schema;

const Block = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    type: String
  },
  userSubscription: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subscription"
    }
  ]
});

module.exports = mongoose.model("Block", Block);
