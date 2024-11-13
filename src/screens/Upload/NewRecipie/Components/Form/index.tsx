import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import {
  Buttons,
  Container,
  FlexContainer,
  Icons,
  LineDivider,
  Perks,
} from '../../../../../components/custom';
import { Covers } from '../Utils';
import {
  KeyboardAwareScrollView,
  useNavigation,
} from '../../../../../components/native';
import {
  CategoriesSelector,
  FoodTypeSelector,
  PriceInput,
  RecipeDescriptionInput,
  RecipeNameInput,
  SideDishSelector,
} from './Components';
import {
  getListCategoriesService,
  getListTypesService,
  getVariantsByRecipeService,
  onCompleteService,
  onSaveDraftService,
} from '../../../../../services/recipes';
import {
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../../constants/theme';
import { styles } from '../Media/Media';
import i18next from '../../../../../Translate';
import { ArrowLeft, CloseIcon } from '../../../../../constants/IconsPro';
import { useTheme } from '../../../../../hooks';

const Details = () => {
  const { Title } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const values = watch();
  console.log('values', values);
  
  const onSaveDraft = async (body: object) => {
    const response = await onSaveDraftService({ id: values.id, ...body });
    if (response.success) {
      console.log('Guardado con éxito...');
    }
  };

  // Queries
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
    queryKey: ['recipe-variants-component', values.id],
    queryFn: getVariantsByRecipeService,
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
      setIsLoading(true);
      try {
        const missingFields: string[] = [];
    
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
            i18next.t('Incomplete fields'),
            `${i18next.t('Please complete the following fields:')} ${missingFields.join(', ')}`,
          );
          return <Perks label={missingFields.join(', ')} status="error" />;
        }
    
        const response = await onCompleteService(values.id);
        console.log('response', response);
        if (response.success) {
          Alert.alert(
            i18next.t('Recipe added successfully!'),
            i18next.t('Do you want to create another recipe or go back?'),
            [
              {
                text: i18next.t('Create more recipes'),
                onPress: () => {
                  // Add your logic here, e.g., reset form
                },
              },
              {
                text: i18next.t('Go back'),
                onPress: () => navigation.navigate('Feed'),
              },
            ],
          );
        } else {
          Alert.alert(
            i18next.t('Error'),
            i18next.t('There was an issue adding the recipe. Please try again.'),
          );
        }
      } catch (error) {
        console.error('Error during onSubmit:', error);
        Alert.alert(
          i18next.t('Unexpected Error'),
          i18next.t('An unexpected error occurred. Please try again later.'),
        );
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Container
      label={i18next.t('New Recipe')}
      onPress={onSubmit}
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
          label={i18next.t('Continue')}
          onPress={onSubmit}
          containerButtons={styles.containerButtonss}
          variantLabel={disable ? 'disabled' : 'secondary'}
          variant={disable ? 'disabled' : 'primary'}
          disabled={disable}
          loading={isLoading}
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
          <RecipeNameInput
            setValue={setValue}
            onSaveDraft={onSaveDraft}
            value={values.name}
          />
          <RecipeDescriptionInput
            setValue={setValue}
            onSaveDraft={onSaveDraft}
            value={values.description}
          />
          <PriceInput
            setValue={setValue}
            onSaveDraft={onSaveDraft}
            value={values.price}
          />
          <CategoriesSelector categories={categories} navigation={navigation} />
          <LineDivider variant="primary" />
          <FoodTypeSelector foodTypes={foodTypes} navigation={navigation} />
          <LineDivider variant="primary" />
          <SideDishSelector variants={variants} navigation={navigation} />
        </FlexContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Details;
