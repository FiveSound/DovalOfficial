import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormContext } from "react-hook-form";
import { addDraftService } from "../../../../../services/recipes";
import {
  Buttons,
  Container,
  FlexContainer,
  IsLoading,
  LineDivider,
  ProgressBar,
} from "../../../../../components/custom";
import useUploadMedia from "../../../../../hooks/useUploadMedia";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../../constants/theme";
import { Covers } from "../Utils";
import { useNavigation } from "../../../../../components/native";
import { useTheme } from "../../../../../hooks";
import { useDispatch } from "react-redux";
import { resetProgress, resetUploadState } from "../../../../../redux/slides/uploadSlice";
import i18next from "../../../../../Translate";

const Media = () => {
  const dispatch = useDispatch();
  const { setValue, watch } = useFormContext();
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const navigation = useNavigation();
  const { Title, Description } = useTheme();
  const {
    uploadMedia,
    isLoading: Loading,
    progress,
    mediaURLs,
    thumbnailURLs,
    photos,
    videos,
    error,
  } = useUploadMedia();

  const keys = watch("key") || [];

  const pickImage = async () => {
    setIsSubmittingLocal(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const files = result.assets;

      const media = files.map((file) => {
        if (!file.fileName) {
          const uriParts = file.uri.split("/");
          file.fileName = uriParts[uriParts.length - 1];
        }

        return {
          uri: file.uri,
          type: "photo" as const,
        };
      });

      try {
        uploadMedia(media);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
    setIsSubmittingLocal(false);
  };

  useEffect(() => {
    if (photos.length > 0) {
      const updatedKeys = [...keys, ...photos];
      setValue("key", updatedKeys, { shouldValidate: true, shouldDirty: true });

      addDraftService({
        cover: updatedKeys,
      })
        .then((response) => {
          console.log("response addDraftService", response);
          if (response.success) {
            console.log("Guardado con éxito...");
            setValue("id", response.id);
          }
          // Reset progress
          dispatch(resetProgress());
        })
        .catch((error) => {
          console.error("Add Draft Failed", error);
          // Reset progress even if adding draft fails
          dispatch(resetProgress());
        });
    }
  }, [photos]);

  return (
    <Container showBack={true} showHeader={true} label={i18next.t("Upload Media")} style={styles.container}>
      <LineDivider variant="primary" lineStyle={styles.lineStyle} />
      <FlexContainer newStyle={styles.actions}>
        <Buttons
          label={i18next.t("Continue")}
          onPress={() => navigation.navigate("RecipeDetails")}
          disabled={keys.length === 0}
          variant={keys.length === 0 ? "disabled" : "primary"}
          variantLabel={keys.length === 0 ? "disabled" : "secondary"}
          containerButtons={styles.containerButtonss}
        />
      </FlexContainer>
      <FlexContainer>
        <Covers data={keys} ShowDivider={false} />
        <FlexContainer newStyle={styles.progressContainer}>
          {Loading && <IsLoading />}
          {mediaURLs.length === 0 && (
            <Buttons
              label={i18next.t("Upload Media")}
              onPress={pickImage}
              disabled={isSubmittingLocal || Loading}
              variant={isSubmittingLocal || Loading ? "disabled" : "primary"}
              labelStyle={styles.labelStyle}
              color={isSubmittingLocal || Loading ? "primary" : "dark"}
            />
          )}

          <Buttons
            label={i18next.t("Drafts")}
            onPress={() => navigation.navigate("RecipeDrafts")}
            containerButtons={styles.containerButtonss}
            variant="transparent"
          />

          {mediaURLs.length > 0 && (
            <Buttons
              label={i18next.t("Delete All")}
              onPress={() => {
                console.log("Delete All");
                dispatch(resetUploadState());
                setValue("key", []);
              }}
              // containerButtons={styles.containerButtonss}
              variant="error"
              variantLabel="error"
            />
          )}
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
};

export default Media;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  closeText: {
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    gap: responsiveFontSize(20),
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: SIZES.gapLarge,
    marginBottom: SIZES.gapLarge,
  },
  containerButtons: {
    width: SIZES.width / 3,
    backgroundColor: "transparent",
  },
  labelStyle: {
    color: COLORS.primary,
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: SIZES.gapLarge,
    gap: SIZES.gapLarge,
  },
  lineStyle: {
    marginBottom: SIZES.gapLarge,
  },
  containerButtonss: {
    width: "30%",
  },
  icon: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
  stylesMedia: {
    width: responsiveFontSize(140),
    height: responsiveFontSize(160),
  },
  stylesMain: {
    width: SIZES.width / 3,
    height: SIZES.height / 6,
    backgroundColor: "transparent",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
