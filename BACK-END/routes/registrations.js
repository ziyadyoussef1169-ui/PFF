const express = require('express');
const router = express.Router();
const { create, list, updateStatus, remove } = require('../controllers/registrationController');

// Create a new competition registration
router.post('/', create);

// Optional: list all registrations (admin/debug)
router.get('/', list);

// Update a registration status (pending|approved|rejected)
router.patch('/:id/status', updateStatus);

// Delete a registration
router.delete('/:id', remove);

module.exports = router;
