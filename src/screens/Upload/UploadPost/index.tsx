import { FormProvider, useForm } from 'react-hook-form';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Details,
  Drafts,
  Media,
  Hashtags,
  Tags,
  Topics,
  Recipes,
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

const defaultValues = {
  id: null,
  title: '',
  description: '',
  hashtags: [],
  tags: [],
  topics: [],
  recipeID: null,
  comments: true,
};

const NewPosts = () => {
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
        initialRouteName="PostMedia"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="PostMedia" component={Media} />
        <Stack.Screen name="PostDetails" component={Details} />
        <Stack.Screen name="PostDrafts" component={Drafts} />
        <Stack.Screen name="Hashtags" component={Hashtags} />
        <Stack.Screen name="Tags" component={Tags} />
        <Stack.Screen name="Topics" component={Topics} />
        <Stack.Screen name="Recipes" component={Recipes} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default NewPosts;
