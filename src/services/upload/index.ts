import axios from 'axios';
import { API_URL } from '../index';
import { storage } from '@/src/components/native';
import { USER_TOKEN } from '@/src/constants';
import AWS from "aws-sdk";

interface UploadProgressCallback {
  (progress: number): void;
}


export const uploadImageService = async (
  file: any,
  response_id: string,
  setUploadProgress?: UploadProgressCallback,
) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

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
    const userToken = storage.getString(USER_TOKEN);
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

export const s3Service = async (file: any) => {
  AWS.config.update({
    accessKeyId: "AKIAVISXIWKHYTSFAM3C",
    secretAccessKey: "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",
    region: "sa-east-1",
  });

  const s3 = new AWS.S3();

  const responseBlob = await fetch(file.uri);
  const blob = await responseBlob.blob();
  const folder = file.type == "image" ? "uploads" : "videos";

  const response = await s3
    .upload({
      Bucket: "app-mobil",
      Key: `${folder}/${file.fileName}`,
      Body: blob,
      ContentType: file.type,
    })
    .promise();

  return {
    ...response,
  };
};

export const uploadMediaServiceV2 = async (file: any) => {
  try {
    if (!file.fileName) throw Error("Error filename!");

    const userToken = storage.getString(USER_TOKEN);

    const responseMedia = await s3Service(file);

    const response = await axios.post(
      `${API_URL}/api/upload`,
      {
        key: responseMedia.Key,
        thumbnail: responseMedia.Key,
      },
      { headers: { Authorization: `Bearer ${userToken}` } }
    );

    return {
      success: true,
      id: response.data.id,
      key: response.data.key,
      path: response.data.path,
      thumbnail: response.data.thumbnail,
    };
  } catch (error) {
    console.log({ error });
    return { success: false, error };
  }
};

