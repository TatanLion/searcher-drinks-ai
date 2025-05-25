import type { StateCreator } from "zustand"
import { getCategories, getRecipeByID, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe } from "../types"
import type { SearchFilter } from '../types/index';
import type { FavoritesliceType } from "./FavoriteSlice";

export type RecipieSliceType = {
  drinks: Drinks
  categories: Categories
  selectedRecipe: Recipe
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipies: (filters : SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
}

// NOTE Cuando se usa informacion de un slice en otro, toca definir el tipe e indicar cual se usara, aqui un ejemplo, esto se conoce como un nested slice
export const RecipeSlice : StateCreator<RecipieSliceType & FavoritesliceType, [], [], RecipieSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories
    })
  },
  searchRecipies: async (filters) => {
    const drinks = await getRecipes(filters);
    set({
      drinks
    })
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeByID(id)
    set({
      selectedRecipe,
      modal: true
    })
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})
