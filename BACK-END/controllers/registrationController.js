const Registration = require('../models/Registration');

// POST /registrations
exports.create = async (req, res) => {
  try {
    const { name, email, team, age } = req.body || {};
    if (!name || !email || !team || typeof age !== 'number') {
      return res.status(400).json({ error: 'name, email, team, and age are required' });
    }

    const reg = await Registration.create({ name, email: email.toLowerCase(), team, age });
    return res.status(201).json(reg);
  } catch (err) {
    console.error('Registration create error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /registrations (optional, for admin)
exports.list = async (_req, res) => {
  try {
    const regs = await Registration.find().sort({ createdAt: -1 }).lean();
    return res.json(regs);
  } catch (err) {
    console.error('Registration list error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH /registrations/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Registration not found' });
    return res.json(updated);
  } catch (err) {
    console.error('Registration updateStatus error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /registrations/:id
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Registration not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error('Registration delete error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
