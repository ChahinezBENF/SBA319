const express = require('express');
const router = express.Router();
const Role = require('../models/roleModel');

// Get All Roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// View All Roles
router.get('/view', async (req, res) => {
  try {
    const roles = await Role.find();
    res.render('roles', { roles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Search Roles
router.get('/search', async (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  try {
    const roles = await Role.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { Rid: parseInt(query) || null }
      ]
    });
    res.render('roles', { roles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a New Role
router.post('/', async (req, res) => {
  const { Rid, title } = req.body;
  try {
    const newRole = new Role({ Rid, title });
    await newRole.save();
    res.redirect('/roles/view');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a Role
router.put('/:id', async (req, res) => {
  const { title } = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (updatedRole) {
      res.redirect('/roles/view');
    } else {
      res.status(404).send('Role not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a Role
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (deletedRole) {
      res.redirect('/roles/view');
    } else {
      res.status(404).send('Role not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
