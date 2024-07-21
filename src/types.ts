// src/types.ts

export interface Recipe {
    _id?: string;
    title: string;
    ingredients: { name: string; quantity: string }[];
    instructions: string;
    imageUrl: string;
  }
  