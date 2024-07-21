// Recipes.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Link,
  Modal,
} from '@mui/material';
import { StyledBox } from '../Custom Styles/commonstyles';
import RecipeModal from './RecipeModal';  // Import the new RecipeModal component

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
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const recipesPerPage = 6;

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientsArray = e.target.value
      .split(',')
      .map((ingredient) => ingredient.trim());
    setNewRecipe((prev) => ({ ...prev, ingredients: ingredientsArray }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/recipes`, newRecipe);
      fetchRecipes(); // Refresh the list of recipes
      setNewRecipe({
        title: '',
        ingredients: [],
        instructions: '',
        imageUrl: '',
      }); // Reset form
      setOpen(false); // Close modal
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeModalOpen(true);
  };

  const handleRecipeModalClose = () => {
    setRecipeModalOpen(false);
    setSelectedRecipe(null);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <StyledBox>
      <Typography variant="h2" align="center" gutterBottom>
        Recipes
      </Typography>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add a New Recipe
          </Typography>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
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
        </Box>
      </Modal>

      <Grid container spacing={3}>
        {currentRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ display: 'flex', height: 200 }}>
              <Grid container>
                <Grid item xs={6}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="h5" component="div">
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Ingredients: {recipe.ingredients.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Instructions: {recipe.instructions.length > 100 ? recipe.instructions.substring(0, 100) + '...' : recipe.instructions}
                    </Typography>
                    <Link component="button" variant="body2" onClick={() => handleRecipeClick(recipe)}>
                      Read More
                    </Link>
                  </CardContent>
                </Grid>
                <Grid item xs={6}>
                  {recipe.imageUrl && (
                    <CardMedia
                      component="img"
                      sx={{ height: '100%' }}
                      image={recipe.imageUrl}
                      alt={recipe.title}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2 }}>
        <Pagination
          count={Math.ceil(recipes.length / recipesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Recipe
        </Button>
      </Box>

      <RecipeModal
        recipe={selectedRecipe}
        open={recipeModalOpen}
        handleClose={handleRecipeModalClose}
      />
    </StyledBox>
  );
};

export default Recipes;
