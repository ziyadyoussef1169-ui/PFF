const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(user) {
  const payload = { id: user._id, email: user.email, name: user.name };
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_jwt_secret_change_me', {
    expiresIn: '7d',
  });
}

// POST /auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });

    const token = generateToken(user);
    return res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/me (protected)
exports.me = async (req, res) => {
  try {
    // req.user is set by auth middleware
    return res.json({ user: req.user });
  } catch (err) {
    console.error('Me error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
