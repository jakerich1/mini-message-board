/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { body, validationResult } = require('express-validator');
const async = require('async');
const Request = require('../models/requestModel');
const User = require('../models/userModel');
const { checkFriend } = require('../helpers/helpers');

const router = express.Router();

/* GET user jwt payload info. */
router.get('/', (req, res) => {
  res.send(req.user);
});

// Delete user from db
router.delete('/', (req, res) => {
  // Find user by ID and remove from db
  User.findByIdAndDelete(req.user._id, (err) => {
    // Handle db error
    if (err) res.status(500).send(err);

    // If successfull
    res.status(202).send('User removed');
  });
});

// Get info of user
router.get('/info', (req, res) => {
  // Find user by ID and retur info from db
  User.findOne({ _id: req.user._id })
    .select('-_id -active -facebook.id')
    .exec((err, data) => {
      // Handle db error
      if (err) res.status(500).send(err);

      res.status(200).json(data);
    });
});

// Update users profile picture
router.put('/picture', [
  // Validate and sanitise fields.
  body('path')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Path must be specified')
    .isLength({ max: 1000 })
    .withMessage('Path exceeds maximum length'),

  // Process request after validation and sanitization
  (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (errors) {
      // Return validation errors to the client
      res.status(400).json(errors);
    } else {
      // If no validation errors, process request
      const filter = { _id: req.user._id };
      const doc = { $set: { profile_picture: req.body.path } };
      const options = { new: true };

      User.findOneAndUpdate(filter, doc, options, (err, newDoc) => {
      // Handle db error
        if (err) res.status(500).send(err);

        // If updated, return new updated image path
        res.status(200).send(newDoc.profile_picture);
      });
    }
  },
]);

// Update users relationship status
router.put('/relationship', [
  // Validate and sanitise fields.
  body('status')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title must be specified')
    .isLength({ max: 100 })
    .withMessage('Status exceeds maximum length')
    .escape(),

  // Process request after validation and sanitization.
  (req, res) => {
    // Extract the validation errors from a request.
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json(validationErrors);
    } else {
      // If no validation errors
      const filter = { _id: req.user._id };
      const doc = { $set: { relationship_status: req.body.status } };
      const options = { new: true };

      User.findOneAndUpdate(filter, doc, options, (err, newDoc) => {
      // Handle db error
        if (err) res.status(500).send(err);

        // If updated, return new updated image path
        res.status(200).send(newDoc.relationship_status);
      });
    }
  },
]);

// Create a test user, DEV PURPOSES ONLY
router.post('/testuser', (req, res) => {
  // Create new user
  const newUser = new User({
    method: 'facebook',
    facebook: {
      id: Math.floor(100000000 + Math.random() * 900000000),
      email: 'test email',
      first_name: req.body.first,
      last_name: req.body.last,
    },
    profile_picture: './placeholder.png',
    created: new Date(),
    active: true,
    relationship_status: 'single',
  });

  newUser.save((err) => {
    if (err) return res.status(500);
    res.status(201).send('user created');
  });
});

// Create a new friend request
router.post('/:id/request', (req, res) => {
  // Construct new Request object
  const newRequest = new Request({
    issuer: req.user._id,
    recipient: req.params.id,
    created: new Date(),
    status: 'pending',
  });

  // Check if request already exists
  Request.findOne({ issuer: req.user._id, recipient: req.params.id })
    .exec((err, foundRequest) => {
      if (err) return res.status(500);

      // If request already exits
      if (foundRequest) {
        // Request exists, return a 409
        return res.status(409).send('Friend request already exists');
      }

      newRequest.save((requestErr) => {
        if (requestErr) { return res.status(requestErr); }

        res.status(201).send('Friend request sent');
      });
    });
});

// Cancel/ remove a friend request
router.delete('/request/:id', (req, res) => {
  // Get request first to check current user is authorised to delete the friend request
  Request.findById(req.params.id)
    .exec((err, foundRequest) => {
      if (err) return res.status(500);

      if (foundRequest) {
        if ((req.user._id == foundRequest.issuer || req.user._id == foundRequest.recipient) && foundRequest.status === 'pending') {
          // Find user by ID and remove from db
          Request.findByIdAndDelete(req.params.id, (deleteErr) => {
            // Handle db error
            if (deleteErr) res.status(500).send(deleteErr);
            // If successfull
            res.status(202).send('Request removed');
          });
        } else {
          // If user is not authorised to delete friend request
          res.status(401).send('not authorised to delete request');
        }
      } else {
        res.status(404).send('unable to find friend request');
      }
    });
});

// Accept a friend request
router.put('/request/:id', (req, res) => {
  // Get request first to check current user is authorised to accept the friend request
  Request.findById(req.params.id)
    .exec((err, foundRequest) => {
      if (err) return res.status(500);

      if (foundRequest) {
        if (req.user._id == foundRequest.recipient && foundRequest.status === 'pending') {
          // Find user by ID and remove from db
          const filter = { _id: req.params.id };
          const doc = { $set: { status: 'accepted' } };
          const options = { new: true };

          Request.findOneAndUpdate(filter, doc, options, (updateErr, newDoc) => {
            // Handle db error
            if (updateErr) res.status(500).send(updateErr);

            // If updated, return new updated status
            res.status(200).send(newDoc.status);
          });
        } else {
          // If user is not authorised to accept friend request
          res.status(401).send('not authorised to accept request');
        }
      } else {
        res.status(404).send('unable to find friend request');
      }
    });
});

// Get all friend requests as recipient and issuer
router.get('/request', (req, res) => {
  // Async requests for both request as recipient and issuer
  async.parallel({
    recipient_requests(callback) {
      Request.find({ recipient: req.user._id })
        .exec(callback);
    },
    issuer_requests(callback) {
      Request.find({ issuer: req.user._id })
        .exec(callback);
    },
  }, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results);
  });
});

// Get all the User ID's of users friends
router.get('/friends', checkFriend, (req, res) => {
  res.status(200).json(req.friends);
});

module.exports = router;
