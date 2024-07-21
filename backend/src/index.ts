const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error: any) => {
  console.error('MongoDB connection error:', error);
});

// Define the AboutMe schema and model
const aboutMeSchema = new mongoose.Schema({
  name: String,
  biography: String,
  avatarUrl: String
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

// Define a route to get AboutMe data
app.get('/api/aboutme', async (req: any, res: any) => {
  try {
    const aboutMeData = await AboutMe.findOne();
    res.json(aboutMeData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about me data', error });
  }
});

// Define a route to insert AboutMe data
app.post('/api/aboutme', async (req: any, res: any) => {
  const { name, biography, avatarUrl } = req.body;
  try {
    const result = await AboutMe.updateOne(
      {},
      { $set: { name, biography, avatarUrl } },
      { upsert: true }
    );
    res.json({ message: 'Data inserted/updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting/updating data', error });
  }
});

// Define a route to update AboutMe data
app.put('/api/aboutme', async (req: any, res: any) => {
  const { name, biography, avatarUrl } = req.body;
  try {
    const result = await AboutMe.updateOne(
      {},
      { $set: { name, biography, avatarUrl } },
      { upsert: true }
    );
    res.json({ message: 'Data updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
