import { ImageProps } from 'react-native';

export type PropsComment = {
  id: string;
  avatar: ImageProps;
  name: string;
  content: string;
  likes: string;
};

export interface Recipe {
  id: string;
  name: string;
  cover: string[];
  price: number;
}

export interface ChatMessage {
  imageUrl?: string;
  text?: string;
}
