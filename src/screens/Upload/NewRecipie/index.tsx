import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Media } from "./Components";

const Stack = createStackNavigator();

type Props = {};

const NewRecipe = memo((defaultValues: Props) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator initialRouteName="RecipeMedia" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipeMedia" component={Media} />
      </Stack.Navigator>
    </FormProvider>
  );
});

export default NewRecipe;
