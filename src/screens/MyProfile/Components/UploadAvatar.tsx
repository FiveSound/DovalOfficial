import React from 'react';
import { Alert } from 'react-native';
import { updateProfileService } from '../../../services/auth';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageService } from '../../../services/upload';
import * as ImageManipulator from 'expo-image-manipulator';

export const UploadAvatar = async (
  setImagAvatar: (key: string) => void,
  profileDatarefetch: () => void,
  setAvatarLoader: (loading: boolean) => void,
  setLoadCount: React.Dispatch<React.SetStateAction<number>>,
  setUploadStatus: (status: 'success' | 'error' | null) => void,
) => {
  setAvatarLoader(true);
  setUploadStatus(null);
  try {
    console.log('Iniciando selección de imagen...');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
      allowsMultipleSelection: false,
    });

    console.log('Resultado de selección de imagen:', result);

    if (!result.canceled && result.assets) {
      const assets = result.assets;
      let uploadedImages = [];

      console.log('Procesando assets:', assets);

      for (let index = 0; index < assets.length; index++) {
        const element = assets[index];
        const uri = element.uri;

        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 580 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG },
        );
        console.log('Imagen optimizada:', manipResult);

        const name = manipResult.uri.split('/ImagePicker/')[1];
        const fileExtension = manipResult.uri.substr(
          manipResult.uri.lastIndexOf('.') + 1,
        );

        const response_id = Date.now().toString();

        const newFile = {
          id: response_id,
          uri: manipResult.uri,
          name: name || `image-${response_id}.${fileExtension}`,
          type: `image/${fileExtension}`,
        };

        console.log('Nuevo archivo a subir:', newFile);

        const response = await uploadImageService(newFile, response_id);
        console.log('Respuesta de subida de imagen:', response);

        if (response && response.key) {
          setImagAvatar(response.key);
          uploadedImages.push(response.key);
        } else {
          console.error(
            'La subida de la imagen falló o la respuesta no contiene la clave esperada.',
          );
          throw new Error('Failed to upload image');
        }
      }

      console.log('Imágenes subidas:', uploadedImages);

      if (uploadedImages.length > 0) {
        const updateResponse = await updateProfileService({
          avatar: uploadedImages[0],
        });

        console.log('Respuesta de actualización de perfil:', updateResponse);
        setUploadStatus('success');
      }
    } else {
      console.log(
        'Selección de imagen cancelada o no se seleccionaron assets.',
      );
    }
  } catch (error) {
    Alert.alert('Ha ocurrido un error al subir la imagen!');
    console.error('Error en handleImagePicker:', error);
    setUploadStatus('error');
  } finally {
    setTimeout(() => {
      setAvatarLoader(false);
      profileDatarefetch();
      setLoadCount(prevCount => prevCount + 1);
      setUploadStatus(null);
    }, 1000);
  }
};

export default UploadAvatar;
