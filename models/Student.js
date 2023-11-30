// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: Number,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
