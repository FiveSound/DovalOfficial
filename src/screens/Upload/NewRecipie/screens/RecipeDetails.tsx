import { memo } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { Covers } from "../components/Utils";
import {
  Buttons,
  Container,
  FlexContainer,
  Icons,
  InputLabel,
  LineDivider,
  Perks,
} from "../../../../components/custom";
import { FONTS, responsiveHeight, SIZES } from "@/src/constants/theme";
import MoreOptions from "../components/MoreOptions";
import { CloseIcon } from "@/src/constants/IconsPro";
import { KeyboardAwareScrollView, useNavigation } from "@/src/components/native";
import { publishRecipeService } from "@/src/services/recipes";
import { Alert } from "react-native";
import i18next from "@/src/Translate";
import { styles } from "../components/styles";
import { useTheme } from "@/src/hooks";

const RecipeDetails = memo(() => {
  const { Title } = useTheme();
  const navigation = useNavigation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, isSubmitting },
    reset,
  } = useFormContext();
  const values = watch();

  const onSubmit = async (data: FieldValues) => {
    const response = await publishRecipeService(data);

    if (response.error) {
      Alert.alert("Error al publicar la receta", response.message);
      return <Perks label={response.message} status="error" />;
    }

    if (response.success) {
      reset();
      Alert.alert("Receta agregada con éxito!", "¿Quieres crear otra receta o volver atrás?", [
        {
          text: "Crear mas recetas",
          onPress: () => {},
        },
        {
          text: "Volver atrás",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <Container
      // onPress={onSubmit}
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
          label={i18next.t("Create Recipe")}
          onPress={handleSubmit(onSubmit)}
          containerButtons={styles.containerButtons}
          variantLabel={isDirty || isSubmitting ? "disabled" : "secondary"}
          variant={!isDirty || isSubmitting ? "disabled" : "primary"}
          disabled={!isDirty || isSubmitting}
          labelStyle={{
            ...FONTS.semi16,
          }}
        />
      </FlexContainer>
      <LineDivider variant="primary" />
      <KeyboardAwareScrollView
        extraScrollHeight={responsiveHeight(100)}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: SIZES.height / 10 }}
      >
        <Covers data={values.keys} ShowDivider={false} />

        <InputLabel
          label={i18next.t("Recipe Name")}
          placeholder={i18next.t("Delicious Recipe Name")}
          value={values.name}
          onChangeText={(txt) => {
            setValue("name", txt, { shouldDirty: true });
          }}
        />

        <InputLabel
          label={i18next.t("Price $")}
          placeholder={i18next.t("Price $")}
          value={values.price}
          onChangeText={(txt) => {
            setValue("price", txt, { shouldDirty: true });
          }}
        />

        <InputLabel
          placeholder={i18next.t("Describe your recipe and help your customers understand your recipe")}
          value={values.description}
          onChangeText={(txt) => {
            setValue("description", txt, { shouldDirty: true });
          }}
          labelStyle={{ height: SIZES.height / 14 }}
          inputStyle={{ height: SIZES.height / 14 }}
        />
        <MoreOptions />
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default RecipeDetails;
