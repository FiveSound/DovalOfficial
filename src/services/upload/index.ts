import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../index';

interface UploadProgressCallback {
  (progress: number): void;
}

export const uploadImageService = async (
  file: any,
  response_id: string,
  setUploadProgress?: UploadProgressCallback,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    const formData = new FormData();

    formData.append('media', file);
    formData.append('response_id', response_id);

    const response = await axios.post(`${API_URL}/api/upload/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`,
      },
      onUploadProgress: progressEvent => {
        if (setUploadProgress) {
          const progress = progressEvent.loaded / (progressEvent.total || 1);
          setUploadProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const uploadVideoService = async (
  file: any,
  response_id: string,
  setUploadProgress?: UploadProgressCallback,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const formData = new FormData();

    formData.append('media', file);
    formData.append('response_id', response_id);

    const response = await axios.post(`${API_URL}/api/upload/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`,
      },
      onUploadProgress: progressEvent => {
        if (setUploadProgress) {
          const progress = progressEvent.loaded / (progressEvent.total || 1);
          setUploadProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error) {
    console.log({ videosError: error });
    return null;
  }
};

// export const s3Service = async (file: any) => {

//   const s3 = new AWS.S3();

//   const responseBlob = await fetch(file.uri);
//   const blob = await responseBlob.blob();
//   const folder = file.type == "image" ? "uploads" : "videos";

//   const response = await s3
//     .upload({
//       Bucket: "app-mobil",
//       Key: `${folder}/${file.fileName}`,
//       Body: blob,
//       ContentType: file.type,
//     })
//     .promise();

//   return {
//     ...response,
//   };
// };

// export const uploadMediaServiceV2 = async (file: any) => {
//   try {
//     if (!file.fileName) throw Error("Error filename!");

//     const userToken = await AsyncStorage.getItem("userToken");

//     const responseMedia = await s3Service(file);

//     // const { uri } = await getThumbnailAsync(
//     //   `${CLOUDFRONT}${responseMedia.Key}`,
//     //   {
//     //     time: 1000,
//     //   }
//     // );

//     // const responseThumbnail = await s3Service({
//     //   uri: uri,
//     //   fileName: `thumbnail-${Date.now()}.jpg`,
//     //   type: "image",
//     // });

//     const response = await axios.post(
//       `${API_URL}/api/upload`,
//       {
//         key: responseMedia.Key,
//         thumbnail: responseMedia.Key,
//       },
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );

//     return {
//       success: true,
//       id: response.data.id,
//       key: response.data.key,
//       path: response.data.path,
//       thumbnail: response.data.thumbnail,
//     };
//   } catch (error) {
//     console.log({ error });
//     return { success: false, error };
//   }
// };
