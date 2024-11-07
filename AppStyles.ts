import { StyleSheet } from "react-native";
import { COLORS } from "./src/constants/theme";


const styles =  StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  loadingIndicator: {
    borderColor: COLORS.primary,
  },
  flexContainer: {
    flex: 1,
  },
  gestureHandlerRootView: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  textInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default styles