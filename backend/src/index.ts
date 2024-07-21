const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error: any) => {
  console.error('MongoDB connection error:', error);
});

// // Define schemas and models
// const skillSchema = new mongoose.Schema({ name: String });
// const Skill = mongoose.model('Skill', skillSchema);

// // API endpoints
// app.get('/api/skills', async (req, res) => {
//   try {
//     const skills = await Skill.find();
//     res.json(skills);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/skills', async (req, res) => {
//   const newSkill = new Skill(req.body);
//   try {
//     await newSkill.save();
//     res.status(201).json(newSkill);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
