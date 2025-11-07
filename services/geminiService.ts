import { GoogleGenAI } from "@google/genai";
import { Template } from '../types';

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

// Always use `new GoogleGenAI({apiKey: process.env.API_KEY});`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDocumentContent = async (
    template: Template,
    sourceContent: string,
    outputFormat: string
): Promise<string> => {
    const prompt = `
        **Tarea:** Generar un documento técnico basado en una plantilla.

        **Plantilla:** ${template.name} (${template.description})
        **Formato de Salida Requerido:** ${outputFormat}
        **Contenido Fuente:**
        ---
        ${sourceContent}
        ---

        **Instrucciones:**
        1.  Analiza el contenido fuente proporcionado.
        2.  Utilizando la plantilla "${template.name}", genera el contenido completo del documento.
        3.  El documento debe ser profesional, bien estructurado y coherente.
        4.  Asegúrate de que la salida esté formateada adecuadamente para el formato de salida "${outputFormat}". Si el formato es Markdown, usa la sintaxis de Markdown. Si es LaTeX, usa la sintaxis de LaTeX.
        5.  No incluyas esta sección de instrucciones en la respuesta final. Solo genera el contenido del documento solicitado.
    `;

    try {
        // Use `ai.models.generateContent` to query GenAI.
        const response = await ai.models.generateContent({
            // For complex text tasks like document generation, 'gemini-2.5-pro' is a good choice.
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
                topK: 64,
            },
        });
        
        // Access the generated text directly from the `.text` property.
        return response.text;
    } catch (error) {
        console.error("Error generating document content:", error);
        if (error instanceof Error) {
            return `Error al generar el documento: ${error.message}`;
        }
        return "Ocurrió un error desconocido al generar el documento.";
    }
};
