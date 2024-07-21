import React from 'react';
import { Modal, Box, Typography, Button, CardMedia } from '@mui/material';
import { Recipe } from '../types';  // Import the Recipe interface

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  handleClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, open, handleClose }) => {
  if (!recipe) return null;

  return (
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
          maxHeight: '80vh',
          overflow: 'auto'
        }}
      >
        <Typography variant="h4" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ingredients: {recipe.ingredients.map(ing => `${ing.name} (${ing.quantity})`).join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Instructions: {recipe.instructions}
        </Typography>
        {recipe.imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={recipe.imageUrl}
            alt={recipe.title}
            sx={{ mt: 2 }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RecipeModal;
