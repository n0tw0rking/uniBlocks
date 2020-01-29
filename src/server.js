const { config } = require("./config");
const express = require("express");
// const { expressLoader } = require("./loaders/express");
async function startServer() {
  const app = express();
  await require("./loaders/mongoose").mongooseConnect();
  // await expressLoader({ app: app });
  // mongoose();
  app.listen(config.port, err => {
    if (err) {
      console.Error(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
