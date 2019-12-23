const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../client/public/config/keys.js").MONGO_URI;
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");
const cors = require("cors");
const path = require("path");
const app = express();


if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    }
  })
);

module.exports = app;