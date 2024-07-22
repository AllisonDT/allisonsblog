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
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: any) => {
    console.error('MongoDB connection error:', error);
  });

// Schemas
const aboutMeSchema = new mongoose.Schema({
  name: String,
  biography: String,
  avatarUrl: String,
});

const AboutMe = mongoose.model('AboutMe', aboutMeSchema);

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  instructions: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

// AboutMe Routes
app.get('/api/aboutme', async (req: any, res: any) => {
  try {
    const aboutMeData = await AboutMe.findOne();
    res.json(aboutMeData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about me data', error });
  }
});

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

// Recipe Routes
app.get('/api/recipes', async (req: any, res: any) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

app.get('/api/recipes/:id', async (req: any, res: any) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
});

app.post('/api/recipes', async (req: any, res: any) => {
  const { title, ingredients, instructions, imageUrl } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      imageUrl,
    });
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
});

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

app.delete('/api/recipes/:id', async (req: any, res: any) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
});

// Book Routes
app.get('/api/books', async (req: any, res: any) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

app.post('/api/books', async (req: any, res: any) => {
  const { title, author } = req.body;
  try {
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
