/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Post route to trigger facebook token authentication
router.post('/facebook', (req, res, next) => {
  // Invoke facebookToken authentication
  passport.authenticate('facebookToken', (err, user) => {
    if (err) return res.send(err);

    const payload = { _id: user._id };

    jwt.sign(payload, 'test', { expiresIn: '1d' }, (jwtErr, token) => {
      if (jwtErr) return res.status(400).json(jwtErr);
      res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
