import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatIa from '../screens/ChatIa';

const Stack = createNativeStackNavigator();
const StackChatIa = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ChatIa"
    >
      <Stack.Screen name="ChatIa" component={ChatIa} />
    </Stack.Navigator>
  );
};

export default StackChatIa;
