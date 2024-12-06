import { memo } from "react";
import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeMedia from "./screens/RecipeMedia";
import RecipeDetails from "./screens/RecipeDetails";
import RecipeDrafts from "./screens/RecipeDrafts";
import RecipeCategories from "./screens/RecipeCategories";
import FoodTypes from "./screens/RecipeType";
import RecipeAddDish from "./screens/RecipeAddDish";
import { LoadingScreen } from "@/src/components/custom";
import { getDraftService } from "@/src/services/recipes";
import { SafeAreaView } from "@/src/components/native";

type defaultValues = {
  id: number | null;
  keys: any[];
  name: string;
  description: string;
  price: string;
  categories: any[];
  food_types: any[];
  ingredients: any[];
  instructions: any[];
  variants: any[];
  subvariants: any[];
};

const initialValues = {
  id: null,
  keys: [],
  name: "",
  description: "",
  price: "0",
  categories: [],
  food_types: [],
  ingredients: [],
  instructions: [],
  variants: [],
  subvariants: [],
};

const Stack = createStackNavigator();

const NewRecipe = memo(({ defaultValues }: { defaultValues: defaultValues }) => {
  const methods = useForm({ defaultValues: defaultValues });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator initialRouteName="RecipeMedia" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipeMedia" component={RecipeMedia} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        <Stack.Screen name="RecipeDrafts" component={RecipeDrafts} />
        <Stack.Screen name="RecipeCategories" component={RecipeCategories} />
        <Stack.Screen name="RecipeType" component={FoodTypes} />
        <Stack.Screen name="RecipeAddDish" component={RecipeAddDish} />
      </Stack.Navigator>
    </FormProvider>
  );
});

const Main = () => {
  const { params } = useRoute<any>();
  const QUERY_KEY = "form-recipe-screen";
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY, params?.id],
    queryFn: async () => {
      if (params?.id) {
        return await getDraftService(params.id);
      }
      return null;
    },
    enabled: !!params?.id,
  });

  if (isLoading || isFetching) return <LoadingScreen />;

    if (isError) return <Text>An ocurred error!</Text>;

    if (data) {
      return <NewRecipe defaultValues={{ ...data }} />;
    }
  

  return (
    <>
      <NewRecipe defaultValues={initialValues} />
    </>
  );
};


export default Main;
