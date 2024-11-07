import { FormProvider, useForm } from 'react-hook-form';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { getDraftService } from '../../../services/recipes';
import { IsLoading, LoadingScreen } from '../../../components/custom';
import {
  Categories,
  Details,
  Drafts,
  FoodTypes,
  Media,
  Variants,
} from './Components';
import { TabBarVisibilityContext } from '../../../context/TabBarVisibilityContext';
import { useContext, useEffect } from 'react';
import Hashtags from './Components/Hashtags';

const Stack = createStackNavigator();

type Props = {
  route?: {
    params: {
      id: number;
    };
  };
};

type ContainerProps = {
  defaultValues?: object;
};

const Container = ({ defaultValues }: ContainerProps) => {
  const methods = useForm({ defaultValues });
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="Media"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Media" component={Media} />
        <Stack.Screen name="RecipeDetails" component={Details} />
        <Stack.Screen name="RecipeDrafts" component={Drafts} />
        <Stack.Screen name="Hashtags" component={Hashtags} />
        <Stack.Screen name="RecipeType" component={FoodTypes} />
        <Stack.Screen name="RecipeAddDish" component={Variants} />
      </Stack.Navigator>
    </FormProvider>
  );
};

const NewPosts = (props: Props) => {

    return <Container />;

};

export default NewPosts;
