import { streamText } from "ai";
import { openRouter } from "../lib/ai";

// export default {
//     async generateRecipe(prompt: string) {
//         const result = streamText({
//             model: openRouter('shisa-ai/shisa-v2-llama3.3-70b:free'),
//             prompt
//         })
//         return result.textStream
//     }
// }

export default async function generateRecipe(prompt: string) {
    const result = streamText({
        model: openRouter('shisa-ai/shisa-v2-llama3.3-70b:free'),
        prompt,
        // Podemos parametrizar o dar comportamiento basado en lo que queremos
        system: 'Eres un bartender que tiene una experienciad e 50 años', // Esto es para darle un rol al chat
        // temperature: 1 // PAra dar respuestas deterministas o random, valor de 0 a 1
    })
    return result.textStream
}