const express_graphql = require("express-graphql");
const bodyParser = require("body-parser");
const graphiqlShcema = require("../models/graphql/schema");
const graphqlResolvcer = require("../models/graphql/resolver");
const isAuth = require("../api/middlewares/is-auth");
const { config } = require("../config/index");
module.exports = graphql = app => {
  app.use(bodyParser.json());
  app.use(isAuth);
  app.use(
    "/graphql",
    express_graphql({
      schema: graphiqlShcema,
      rootValue: graphqlResolvcer,
      graphiql: true
    })
  );
};
