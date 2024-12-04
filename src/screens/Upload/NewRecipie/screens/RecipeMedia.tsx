import { memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@/src/components/native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../components/Layout";
import { Buttons, FlexContainer, Hero, IsLoading, LineDivider } from "@/src/components/custom";
import { SIZES } from "@/src/constants/theme";
import { addDraftService } from "../../../../services/recipes";
import { useUploadMedia } from "@/src/hooks";
import { useDispatch } from "react-redux";
import { resetProgress, resetUploadState } from "@/src/redux/slides/uploadSlice";
import { Covers } from "../components/Utils";
import i18next from "../../../../Translate";

const RecipeMedia = memo(() => {
  const navigation = useNavigation();
  const { setValue, watch } = useFormContext();
  const values = watch();
  const dispatch = useDispatch();

  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const { uploadMedia, isLoading: Loading, photos } = useUploadMedia();

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
      const updatedKeys = [...values.keys, ...photos];
      setValue("keys", updatedKeys, { shouldValidate: true, shouldDirty: true });

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
    <Layout title="" href="RecipeDetails" disabled={values.keys.length === 0}>
      <LineDivider variant="primary" lineStyle={styles.lineStyle} />

      <Hero label={i18next.t("Empecemos ahora!")} sublabel={i18next.t("Upload cover for recipe")} />

      <FlexContainer style={{ alignItems: "center" }}>
        <Covers data={values.keys} ShowDivider={false} />
        {Loading && <IsLoading />}
        <Buttons
          label={i18next.t("Upload Media")}
          onPress={pickImage}
          disabled={isSubmittingLocal || Loading}
          variant={isSubmittingLocal || Loading ? "disabled" : "primary"}
          color={isSubmittingLocal || Loading ? "primary" : "dark"}
        />

        <Buttons
          label={i18next.t("Drafts")}
          onPress={() => navigation.navigate("RecipeDrafts")}
          disabled={isSubmittingLocal || Loading}
          containerButtons={styles.containerButtonss}
          variant={isSubmittingLocal || Loading ? "disabled" : "transparent"}
        />
        <Buttons
          label={i18next.t("Delete All")}
          onPress={() => {
            console.log("Delete All");
            dispatch(resetUploadState());
            setValue("keys", []);
          }}
          disabled={isSubmittingLocal || Loading}
          containerButtons={styles.containerButtonss}
          variant={isSubmittingLocal || Loading ? "disabled" : "error"}
        />
      </FlexContainer>
    </Layout>
  );
});

const styles = StyleSheet.create({
  lineStyle: {
    marginBottom: SIZES.gapLarge,
  },
  containerButtonss: {
    width: "30%",
  },
});

export default RecipeMedia;
