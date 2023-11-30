const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Student = require('./models/Student'); // Import the Mongoose model

app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    app.listen(3001, () => {
      console.log('Server up and running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });

// Retrieve all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a student by rollno
app.get('/students/:rollno', async (req, res) => {
  const rollno = req.params.rollno;
  try {
    const student = await Student.findOne({ rollno: rollno });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new student
app.post('/students', async (req, res) => {
  const newStudent = req.body;
  try {
    const createdStudent = await Student.create(newStudent);
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a student by rollno
app.delete('/students/:rollno', async (req, res) => {
  const rollno = req.params.rollno;
  try {
    const result = await Student.deleteOne({ rollno: rollno });
    if (result.deletedCount > 0) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student by rollno
app.put('/students/:rollno', async (req, res) => {
  const rollno = req.params.rollno;
  const newRollno = req.body.rollno;
  try {
    const result = await Student.updateOne({ rollno: rollno }, { rollno: newRollno });
    if (result.nModified > 0) {
      res.json({ message: 'Student rollno updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
