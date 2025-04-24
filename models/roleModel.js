const mongoose = require('../db/conn');


const roleSchema = new mongoose.Schema({
  Rid: { type: Number, required: true, unique: true , unique: true, index: true }, 
  title: { type: String, required: true , index: true },
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
