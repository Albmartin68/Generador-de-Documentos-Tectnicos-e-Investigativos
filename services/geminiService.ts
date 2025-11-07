import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, Flashcard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generateDocumentContent(params: GenerationParams): Promise<string> {
    const { template, subcore, title, language, keyPoints, outputFormat } = params;

    const prompt = `
        **Instrucción:** Genera el contenido para un documento técnico profesional.
        
        **Categoría:** ${subcore}
        **Tipo de Plantilla:** ${template.name} (${template.description})
        **Título del Documento:** ${title}
        **Idioma:** ${language}
        **Formato de Salida Deseado:** ${outputFormat}
        **Puntos Clave a Incluir:**
        ${keyPoints}

        **Tarea:**
        Basado en la información proporcionada, redacta el contenido completo del documento. 
        Asegúrate de que el contenido sea coherente, bien estructurado y profesional.
        Utiliza un formato adecuado para el tipo de documento solicitado.
        Si el formato de salida es Markdown o LaTeX, usa la sintaxis apropiada.
        La respuesta debe contener únicamente el cuerpo del documento generado, sin explicaciones adicionales, introducciones o texto que no sea parte del documento en sí.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        const text = response.text;
        if (!text) {
            throw new Error("La respuesta de la API no contiene texto.");
        }

        return text;

    } catch (error) {
        console.error("Error al generar el documento con Gemini:", error);
        throw new Error("No se pudo generar el contenido del documento. Por favor, inténtelo de nuevo.");
    }
}


export async function generateFlashcardsFromContent(content: string): Promise<Flashcard[]> {
    const prompt = `
        **Instrucción:** Analiza el siguiente documento técnico y extrae puntos clave en formato de "flashcards".
        
        **Documento a Analizar:**
        ---
        ${content}
        ---

        **Tarea:**
        Identifica tres tipos de información en el texto:
        1.  **Errores Potenciales (error):** Inconsistencias, datos que parecen incorrectos o frases mal formuladas.
        2.  **Sugerencias de Mejora (suggestion):** Próximos pasos, áreas que podrían expandirse o mejoras en la redacción.
        3.  **Información Clave (keyInfo):** Datos críticos, conclusiones importantes o las ideas más relevantes del texto.

        Devuelve una lista de objetos JSON que sigan el esquema proporcionado. Cada objeto debe tener un tipo y el contenido textual de la flashcard. Sé conciso y directo.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: {
                                type: Type.STRING,
                                enum: ['error', 'suggestion', 'keyInfo'],
                                description: "El tipo de flashcard."
                            },
                            content: {
                                type: Type.STRING,
                                description: "El contenido textual de la flashcard."
                            }
                        },
                        required: ["type", "content"]
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const flashcards = JSON.parse(jsonText);
        return flashcards as Flashcard[];

    } catch (error) {
        console.error("Error al generar las flashcards con Gemini:", error);
        throw new Error("No se pudo analizar el documento. La respuesta de la IA no fue un JSON válido o hubo otro error.");
    }
}
