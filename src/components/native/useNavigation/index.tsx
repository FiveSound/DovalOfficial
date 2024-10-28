import {
  useNavigation as useReactNavigation,
  NavigationProp,
} from '@react-navigation/native';

const useNavigation = () => {
  return useReactNavigation<NavigationProp<any>>();
};

export default useNavigation;
