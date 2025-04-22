const mongoose = require('../db/conn');


const roleSchema = new mongoose.Schema({
  Rid: { type: Number, required: true, unique: true }, 
  title: { type: String, required: true },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
