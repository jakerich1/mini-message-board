const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator');

// Post login which generates JWT 
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if(!user) { return res.status(400).json({ info }) }

        const payload = { _id: user._id };
        
        jwt.sign(payload, 'test', { expiresIn: '1d' }, (err, token) => {
            if(err) return res.status(400).json(err);
            res.json({ token });
        });
    })(req, res, next);
});

// POST sign up to create a new account
router.post('/signup', [

    // Validate and sanitize fields.
    body('username').trim()
    .isLength({ min: 1 }).withMessage('Email must specified.')
    .isLength({ max: 128 }).withMessage('Maximum email length of 128 characters exceeded')
    .isEmail().withMessage('Must provide a valid email')
    .normalizeEmail().escape(),

    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isLength({ max: 128 }).withMessage('Maximum password length of 128 characters exceeded')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
    .withMessage("Password must contain one uppercase, one lower case, and one number"),

    function(req, res, next) {

        // Extract the validation errors from a request.
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            res.status(400).json(validationErrors)
            return
        }

        // Generate a hashed password via bcrypt
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {    
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                timestamp: new Date
            })
            .save(err => {
                if (err) return next(err);
                res.status(201).send('registered');
            }); 
        });

    }

]);

module.exports = router;