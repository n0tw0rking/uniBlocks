const express = require('express');
const express_graphql = require('express-graphql');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphiqlShema = require('./graphql/schema');
const graphiqlResolver = require('./graphql/resolver');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');

// const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);

app.use(
  '/graphql',
  express_graphql({
    schema: graphiqlShema,
    rootValue: graphiqlResolver,
    graphiql: true,
  }),
);

mongoose
  .connect('mongodb://localhost:27017/appEvent', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to database');
  })
  .catch(error => console.log(error));

app.listen(4000, () => console.log('server is running on local host 4000/graphql '));
