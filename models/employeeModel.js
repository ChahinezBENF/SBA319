const mongoose = require('../db/conn');

const employeeSchema = new mongoose.Schema({
  Eid: {type: Number,required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  hireDate: { type: String, required: true },
  dob: {   type: Date, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;