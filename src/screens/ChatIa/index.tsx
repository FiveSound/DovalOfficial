import React, { useRef, useEffect, useCallback, useMemo, useState, useContext } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useChatReducer } from "../../hooks/useChatReducer";
import LayoutIa from "./LayoutIa";
import ChatHistory from "./ChatHistory";
import { responsiveFontSize, SIZES } from "../../constants/theme";
import * as Clipboard from "expo-clipboard";
import SectionsPrompt from "./SectionsPrompt";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import { useLocation } from "../../hooks/useLocation";
import { CLOUDFRONT } from "../../services";
import i18next from "../../Translate";
import { FlexContainer, IsLoading, ScreenEmpty } from "../../components/custom";
import { Ilustrations } from "../../constants";
import { TabBarVisibilityContext } from "../../context/TabBarVisibilityContext";

interface ExploreItem {
  id: number;
  label: string;
  description: string;
}

const ChatIa = () => {
  const { state, dispatch } = useChatReducer();
  const { userInput, isLoading, chatHistory, generatedImageUrl } = state;
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [exploreData, setExploreData] = useState<ExploreItem[]>([]);
  const [dataSalud, setDataSalud] = useState<ExploreItem[]>([]);
  const [Loading, setLoading] = useState(true);
  const promps = 'Top 10 recetas mas populares'
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(true);

    return () => {
      setTabBarVisible(false);
    };
  }, [setTabBarVisible]);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) return;
    startLoadingAndAddUserMessage(userInput);
    const tempMessageId = Date.now().toString();
    console.log(`Mensaje temporal ID: ${tempMessageId}`, userInput);
    addTemporaryResponse(tempMessageId);

    try {
      const startTime = Date.now();
      const respuestaCompleta = ''
      // const respuestaCompleta = await handleTextRequest(userInput, chatHistory);
      const endTime = Date.now();
      console.log(
        "Respuesta completa de handleTextRequest:",
        respuestaCompleta
      );
      console.log(`Tiempo de respuesta: ${endTime - startTime} ms`);
      updateChatMessage(tempMessageId, respuestaCompleta);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      handleRequestError(tempMessageId);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      clearUserInput();
    }
  }, [userInput, dispatch, chatHistory]);

  const startLoadingAndAddUserMessage = (userInput: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "ADD_TO_CHAT_HISTORY",
      payload: { type: "user", message: userInput },
    });
  };

  const addTemporaryResponse = (tempMessageId: string) => {
    dispatch({
      type: "ADD_TO_CHAT_HISTORY",
      payload: {
        type: "ai",
        message: "Esperando respuesta...",
        tempId: tempMessageId,
      },
    });
  };

  const updateChatMessage = (tempMessageId: string, message: string) => {
    dispatch({
      type: "UPDATE_CHAT_MESSAGE",
      payload: { tempId: tempMessageId, message },
    });
  };

  const handleRequestError = (tempMessageId: string) => {
    dispatch({
      type: "UPDATE_CHAT_MESSAGE",
      payload: {
        tempId: tempMessageId,
        message: "Error al procesar la solicitud. Por favor, intenta de nuevo.",
      },
    });
  };

  const clearUserInput = () => {
    dispatch({ type: "SET_USER_INPUT", payload: "" });
  };

  const handleUserInput = (text: string) => {
    dispatch({ type: "SET_USER_INPUT", payload: text });
  };

  const ClearChat = () => {
    dispatch({ type: "CLEAR_CHAT" });
  };

  const transformedChatHistory = useMemo(() => {
    return chatHistory.map(chat => ({
      ...chat,
      timestamp: new Date(chat.timestamp).toLocaleTimeString(),
    }));
  }, [chatHistory]);

  const handlePressItem = useCallback(
    (item: any) => {
      const message = `${item.label} ${item.description}`;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      handleUserInput(message);
      handleSubmit();
    },
    [handleUserInput, handleSubmit]
  );



  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollViewRef.current?.scrollToEnd({ animated: true });
  //   }, 1000);
  // }, [transformedChatHistory.length]);

  // useEffect(() => {
  //   const updateExploreData = async () => {
  //     if (!country) {
  //       console.log("Country is not set yet.");
  //       return;
  //     }
  //       const fetchData = [
  //       // fetchDynamicExploreData(chatHistory, country).then(data => setExploreData(data)).catch(err => console.error("Error fetching general explore data:", err)),
  //       fetchDynamicExploreData(chatHistory, promps).then(data => setDataSalud(data)).catch(err => console.error("Error fetching health data:", err)),
  //     ];
  
  //     await Promise.all(fetchData);
  //     setLoading(false);
  //   };
  
  //   updateExploreData();
  // }, [user, chatHistory]);

  return (
    <LayoutIa
      labelHeader={user?.name || ""}
      userInput={userInput}
      isLoading={isLoading}
      handleUserInput={handleUserInput}
      handleSubmit={handleSubmit}
      ClearChat={ClearChat}
      source={`${CLOUDFRONT}${user?.avatar}`}
      ShowAvatar={transformedChatHistory.length === 0 ? true : false}>
      {transformedChatHistory.length === 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <FlexContainer
            newStyle={{
              flex: 1,
              backgroundColor: "transparent",
              gap: SIZES.gapMedium,
              alignItems: "center",
              margin: SIZES.margin,
            }}>

            <ScreenEmpty 
              Lottiew={false}
              // ImgWidth={SIZES.width}
              // ImgHeigth={SIZES.height / 2}
              // source={Ilustrations.Hello}
              labelPart1={i18next.t('Hello, how can I help you?')}
              subLabel={i18next.t('You can ask me anything about gastronomy!')}
              ShowButton={false}
            />
          </FlexContainer>
        </ScrollView>
      ) : (
        <ChatHistory
          chatHistory={transformedChatHistory}
          generatedImageUrl={generatedImageUrl || ""}
          ref={scrollViewRef}
          onPressCopy={async (message: string) => {
            await Clipboard.setStringAsync(message);
          }}
        />
      )}
      {isLoading && (
        <IsLoading
          label={i18next.t('Writing...')}
          showLabel={true}
        />
      )}
    </LayoutIa>
  );
};

export default ChatIa;