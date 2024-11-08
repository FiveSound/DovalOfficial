import { memo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
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
import Pers from './Components/Pers';
import i18next from '../../../../../Translate';
import { CloseIcon } from '../../../../../constants/IconsPro';
import {
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../../constants/theme';
import { useTheme } from '../../../../../hooks';
import { PostDescriptionInput, RecipeNameInput } from './Components';
import { iconsNative } from '../../../../../constants';
import { publishPostService } from '../../../../../services/posts';

const InputLabel = (props: { label: string; href: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(props.href)}
      style={{
        marginHorizontal: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Image source={iconsNative.People} />
      <Text style={{ fontSize: 17 }}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const PostDetails = memo(() => {
  const { watch, handleSubmit, setValue } = useFormContext();
  const navigation = useNavigation();
  const { Title } = useTheme();

  const values = watch();

  const onSubmit = async (data: object) => {
    const response = await publishPostService(data);
    console.log({ response });
  };

  const onSaveDraft = async (body: object) => {
    // const response = await onSaveDraftService({ id: values.id, ...body });
    // if (response.success) {
    //   console.log('Guardado con éxito...');
    // }
  };

  return (
    <Container
      label="New Post"
      // onPress={handleSubmit(onSubmit)}
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
          onPress={handleSubmit(onSubmit)}
          containerButtons={styles.containerButtonss}
          // variantLabel={disable ? 'disabled' : 'secondary'}
          // variant={disable ? 'disabled' : 'primary'}
          // disabled={disable}
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
          <PostDescriptionInput
            setValue={setValue}
            onSaveDraft={onSaveDraft}
            value={values.description}
          />
          <FlexContainer newStyle={styles.persContainer}>
            <Pers label="Hashtags" navigation={navigation} />
            <Pers label="Tags" navigation={navigation} />
            <Pers label="Topics" navigation={navigation} />
          </FlexContainer>
          <LineDivider variant="secondary" />
          <RecipeNameInput
            setValue={setValue}
            onSaveDraft={onSaveDraft}
            value={values.name}
          />

          <InputLabel label="Add Recipie" href="Recipes" />
          <LineDivider variant="primary" />

          <View
            style={{
              marginHorizontal: 10,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image source={iconsNative.Comments} style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 20 }}>Allow comments</Text>
            </View>
            <Switch
              value={values.comments}
              onValueChange={value => setValue('comments', value)}
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Cambia el tamaño con scaleX y scaleY
              }}
            />
          </View>
        </FlexContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: responsiveFontSize(20),
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SIZES.gapLarge,
    marginBottom: SIZES.gapLarge,
  },
  containerButtonss: {
    width: '30%',
  },
  persContainer: {
    flexDirection: 'row',
    gap: SIZES.gapLarge,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: SIZES.gapLarge,
    paddingHorizontal: SIZES.gapLarge,
  },
});
