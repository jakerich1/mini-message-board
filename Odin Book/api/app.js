/* eslint-disable no-console */
// Package imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./passport');
const mongoose = require('mongoose');
const passport = require('passport');

// Database config
const mongoDb = 'mongodb+srv://jrich01:ZxrRhwLjszfCP59@cluster0.qa0dh.mongodb.net/odinbook?retryWrites=true&w=majority';
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Import routes
const indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const user = require('./routes/user');

// Express app initialization
const app = express();

// Init middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Define routes
app.use('/', indexRouter); // Unprotected routes
// Login via jwt auth + sign up route
app.use('/auth', auth);
// Protected via jwt authentication
app.use('/user', passport.authenticate('jwt', { session: false }), user);

app.use((req, res) => {
  res.status(404).send('route not found');
});

module.exports = app;
