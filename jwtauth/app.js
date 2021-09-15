// Package imports
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./passport');
const mongoose = require("mongoose");
const passport = require("passport");

// Database config
const mongoDb = "mongodb+srv://jrich01:ZxrRhwLjszfCP59@cluster0.qa0dh.mongodb.net/jwttest?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Import routes 
var indexRouter = require('./routes/index');
var auth = require('./routes/auth');
var user = require('./routes/user');

// Express app initialization
var app = express();

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
app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

app.use(function (req, res, next) {
    res.status(404).send("route not found")
})


module.exports = app;
