/* eslint-disable no-console */
// Package imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./passport');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');

// Database config
const mongoDb = 'mongodb+srv://jrich01:ZxrRhwLjszfCP59@cluster0.qa0dh.mongodb.net/odinbook?retryWrites=true&w=majority';
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Import routes
const indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');
const comment = require('./routes/comment');

// Express app initialization
const app = express();

// Init middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(compression());
app.use(helmet());

// Configure CORS
const corsOptions = {
  origin: ['https://localhost:3000', 'http://localhost:5000'],
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Define routes
app.use('/un', indexRouter); // Unprotected routes
// Login via jwt auth + sign up route
app.use('/auth', auth);
// Protected user routes via jwt authentication
app.use('/user', passport.authenticate('jwt', { session: false }), user);
// Protected post routes via jwt authentication
app.use('/post', passport.authenticate('jwt', { session: false }), post);
// Protected comment routes via jwt authentication
app.use('/comment', passport.authenticate('jwt', { session: false }), comment);

app.use((req, res) => {
  res.status(404).send('route not found');
});

module.exports = app;
