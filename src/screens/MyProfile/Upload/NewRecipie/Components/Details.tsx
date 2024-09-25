import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getListCategoriesService, getListTypesService, getVariantsByRecipeService, onCompleteService, onSaveDraftService } from "../../../../../services/recipes";
import { ButtonAcces, Container, FlexContainer, InputLabel, IsLoading, Typography } from "../../../../../components/custom";
import { SafeAreaView } from "../../../../../components/native";
import { useTheme } from "../../../../../hooks";
import ThreeIcons from "../../../../../components/custom/Bar/ThreeIcons";
import { FONTS, SIZES } from "../../../../../constants/theme";
import { RootState } from "../../../../../redux/store";
import { useSelector } from "react-redux";
import { formatCurrency, getCurrencyByCountryCode } from "../../../../../utils/formatCurrency";
import { Covers } from "./Utils";

const Details = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { BackgroundMain } = useTheme();
  const { setValue, watch } = useFormContext();
  const {
   user
  } = useSelector((state: RootState) => state.auth);
  
  const values = watch();

  const onSubmit = async () => {
    const response = await onCompleteService(values.id);
    if (response.success) {
      Alert.alert("Receta agregada con exito!", "Sigue creando recetas");

      // setTimeout(() => {
      //   navigation.navigate("TabsNavigator");
      // }, 3000);
    }
  };

  const onSaveDraft = async (body: object) => {
    const response = await onSaveDraftService({ id: values.id, ...body });
    if (response.success) {
      console.log("Saved with success...");
    }
  };

  // Resume, categories, foodTypes and variants
  const categories = useQuery({
    queryKey: ["recipe-list-categories", values.id],
    queryFn: getListCategoriesService,
  });

  const foodTypes = useQuery({
    queryKey: ["recipe-list-types", values.id],
    queryFn: getListTypesService,
  });

  const variants = useQuery({
    queryKey: ["recipe-variants-component", values.id],
    queryFn: getVariantsByRecipeService,
  });

  return (
    <SafeAreaView style={[styles.container,{
      backgroundColor: BackgroundMain
    }]}>
      <ThreeIcons 
      showBack={false}
      label="New Recipe"
      />
      <ScrollView>
      <FlexContainer newStyle={styles.container}>
        <Covers data={values.uri}/>
        <InputLabel
        label="Recipe Name"
          placeholder="Delicious Recipe Name"
          value={values.name}
          onChangeText={(txt) => {
            setValue("name", txt);
            onSaveDraft({
              name: txt,
            });
          }}
        />
        <InputLabel
          placeholder="Describe your recipe and help your customers understand your recipe"
          value={values.description}
          onChangeText={(txt) => {
            setValue("description", txt);
            onSaveDraft({
              description: txt,
            });
          }}
          labelStyle={styles.labelDescription}
          inputStyle={styles.labelDescription}
        />
        
        <ButtonAcces
        label="Categories"
        onPress={() => navigation.navigate("RecipeCategories")}
        showAppendBottom={true}
        ShowLineDivider={false}
        // append={categories.isLoading ? (
        //   <IsLoading />
        // ) : (
        //   categories.data.list.map((row: any) => {
        //     if (row.selected) {
        //       return <Typography variant='SubDescription'>{row.name}</Typography>;
        //     } else {
        //       return null;
        //     }
        //   })
        // )}
        />
{/* 
        <InputLabel
          placeholder={`${getCurrencyByCountryCode(user?.country)} ${"0"}`}
          keyboardType="numeric"
          value={values.price}
          onChangeText={(txt) => {
            setValue("price", txt);
            onSaveDraft({
              price: txt,
            });
          }}
        /> */}

        {/* <TouchableOpacity
          style={styles.buttonTypeList}
          onPress={() => navigation.navigate("RecipeType")}
        >
          <Text style={styles.buttonTypeListText}>Food Type</Text>

          {foodTypes.isLoading ? (
            <ActivityIndicator />
          ) : (
            foodTypes.data.list.map((row: any) => {
              if (row.selected) {
                return <Text>{row.name}</Text>;
              }
            })
          )}
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.buttonTypeList}
          onPress={() => navigation.navigate("RecipeAddDish")}
        >
          <Text style={styles.buttonTypeListText}>Side Dish Everyone</Text>

          {variants.isLoading ? (
            <ActivityIndicator />
          ) : (
            variants.data.resume.map((row: any) => (
              <Text key={row.id}>{row.title}, </Text>
            ))
          )}
        </TouchableOpacity> */}
        {/* <View style={styles.footer}>
          <Button
            title="Guardar cambios"
            onPress={onSubmit}
          />

          <Button
            title="Subir un post"
            onPress={() => {
              navigation.navigate("TabsNavigator");
            }}
            color="#000"
          />
        </View> */}
      </FlexContainer>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labelDescription: {
    ...FONTS.text14,
    height: SIZES.height / 8
  }
});