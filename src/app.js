const { config } = require("./config");
const express = require("express");
const routes = require("");
// import Logger from './loaders/logger';
async function startServer() {
  const app = express();
  await require("./loaders/mongoose").mongoose;

  app.listen(config.port, err => {
    if (err) {
      // Logger.error(

      console.log(err);
      process.exit(1);
      return;
    }
    // Logger.info(
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
