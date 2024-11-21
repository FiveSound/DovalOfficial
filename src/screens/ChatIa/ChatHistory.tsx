import React, { forwardRef } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import ChatMessage from "./ChatMessage";
import { COLORS, SIZES, responsiveFontSize } from "../../constants/theme";
import { scale } from "react-native-size-matters";
import RecipiesOrden from "./RecipiesOrden";

interface ChatHistoryProps {
  chatHistory: (
    { message: string, type: string } |
    { imageUrl: string } |
    { imageUrl: string; text: string } |
    { recipeId: string; title: string; description: string, cover: string, price: string }
  )[];
  generatedImageUrl?: string;
  onPressCopy?: (message: string) => void;
}
type ChatMessage = { message: string; type: string; };
type ImageMessage = { imageUrl: string; };
type ImageTextMessage = { imageUrl: string; text: string; };
type RecipeMessage = { recipeId: string; title: string; description: string; cover: string; price: string; };

type ChatHistoryItem = ChatMessage | ImageMessage | ImageTextMessage | RecipeMessage;

const ChatHistory = forwardRef<ScrollView, ChatHistoryProps>(({ chatHistory, generatedImageUrl, onPressCopy }, ref,) => {
  return (
    <ScrollView 
     ref={ref}
     style={styles.container}
     showsVerticalScrollIndicator={false}
     >
      {generatedImageUrl && (
        <Image
          key="generated-image"
          source={{ uri: generatedImageUrl }}
          style={styles.image}
          onError={(e) => console.log('Error al cargar la imagen generada', e.nativeEvent.error)}
        />
      )}
      {chatHistory.map((entry, index) => {
        if ('message' in entry && 'type' in entry) {
          return <ChatMessage key={index} message={entry.message} isUserMessage={entry.type === 'user'} onPressCopy={() => onPressCopy(entry.message)} />;
        } else if ('text' in entry) {
          return (
            <React.Fragment key={index}>
              <Image
                source={{ uri: entry.imageUrl }}
                style={styles.image}
                resizeMode='cover'
                onError={(e) => console.log('Error al cargar la imagen', e.nativeEvent.error)}
              />
              <ChatMessage
                message={entry.text}
                isUserMessage={false}
                onPressCopy={() => onPressCopy(entry.text)}
              />
            </React.Fragment>
          );
        } else if ('recipeId' in entry) {
          // Manejo de recetas
          return <RecipiesOrden
            key={index}
            item={{
              cover: entry.cover,
              name: entry.title,
              price: entry.price,
              qty: 0,
              id: entry.recipeId,
              business_name: "Business Name"
            }}
          />;
        } else if ('imageUrl' in entry) {
          // Manejo de imágenes
          return (
            <Image
              key={index}
              source={{ uri: entry.imageUrl }}
              style={styles.image}
              resizeMode='cover'
              onError={(e) => console.log('Error al cargar la imagen', e.nativeEvent.error)}
            />
          );
        }
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: responsiveFontSize(scale(200)),
    height: responsiveFontSize(scale(200)),
    resizeMode: 'cover',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: SIZES.radius
  },
});

export default ChatHistory;