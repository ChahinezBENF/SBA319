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
    const formattedEmployees = employees.map(employee => {
      const date = new Date(employee.hireDate);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear()}`;
      return { ...employee.toObject(), hireDate: formattedDate };
    });
    res.render('employees', { employees: formattedEmployees });
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// Search for employees
router.get('/search', async (req, res) => {
  const { q } = req.query; // Extract the search query parameter (e.g., ?q=value)
  
  try {
    // Search for employees by matching firstName, lastName, role, or department
    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: q, $options: 'i' } }, // Case-insensitive search
        { lastName: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } },
        { department: { $regex: q, $options: 'i' } }
      ]
    });
    
    res.render('employees', { employees });
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});

// Render the Add Employee form
router.get('/add', (req, res) => {
  res.render('addEmployee'); 
});


// Add a new employee
router.post('/', async (req, res) => {
  const { Eid, firstName, lastName, role, department, salary, hireDate , dob } = req.body;

  try {
    // Create a new employee document
    const newEmployee = new Employee({
      Eid,
      firstName,
      lastName,
      role,
      department,
      salary,
      hireDate,
      dob 
    });

    // Save the document to the database
    await newEmployee.save();

    // Redirect to the employees view page after successful addition
    res.redirect('/employees/view');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Render Update Employee Form
router.get('/update/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found.');
    }
    res.render('updateEmployee', { employee });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Employee
router.post('/update/:id', async (req, res) => {
  const { firstName, lastName, role, department, salary, hireDate, dob  } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, role, department, salary, hireDate, dob  },
      { new: true , runValidators: true}
    );
    if (!updatedEmployee) {
      return res.status(404).send('Employee not found.');
    }
    res.redirect('/employees/view');
  } catch (err) {
    res.status(400).send(err.message);
  }
});




// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.redirect('/employees/view'); // No Content response for successful deletion
    } else {
      res.status(404).send('Employee not found'); // Employee with given ID not found
    }
  } catch (err) {
    res.status(500).send(err.message); // Handle server errors
  }
});



//get element by id
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee); // Remove the redirect
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
