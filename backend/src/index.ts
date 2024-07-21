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

// Schemas
const aboutMeSchema = new mongoose.Schema({
  name: String,
  biography: String,
  avatarUrl: String
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  instructions: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

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

// Get all recipes
app.get('/api/recipes', async (req: any, res: any) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// Get a single recipe by ID
app.get('/api/recipes/:id', async (req: any, res: any) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
});

// Add a new recipe
app.post('/api/recipes', async (req: any, res: any) => {
  const { title, ingredients, instructions, imageUrl } = req.body;
  try {
    const newRecipe = new Recipe({ title, ingredients, instructions, imageUrl });
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
});

// Update an existing recipe
app.put('/api/recipes/:id', async (req: any, res: any) => {
  const { title, ingredients, instructions, imageUrl } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, imageUrl },
      { new: true }
    );
    res.json({ message: 'Recipe updated successfully', updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
});

// Delete a recipe
app.delete('/api/recipes/:id', async (req: any, res: any) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
