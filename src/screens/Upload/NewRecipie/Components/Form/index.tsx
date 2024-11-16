import { memo } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView, useNavigation } from "../../../../../components/native";
import { useFormContext } from "react-hook-form";
import { Buttons, Container, FlexContainer, Icons, LineDivider } from "../../../../../components/custom";
import { CloseIcon } from "../../../../../constants/IconsPro";
import { Covers } from "../Utils";
import { useTheme } from "../../../../../hooks";
import i18next from "../../../../../Translate";
import { FONTS, responsiveFontSize, SIZES } from "../../../../../constants/theme";
import {
  CategoriesSelector,
  FoodTypeSelector,
  PriceInput,
  RecipeDescriptionInput,
  RecipeNameInput,
  SideDishSelector,
} from "./Components";
import { useQuery } from "@tanstack/react-query";
import {
  getListCategoriesService,
  getListTypesService,
  getVariantsByRecipeService,
  publishRecipeService,
} from "../../../../../services/recipes";

const Details = memo(() => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
    reset,
  } = useFormContext();
  const navigation = useNavigation();
  const { Title } = useTheme();
  const values = watch();

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

  const onSubmit = async (data: any) => {
    if (!data.name) {
      Alert.alert("Error Nombre", "Agrega un nombre a esta receta!");
      return;
    }

    if (!data.description) {
      Alert.alert("Error Description", "Agrega una descripcion a esta receta!");
      return;
    }

    if (!data.price) {
      Alert.alert("Error Precio", "Agrega una precio a esta receta!");
      return;
    }

    if (categories.data.list.filter((row: any) => row.selected).length === 0) {
      Alert.alert("Error Categorias", "Selecciona la categoria de tu receta!");
      return;
    }

    if (foodTypes.data.list.filter((row: any) => row.selected).length === 0) {
      Alert.alert("Error Tipo de receta", "Selecciona un tipo de receta!");
      return;
    }

    const response = await publishRecipeService(data);

    console.log({ response });

    if (response.success) {
      reset();
      Alert.alert("Enhorabuena!", "Has completado la orden correctamente!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("RecipeMedia"),
        },
      ]);
    }
  };

  return (
    <Container
      label={i18next.t("New Recipe")}
      onPress={handleSubmit(onSubmit)}
      showHeader={false}
      showTwoIconsLabel={true}
      showBack={false}
    >
      <FlexContainer newStyle={styles.actions}>
        <Icons
          appendIcons={<CloseIcon color={Title} width={SIZES.icons} height={SIZES.icons} />}
          onPress={() => navigation.goBack()}
        />
        <Buttons
          label={i18next.t("Continue")}
          onPress={handleSubmit(onSubmit)}
          containerButtons={styles.containerButtonss}
          variantLabel={isSubmitting ? "disabled" : "secondary"}
          variant={isSubmitting ? "disabled" : "primary"}
          disabled={isSubmitting}
          loading={isSubmitting}
          labelStyle={{
            ...FONTS.semi16,
          }}
        />
      </FlexContainer>
      <LineDivider variant="primary" />
      <KeyboardAwareScrollView
        extraScrollHeight={responsiveFontSize(100)}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: SIZES.height / 10 }}
      >
        <FlexContainer newStyle={styles.container}>
          <Covers data={values.key} ShowDivider={true} />
          <RecipeNameInput setValue={setValue} value={values.name} />
          <RecipeDescriptionInput setValue={setValue} value={values.description} />
          <PriceInput setValue={setValue} value={values.price} />
          <CategoriesSelector categories={categories} navigation={navigation} />
          <LineDivider variant="primary" />
          <FoodTypeSelector foodTypes={foodTypes} navigation={navigation} />
          <LineDivider variant="primary" />
          <SideDishSelector variants={variants} navigation={navigation} />
        </FlexContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelDescription: {
    height: SIZES.height / 14,
  },
  actions: {
    flexDirection: "row",
    gap: responsiveFontSize(20),
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: SIZES.gapLarge,
    marginBottom: SIZES.gapLarge,
  },
  containerButtonss: {
    width: "30%",
  },
});

export default Details;
