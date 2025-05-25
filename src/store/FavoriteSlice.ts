import type { StateCreator } from "zustand"
import type { Recipe } from "../types"
import { RecipeSlice, type RecipieSliceType } from "./RecipeSlice"
import { NotificationSlice, type NotificationSliceType } from "./NotificationSlice"

export type FavoritesliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe : Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

// NOTE Cuando se usa informacion de un slice en otro, toca definir el tipe e indicar cual se usara, aqui un ejemplo, esto se conoce como un nested slice
export const FavoriteSlice : StateCreator<FavoritesliceType & RecipieSliceType & NotificationSliceType, [], [], FavoritesliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            set(state => ({
                favorites: state.favorites.filter(r => r.idDrink !== recipe.idDrink)
            }))
            NotificationSlice(set, get, api).showNotification({
                text: 'Se ha eliminado de favoritos',
                error: false,
            })
        }else{
            set(state => ({
                favorites: [...state.favorites, recipe]
            }))
            NotificationSlice(set, get, api).showNotification({
                text: 'Se ha agregado de favoritos',
                error: false,
            })
        }
        RecipeSlice(set, get, api).closeModal()
        // Como solo queremos guardar los favoritos no es necesario guardar la info de los dos slices
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(r => r.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})