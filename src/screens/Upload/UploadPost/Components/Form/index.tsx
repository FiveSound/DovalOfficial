import { memo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert, // Asegúrate de importar Alert
} from "react-native";
import { useFormContext } from "react-hook-form";
import {
  Buttons,
  Container,
  FlexContainer,
  Icons,
  LineDivider,
  Perks,
  Typography,
} from "../../../../../components/custom";
import { Covers } from "../Utils";
import { KeyboardAwareScrollView, useNavigation } from "../../../../../components/native";
import Pers from "./Components/Pers";
import i18next from "../../../../../Translate";
import { CloseIcon } from "../../../../../constants/IconsPro";
import { FONTS, responsiveFontSize, SIZES } from "../../../../../constants/theme";
import { useTheme, useUploadMedia } from "../../../../../hooks";
import { PostDescriptionInput, PostNameInput } from "./Components";
import { iconsNative } from "../../../../../constants";
import { publishPostService } from "../../../../../services/posts";
import { useAppDispatch } from "../../../../../redux";
import { resetUploadState } from "../../../../../redux/slides/uploadSlice";

const InputLabel = (props: { label: string; href: string }) => {
  const navigation = useNavigation();
  const { Description } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(props.href)}
      style={{
        padding: SIZES.gapLarge,
        flexDirection: "row",
        alignItems: "center",
        gap: SIZES.gapLarge,
      }}
    >
      <Image source={iconsNative.People} />
      <Typography
        variant="H4title"
        newStyle={{
          ...FONTS.semi16,
          color: Description,
        }}
      >
        {props.label}
      </Typography>
    </TouchableOpacity>
  );
};

const PostDetails = memo(() => {
  const { watch, handleSubmit, setValue, reset } = useFormContext();
  const navigation = useNavigation();
  const { Title } = useTheme();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const values = watch();
  const { mediaURLs } = useUploadMedia();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: object) => {
    setLoading(true);

    try {
      const response = await publishPostService(data);

      if (response.success) {
        setSuccess(true);
        dispatch(resetUploadState());
        setTimeout(() => {
          setSuccess(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "MyTabs" }],
          });
        }, 1000);
      } else {
        Alert.alert("Error", "Hubo un problema al subir el post. Por favor, intenta nuevamente.", [{ text: "OK" }]);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert("Error", "Ocurrió un error inesperado. Por favor, intenta nuevamente.", [{ text: "OK" }]);
    } finally {
      setLoading(false);
      reset();
    }
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
          appendIcons={<CloseIcon color={Title} width={SIZES.icons} height={SIZES.icons} />}
          onPress={() => navigation.goBack()}
        />
        <Buttons
          label={i18next.t("Publish")}
          onPress={handleSubmit(onSubmit)}
          containerButtons={styles.containerButtonss}
          // variantLabel={disable ? 'disabled' : 'secondary'}
          // variant={disable ? 'disabled' : 'primary'}
          // disabled={disable}
          loading={loading}
        />
      </FlexContainer>
      <LineDivider variant="secondary" lineStyle={{ marginBottom: SIZES.gapLarge }} />

      <KeyboardAwareScrollView
        extraScrollHeight={responsiveFontSize(100)}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: SIZES.height / 10 }}
      >
        {success && <Perks label="Posts Publicado con exito" status="success" />}
        <FlexContainer newStyle={styles.container}>
          <Covers data={mediaURLs} ShowDivider={true} />
          <PostDescriptionInput setValue={setValue} onSaveDraft={onSaveDraft} value={values.description} />
          <FlexContainer newStyle={styles.persContainer}>
            <Pers label="Hashtags" navigation={navigation} />
            <Pers label="Tags" navigation={navigation} />
            <Pers label="Topics" navigation={navigation} />
          </FlexContainer>
          <LineDivider variant="secondary" />
          <PostNameInput setValue={setValue} onSaveDraft={onSaveDraft} value={values.name} />

          <InputLabel label="add recipe" href="Recipes" />
          {/* <LineDivider variant="primary" /> */}
          {/* 
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
          </View> */}
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
  persContainer: {
    flexDirection: "row",
    gap: SIZES.gapLarge,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: SIZES.gapLarge,
    paddingHorizontal: SIZES.gapLarge,
  },
});
