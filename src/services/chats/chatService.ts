import axios from 'axios';

const apiUrlChat = "";
const apiUrlImage = "";
const apiKey = "";
const apiUrlModeration = "";
const ApiKeyGemini = ''

export const generateImage = async (imagePrompt: string) => {
  if (imagePrompt.length < 10) {
    throw new Error("El prompt para la imagen es demasiado genérico.");
  }
  const response = await axios.post(
    apiUrlImage,
    {
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
      style: "vivid",
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data[0].url;
};


const responseCache = new Map<string, string>();

export const handleTextRequest = async (userInput: string, chatHistory: Array<{type: string, message: string}>): Promise<string> => {
  const prompt = `El usuario está interesado en gastronomía. Pregunta: ${userInput}`;
  if (responseCache.has(prompt)) {
    return responseCache.get(prompt)!; 
  }
  const messages = chatHistory.map(chat => ({
    role: chat.type === 'user' ? 'user' : 'system',
    content: chat.message,
  }));
  messages.push({ role: "user", content: userInput });

  try {
    const response = await axios.post(apiUrlChat, {
      model: "gpt-4o",
      messages: messages,
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
      const trimmedResponse = response.data.choices[0].message.content.trim();
      responseCache.set(prompt, trimmedResponse);
      return trimmedResponse;
    } else {
      console.error("Unexpected response structure:", response.data);
      throw new Error("Unexpected response structure from OpenAI API.");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud a la API:", error);
    throw new Error("Error al procesar la solicitud a la API de OpenAI.");
  }
};


export const moderateContent = async (content: string): Promise<boolean> => {
  if (!content) {
    console.warn("Advertencia: El contenido a moderar está vacío. Se considerará como apropiado.");
    return true; 
  }

  const bannedWords = ["mamaguevo", "gay", "pinga", "pajaro", ]; 
  const contentLowerCase = content.toLowerCase();

  const containsBannedWords = bannedWords.some(word => contentLowerCase.includes(word));
  if (containsBannedWords) {
    console.log("Contenido marcado como inapropiado debido a palabras prohibidas.");
    return false; 
  }

  try {
    const response = await axios.post(
      apiUrlModeration,
      {
        input: content,
        model: "text-moderation-latest",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const results = response.data.results;
    let isContentAppropriate = true;
    for (const result of results) {
      if (result.flagged) {
        isContentAppropriate = false;
        console.log(`Contenido marcado como inapropiado: ${content}`);
        console.log('Categorías marcadas y sus puntuaciones:', result.categories, result.category_scores);
        break;
      }
    }

    return isContentAppropriate;
  } catch (error) {
    console.error("Error al realizar la solicitud a la API de moderación:", error);
    throw error;
  }
};

export const fetchDynamicExploreData = async (chatHistory : Array<{type: string, message: string}>, country: string, promps?: string, prompstwo?: string) => {
  try {
    // Solicitudes para diferentes tipos de recetas
    const preferences = [
      `Recetas populares de ${country} con títulos cortos y atractivos`,
      `Recetas saludables de ${promps} con títulos cortos y atractivos`,
      `Recetas aleatorias de ${prompstwo} con títulos cortos y atractivos`
    ];

    const suggestions = await Promise.all(preferences.map(pref => handleTextRequest(pref, chatHistory)));
    console.log("Suggestions received:", suggestions);

    const generateDescription = (foodItem: string) => {
      const baseDescription = `Prepara un delicioso plato de ${foodItem} siguiendo estos pasos básicos.`;
      const specificInstructions:  { [key: string]: string } = {
        'titulo de receta': 'descripcion de recetas',
        // Agrega más descripciones específicas aquí
      };
      return `${baseDescription} ${specificInstructions[foodItem] || 'Combina los ingredientes y cocina a tu gusto.'}`;
    };

    // Procesar cada tipo de sugerencia
    const categorizedSuggestions = suggestions.map((suggestion, index) => {
      if (typeof suggestion === 'string' && suggestion.match(/^\d+\./)) {
        return suggestion.split('\n').map((line, idx) => {
          const label = line.replace(/^- /, '').trim();
          return {
            id: idx,
            label: label.trim(),
            description: generateDescription(label.trim()),
            category: index === 0 ? 'popular' : (index === 1 ? 'healthy' : 'random')
          };
        });
      } else {
        console.error("Received non-JSON, non-plain text response:", suggestion);
        return [];
      }
    });

    // Aplanar el array de arrays y devolverlo
    return categorizedSuggestions.flat();
  } catch (error) {
    console.error("Error al obtener datos dinámicos:", error);
    return []; 
  }
};