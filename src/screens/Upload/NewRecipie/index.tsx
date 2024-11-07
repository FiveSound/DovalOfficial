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

const Stack = createStackNavigator();

type Props = {
  route?: {
    params: {
      id: number;
    };
  };
};

type ContainerProps = {
  defaultValues: object;
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
        initialRouteName="RecipeMedia"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="RecipeMedia" component={Media} />
        <Stack.Screen name="RecipeDetails" component={Details} />
        <Stack.Screen name="RecipeDrafts" component={Drafts} />
        <Stack.Screen name="RecipeCategories" component={Categories} />
        <Stack.Screen name="RecipeType" component={FoodTypes} />
        <Stack.Screen name="RecipeAddDish" component={Variants} />
      </Stack.Navigator>
    </FormProvider>
  );
};

const NewRecipie = ({ route }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['form-recipe-screen-new', route?.params?.id],
    queryFn: getDraftService,
  });

  if (isLoading || isFetching) return <LoadingScreen />;

  if (data) {
    return <Container defaultValues={{ ...data }} />;
  }
};

export default NewRecipie;
