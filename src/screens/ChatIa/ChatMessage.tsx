import { Image, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "../../hooks/useTheme";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../constants/theme";
import { AiChat02Icon, Copy01Icon, HeartAddIconStroke, HeartbreakIcon, HeartCheckIcon, VerifyIcons } from "../../constants/IconsPro";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { CLOUDFRONT } from "../../services";
import { Avatars, FlexContainer, Typography } from "../../components/custom";

interface ChatMessageProps {
  message: string;
  isUserMessage: boolean;
  onPressCopy: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUserMessage,
  onPressCopy
}) => {
  const { color, bgInput, borderInput } = useTheme();
  const [Like, setLike] = useState(true)
  const { user } = useAuth();
  const messageStyle = isUserMessage ? styles.userMessage : styles.aiMessage;
  const messageContainerStyle = isUserMessage ? styles.userMessageContainer : styles.aiMessageContainer;

  return (
    <FlexContainer
      newStyle={[
        {
          padding: SIZES.gapMedium,
          ...messageContainerStyle,
          backgroundColor: isUserMessage ? 'transparent' : bgInput,
          borderWidth: isUserMessage ? 0 : responsiveFontSize(1),
          borderColor: borderInput,
          borderRadius: SIZES.margin,
          margin: SIZES.gapSmall,
        },
        messageStyle,
      ]}
    >
      <FlexContainer
        variant="row"
        newStyle={{
          alignItems: "center",
          gap: SIZES.gapSmall,
          backgroundColor: 'transparent',
        }}
      >
        {isUserMessage ? (
          <Avatars 
          size='small'
          source={`${CLOUDFRONT}${user?.avatar}`}
          />
        ) : (
          <FlexContainer
          variant='row'
          newStyle={{
            width: SIZES.BtnWidth,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <FlexContainer 
          variant='row'
          newStyle={{
            alignItems: 'center',
            backgroundColor: 'transparent'
          }}>
          <AiChat02Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.primary}
          />     
              <Typography
          newStyle={{
            fontWeight: "bold",
            ...FONTS.h3,
            color: color
          }}
          variant="subtitle"
        >
          {!isUserMessage && "Doval ChatAi"}
        </Typography>
          </FlexContainer>
          <TouchableOpacity
          onPress={onPressCopy}>
          <Copy01Icon 
            width={SIZES.icons / 1.4}
            height={SIZES.icons / 1.4}
            color={color}/>
          </TouchableOpacity>
          </FlexContainer>
        )}
       {isUserMessage && 
        <Typography
        newStyle={{
          fontWeight: "bold",
          ...FONTS.h3,
          color: color
        }}
        variant="subtitle"
      >
        {isUserMessage && user?.name || 'Tu'}
      </Typography>}
      </FlexContainer>

      <Typography
      onPress={() => onPressCopy(message)} 
        newStyle={{
          marginTop: SIZES.gapSmall,
          // width: "auto",
          // color: color
        }}
        variant="SubDescription"
      >
        {message}
      </Typography>

      {!isUserMessage && 
      <TouchableOpacity
      onPress={() => {
        setLike(!Like)
      }}
      >
       {Like ?  <HeartAddIconStroke 
        width={SIZES.icons / 1.4}
        height={SIZES.icons / 1.4}
        color={color}
      /> :
      
      <HeartCheckIcon 
      width={SIZES.icons / 1.4}
      height={SIZES.icons / 1.4}
      color={COLORS.error}
    />}
      </TouchableOpacity>
      }
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  userMessage: {},
  aiMessage: {},
  userMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: 'transparent',
    width: SIZES.width
  },
  aiMessageContainer: {
    alignSelf: "flex-start",
    width: SIZES.width / 1.03,
  },
});

export default ChatMessage;