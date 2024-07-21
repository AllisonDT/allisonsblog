import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, Box, Avatar } from '@mui/material';
import { StyledBox, BiographyContainer, AvatarBox } from '../Custom Styles/commonstyles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);

interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    title: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientsArray = e.target.value.split(',').map((ingredient) => ingredient.trim());
    setNewRecipe((prev) => ({ ...prev, ingredients: ingredientsArray }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/recipes`, newRecipe);
      fetchRecipes(); // Refresh the list of recipes
      setNewRecipe({ title: '', ingredients: [], instructions: '', imageUrl: '' }); // Reset form
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <StyledBox>
      <Typography variant="h2" align="center" gutterBottom>
        Recipes
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Recipe
        </Typography>
        <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newRecipe.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            label="Ingredients (comma-separated)"
            name="ingredients"
            value={newRecipe.ingredients.join(', ')}
            onChange={handleIngredientsChange}
            required
          />
          <TextField
            fullWidth
            label="Instructions"
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={newRecipe.imageUrl}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Recipe
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" gutterBottom>
        All Recipes
      </Typography>
      <Box>
        {recipes.map((recipe) => (
          <Paper key={recipe._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h5">{recipe.title}</Typography>
            <Typography variant="body1">Ingredients: {recipe.ingredients.join(', ')}</Typography>
            <Typography variant="body1">Instructions: {recipe.instructions}</Typography>
            {recipe.imageUrl && (
              <Avatar
                variant="square"
                alt={recipe.title}
                src={recipe.imageUrl}
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
          </Paper>
        ))}
      </Box>
    </StyledBox>
  );
};

export default Recipes;
