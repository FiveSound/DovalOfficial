import React from 'react';
import { Text, View, Button, Image } from '../../../../../components/native';
import { Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { useUploadMedia } from '../../../../../hooks';
import { IsLoading } from '../../../../../components/custom';
import { CLOUDFRONT } from '../../../../../services';

type Props = {
  control: any;
  name: string;
  placeholder: string;
  required?: boolean;
};

const UploadSource = ({ control, name, placeholder, required }: Props) => {
  const { uploadMedia, isLoading, progress, error, thumbnailURLs } = useUploadMedia();
  console.log(thumbnailURLs, 'thumbnailURLs');

  const handlePickImage = async (onChange: (value: any) => void) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        const pickedImage = [{
          uri: result.assets[0].uri,
          type: 'photo',
        }];

        // Espera a que la carga finalice
         uploadMedia(pickedImage);

        // Verifica si thumbnailURLs ha sido actualizado
        if (thumbnailURLs && thumbnailURLs.length > 0) {
          onChange(thumbnailURLs);
        } else {
          console.error('thumbnailURLs no se ha actualizado correctamente.');
        }
      }
    } catch (err) {
      console.error('Error al seleccionar la imagen:', err);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'Este campo es requerido' : false }}
      render={({ field: { onChange, value } }) => (
        <View>
          <Text>{placeholder}</Text>
          <Button title="Seleccionar Imagen" onPress={() => handlePickImage(onChange)} />
          {isLoading && <IsLoading />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {value && (
            <View>
              <Text>Imagen Seleccionada:</Text>
              <Image placeholderSource={`${CLOUDFRONT}${value}`} style={{ width: 100, height: 100 }} />
            </View>
          )}
        </View>
      )}
    />
  );
};

export default UploadSource;