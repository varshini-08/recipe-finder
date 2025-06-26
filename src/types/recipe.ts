export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  ingredients: string[];
  instructions: string[];
  sourceUrl?: string;
  summary?: string;
}

export interface SearchParams {
  ingredients: string[];
}