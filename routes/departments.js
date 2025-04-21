const express = require('express');
const router = express.Router();
const Department = require('../models/departmentModel'); // MongoDB model

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/view', async (req, res) => {
  try {
    const departments = await Department.find();
    res.render('departments', { departments });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  try {
    const departments = await Department.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { _id: { $regex: query, $options: 'i' } },
      ],
    });
    res.render('departments', { departments });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a specific department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).send('Department not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new department
router.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    const newDepartment = new Department({ name, location });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  const { name, location } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true }
    );
    if (updatedDepartment) {
      res.json(updatedDepartment);
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
      res.status(204).send();
    } else {
      res.status(404).send('Department not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
