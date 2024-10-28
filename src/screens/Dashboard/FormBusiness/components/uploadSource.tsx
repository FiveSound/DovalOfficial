import React from 'react';
import { Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Button, View, Text, TouchableOpacity } from '../../../../components/native';
import { useUploadMedia } from '../../../../hooks';
import { FlexContainer, IsLoading } from '../../../../components/custom';
import { Upload05Icon } from '../../../../constants/IconsPro';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';

type Props = {
  control: any;
  name: string;
  placeholder: string;
  required?: boolean;
  setValue: any;
};

const UploadSource = ({ setValue }: Props) => {
  const { uploadMedia, isLoading, progress, error, thumbnailURLs } =
    useUploadMedia();

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de acceso a la galería denegado');
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
            type: 'photo',
          },
        ];
        uploadMedia(pickedImage);
        setValue('imgIdentification', thumbnailURLs, { shouldDirty: true });
      }
    } catch (err) {
      console.error('Error al seleccionar la imagen:', err);
    }
  };

  return (
        <FlexContainer>
      <Text>{thumbnailURLs}</Text>
      <TouchableOpacity onPress={handlePickImage}>
        <Upload05Icon width={responsiveFontSize(60)} height={responsiveFontSize(60)} color={COLORS.primary}/>
        <Text>Seleccionar Imagen</Text>
      </TouchableOpacity>
      {isLoading && <IsLoading />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </FlexContainer>
  );
};

export default UploadSource;
