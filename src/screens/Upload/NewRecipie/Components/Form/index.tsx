import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createStackNavigator } from "@react-navigation/stack";
import { Details, Media } from "../../../UploadPost/Components";
import Drafts from "../Drafts";
import Categories from "../Categories";
import FoodTypes from "../FoodTypes";
import Variants from "../Variants";

const Stack = createStackNavigator();

const Form = memo(({ defaultValues }: { defaultValues: any }) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <Stack.Navigator initialRouteName="RecipeMedia" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipeMedia" component={Media} />
        <Stack.Screen name="RecipeDetails" component={Details} />
        <Stack.Screen name="Drafts" component={Drafts} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="FoodTypes" component={FoodTypes} />
        <Stack.Screen name="Variants" component={Variants} />
      </Stack.Navigator>
    </FormProvider>
  );
});

const Main = () => {
  return <Form defaultValues={{}} />;
};

export default Main;
