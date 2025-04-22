const express = require('express');
const router = express.Router();
const Department = require('../models/departmentModel');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// View all departments (EJS)
router.get('/view', async (req, res) => {
  try {
    const departments = await Department.find();
    res.render('departments', { departments });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Search for departments
router.get('/search', async (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  try {
    const departments = await Department.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { Did: parseInt(query) || null }
      ]
    });
    res.render('departments', { departments });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new department
router.post('/', async (req, res) => {
  const { Did, name } = req.body;
  try {
    const newDepartment = new Department({ Did, name });
    await newDepartment.save();
    res.redirect('/departments/view');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  const { Did, name } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { Did, name },
      { new: true }
    );
    if (updatedDepartment) {
      res.redirect('/departments/view');
    } else {
      res.status(404).send('Department not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a department
router.delete('/:id', async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (deletedDepartment) {
      res.redirect('/departments/view');
    } else {
      res.status(404).send('Department not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
