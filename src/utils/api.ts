import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../config/api';
import { Recipe, SearchParams } from '../types/recipe';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchRecipes = async ({ ingredients }) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/recipes?ingredients=${ingredients.join(',')}`
    );
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes. Please try again.');
  }
};