const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, me } = require('../controllers/authController');

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// GET /auth/me (protected)
router.get('/me', auth, me);

module.exports = router;
