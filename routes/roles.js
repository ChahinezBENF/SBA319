const express = require('express');
const router = express.Router();
const Role = require('../models/roleModel');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/view', async (req, res) => {
  try {
    const roles = await Role.find();
    res.render('roles', { roles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new role
router.post('/', async (req, res) => {
  const { title, permissions } = req.body;
  try {
    const newRole = new Role({ title, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  const updates = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (updatedRole) {
      res.json(updatedRole);
    } else {
      res.status(404).send('Role not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a role
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (deletedRole) {
      res.status(204).send();
    } else {
      res.status(404).send('Role not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
