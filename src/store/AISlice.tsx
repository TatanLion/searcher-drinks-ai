import type { StateCreator } from "zustand"
import generateRecipe from "../services/AIService"

export type AISlicType = {
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt: string) => Promise<void>
}

export const AISlice : StateCreator<AISlicType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({ recipe: '', isGenerating: true }) // Limpiamos la receta antes de generar una nueva
        // const data = await AIService.generateRecipe(prompt)
        const data = await generateRecipe(prompt)
        for await (const textPart of data){
            console.log(textPart);
            set(state => ({
                recipe: state.recipe + textPart
            }))
        }
        set({ isGenerating: false })
    },
})