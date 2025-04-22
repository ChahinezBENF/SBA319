const mongoose = require('../db/conn');

const departmentSchema = new mongoose.Schema({
  Did: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
