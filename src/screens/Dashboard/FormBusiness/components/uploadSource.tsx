import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../../../components/native";
import { useUploadMedia } from "../../../../hooks";
import { FlexContainer, IsLoading, Typography } from "../../../../components/custom";

const UploadSource = () => {
  const { uploadMedia, isLoading, progress, error, thumbnailURLs } = useUploadMedia();

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de acceso a la galería denegado");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedImage = [
          {
            uri: result.assets[0].uri,
            type: "photo",
          },
        ];
        uploadMedia(pickedImage);
        console.log("thumbnailURLs", thumbnailURLs);
      }
    } catch (err) {
      console.error("Error al seleccionar la imagen:", err);
    } finally {
    }
  };

  return (
    <FlexContainer>
      <Button onPress={handlePickImage} title={thumbnailURLs ? "Cambiar Imagen" : "Seleccionar Imagen"} />
      {isLoading && <IsLoading />}
      <Typography variant="H4title">{error}</Typography>
    </FlexContainer>
  );
};

export default UploadSource;
