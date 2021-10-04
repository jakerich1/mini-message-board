/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/postModel');
const PostLike = require('../models/postLikesModel');
const { checkFriend } = require('../helpers/helpers');

const router = express.Router();

// Get paginated posts of current friends
router.get('/', (req, res) => {
  res.send('Not yet built');
});

// Get specific post
router.get('/:id', checkFriend, (req, res) => {
  // Find post by id
  Post.findById(req.params.id, (err, postResult) => {
    if (err) { return res.status(500).send(err); }

    if (postResult) {
      // If post has been found
      if (req.friends.includes(postResult.user) || req.user._id === postResult.user.toString()) {
        // Return data only if poster is a friend of the current user or belongs to current user
        res.json(postResult);
      } else {
        res.status(401).send('not a friend');
      }
    } else {
      res.status(404).send('unable to find post');
    }
  });
});

// Delete specific post
router.delete('/:id', (req, res) => {
  // Find post by id
  Post.findById(req.params.id, (err, postResult) => {
    if (err) { return res.status(500).send(err); }

    if (postResult) {
      // If post has been found
      if (req.user._id === postResult.user.toString()) {
        Post.findByIdAndDelete(req.params.id, (deleteErr) => {
          // Handle db error
          if (deleteErr) res.status(500).send(deleteErr);
          // If successfull
          res.status(202).send('Post removed');
        });
      } else {
        res.status(401).send('not correct user');
      }
    } else {
      res.status(404).send('unable to find post');
    }
  });
});

// Create new post
router.post('/', [
  // Validate and sanitise fields.
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content must be specified')
    .isLength({ max: 60000 })
    .withMessage('Content exceeds maximum length, 60,000 characters')
    .escape(),

  body('image')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('image path exceeds maximum length'),

  // Process request
  (req, res) => {
    // Extract the validation errors from a request.
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(400).json(validationErrors);
    } else {
      // If no validation errors
      const newPost = new Post({
        user: req.user._id,
        created: new Date(),
        content: req.body.content,
        image: req.body.image,
      });

      newPost.save((err) => {
        if (err) return res.status(500);
        res.status(201).send('post submitted');
      });
    }
  },
]);

// Like/Unlike a post
router.post('/:id/like', (req, res) => {
  // If no validation errors
  const newLikePost = new PostLike({
    user: req.user._id,
    created: new Date(),
    post: req.params.id,
  });

  PostLike.findOne({ user: req.user._id, post: req.params.id })
    .exec((err, postLikeResult) => {
      if (err) { return res.status(500).send(err); }
      if (postLikeResult) {
        PostLike.findByIdAndDelete(postLikeResult._id, (deleteErr) => {
          // Handle db error
          if (deleteErr) res.status(500).send(deleteErr);
          // If successfull
          res.status(202).send('unliked');
        });
      } else {
        newLikePost.save((likeErr) => {
          if (likeErr) return res.status(500);
          res.status(201).send('like submitted');
        });
      }
    });
});

module.exports = router;
