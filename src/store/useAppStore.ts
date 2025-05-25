import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSlice, type RecipieSliceType } from "./RecipeSlice";
import { FavoriteSlice, type FavoritesliceType } from "./FavoriteSlice";
import { NotificationSlice, type NotificationSliceType } from "./NotificationSlice";
import { AISlice, type AISlicType } from "./AISlice";

export const useAppStore = create<RecipieSliceType & FavoritesliceType & NotificationSliceType & AISlicType> () ( 
    devtools ((...a) => ({
    ...RecipeSlice(...a),
    ...FavoriteSlice(...a),
    ...NotificationSlice(...a),
    ...AISlice(...a),
    }))
)