const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile', (req, res) => {
  res.send(req.user);
});

module.exports = router;
