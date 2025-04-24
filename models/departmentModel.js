const mongoose = require('../db/conn');

const departmentSchema = new mongoose.Schema({
  Did: { type: Number, required: true, unique: true, index: true },
  name: { type: String, required: true, index: true }
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
