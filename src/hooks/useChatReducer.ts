import { useReducer } from 'react';

const initialState = {
  userInput: '',
  isLoading: false,
  chatHistory: [],
  generatedImageUrl: null,
  dataReEnable: false,
};

interface ChatState {
  userInput: string;
  isLoading: boolean;
  chatHistory: any[]; // Cambiado a any[] para permitir objetos más complejos
  generatedImageUrl: string | null;
  dataReEnable: boolean;
}

interface ChatAction {
  type: string;
  payload?: any;
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_USER_INPUT':
      return { ...state, userInput: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_TO_CHAT_HISTORY':
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case 'REPLACE_IN_CHAT_HISTORY':
      // Encuentra el índice del mensaje temporal basado en tempId
      const tempMessageIndex = state.chatHistory.findIndex(
        message => message.tempId === action.payload.tempId,
      );
      if (tempMessageIndex !== -1) {
        // Crea una copia del chatHistory y reemplaza el mensaje temporal con el nuevo mensaje
        const newChatHistory = [...state.chatHistory];
        newChatHistory[tempMessageIndex] = action.payload.newMessage;
        return { ...state, chatHistory: newChatHistory };
      }
      return state; // Si no se encuentra el tempId, devuelve el estado actual sin cambios
    case 'SET_GENERATED_IMAGE_URL':
      return { ...state, generatedImageUrl: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, chatHistory: [] };
    case 'TOGGLE_DATA_RE_ENABLE':
      return { ...state, dataReEnable: !state.dataReEnable };
    default:
      return state;
    case 'UPDATE_CHAT_MESSAGE':
      const updatedChatHistory = state.chatHistory.map(message =>
        message.tempId === action.payload.tempId
          ? { ...message, message: action.payload.message }
          : message,
      );
      return { ...state, chatHistory: updatedChatHistory };
  }
}

export const useChatReducer = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return { state, dispatch };
};
