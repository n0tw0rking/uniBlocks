const mongoose = require(mongoose);
const { config } = require("../config/index");

const mongoose = async () => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  return connection.connection.db;
};
module.exports = {
  mongoose
};
