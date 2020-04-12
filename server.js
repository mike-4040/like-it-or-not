require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const routes = require('./routes');

const applyPassStratJwt = require('./utils/applyPassStratJwt');
const applyPassStratGoogle = require('./utils/applyPassStratGoogle');
const { serverrc, mongorc } = require('./config/config');

const port = serverrc.port;

// Setting CORS so that any website can Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Apply strategies to passport
 */

applyPassStratJwt(passport);
applyPassStratGoogle(passport);
app.use(passport.initialize());

mongoose
  .connect(mongorc.MONGODB_URI, mongorc.options)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error(err));

// Serve up static assets
if (process.env.NODE_ENV === 'production')
  app.use(express.static('client/build'));

app.use(routes);

/** Authorization Error handling */

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError')
    res.status(401).send({ message: `${err.name}: ${err.message}` });
  else next(err);
});

//Send every request to the React app
app.get('*', function (req, res) {
  if (process.env.NODE_ENV === 'production')
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
