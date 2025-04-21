const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/view', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('employees', { employees });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  const { firstName, lastName, role, department, salary } = req.body;
  try {
    const newEmployee = new Employee({ firstName, lastName, role, department, salary });
    await newEmployee.save();
    res.redirect('/employees/view');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  const updates = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.status(204).send();
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
