const mongoose = require('../db/conn');


// Fields like `Eid`, `role`, and `department` are indexed for frequent queries.

const employeeSchema = new mongoose.Schema({
  Eid: {type: Number,required: true, unique : true , index: true, validate: {
    validator: (value) => value > 0, // Ensure `Eid` is positive
    message: 'Eid must be a positive number.'
  }
 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true, index: true }, // Reference to Role
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, index: true }, // Reference to Department
  salary: { type: Number, required: true,
    min: [30000, 'Salary must be at least $30,000.'], // Enforce minimum salary
    max: [200000, 'Salary cannot exceed $200,000.'] // Enforce maximum salary
  },
  hireDate: { type: String, required: true },
  dob: {   type: Date, required: true }
});



const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

