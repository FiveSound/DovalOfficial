import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { Covers } from "../Components/Utils";
import { Buttons, Container, FlexContainer, Icons, InputLabel, LineDivider, Perks } from "../../../../components/custom";
import { FONTS, responsiveHeight, SIZES } from "@/src/constants/theme";
import MoreOptions from "../Components/MoreOptions";
import { CloseIcon } from "@/src/constants/IconsPro";
import { KeyboardAwareScrollView, useNavigation } from "@/src/components/native";
import { useQuery } from "@tanstack/react-query";
import { getListCategoriesService, getListTypesService, getVariantsByRecipeService, onCompleteService } from "@/src/services/recipes";
import { Alert } from "react-native";
import i18next from "@/src/Translate";
import { styles } from "../Components/styles";
import { useTheme } from "@/src/hooks";

const QUERY_KEY = "recipe-variants-component";
const RecipeDetails = memo(() => {
  const { Title } = useTheme();
  const navigation = useNavigation();
  const { setValue, watch } = useFormContext();
  const values = watch();

  const categories = useQuery({
    queryKey: ['recipe-list-categories', values.id],
    queryFn: getListCategoriesService,
  });

  const selecCategories = categories.data?.list.some(
    (item: any) => item.selected,
  );

  const foodTypes = useQuery({
    queryKey: ['recipe-list-types', values.id],
    queryFn: getListTypesService,
  });

  const selecFooTypes = foodTypes.data?.list.some((item: any) => item.selected);

   const variants = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getVariantsByRecipeService(values.id),
    enabled: values.id ? true : false,
  });

  const disable =
    !values.name ||
    !values.description ||
    !values.price ||
    values.name.length === 0 ||
    values.description.length === 0 ||
    values.price.length === 0 ||
    !selecFooTypes ||
    (variants.data.resume && variants.data.resume.length === 0) ||
    !selecCategories;

  const onSubmit = async () => {
    const missingFields = [];

    if (!values.name || values.name.trim().length === 0) {
      missingFields.push('Nombre');
    }
    if (!values.description || values.description.trim().length === 0) {
      missingFields.push('Descripción');
    }
    if (!values.price || values.price.trim().length === 0) {
      missingFields.push('Precio');
    }
    if (!selecFooTypes) {
      missingFields.push('Tipos de comida');
    }
    if (variants.data.resume && variants.data.resume.length === 0) {
      missingFields.push('Acompañamientos');
    }
    if (!selecCategories) {
      missingFields.push('Categorías');
    }

    if (missingFields.length > 0) {
      Alert.alert(
        'Campos incompletos',
        `Por favor, completa los siguientes campos: ${missingFields.join(', ')}`,
      );
      return <Perks label={missingFields.join(', ')} status="error" />;
    }

   const response = await onCompleteService(values.id);
    console.log('response', response);
    if (response.success) {
      Alert.alert(
        'Receta agregada con éxito!',
        '¿Quieres crear otra receta o volver atrás?',
        [
          {
            text: 'Crear mas recetas',
            onPress: () => {},
          },
          {
            text: 'Volver atrás',
            onPress: () => navigation.goBack(),
          },
        ],
      );
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
          appendIcons={
            <CloseIcon color={Title} width={SIZES.icons} height={SIZES.icons} />
          }
          onPress={() => navigation.goBack()}
        />
        <Buttons
          label={i18next.t('Create Recipe')}
          onPress={onSubmit}
          containerButtons={styles.containerButtons}
          variantLabel={disable ? 'disabled' : 'secondary'}
          variant={disable ? 'disabled' : 'primary'}
          disabled={disable}
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
        label={i18next.t('Recipe Name')}
        placeholder={i18next.t('Delicious Recipe Name')}
        value={values.name}
        onChangeText={(txt) => {
          setValue("name", txt);
        }}
      />

      <InputLabel
        label={i18next.t('Price $')}
        placeholder={i18next.t('Price $')}
        value={values.price}
        onChangeText={(txt) => {
          setValue("price", txt);
        }}
      />

      <InputLabel
        placeholder={i18next.t('Describe your recipe and help your customers understand your recipe')}
        value={values.description}
        onChangeText={(txt) => {
          setValue("description", txt);
        }}
        labelStyle={{ height: SIZES.height / 14 }}
        inputStyle={{ height: SIZES.height / 14 }}
      />
      <MoreOptions/>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default RecipeDetails;
