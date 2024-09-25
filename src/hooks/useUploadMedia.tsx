import { useState } from 'react';
import * as VideoThumbnails from "expo-video-thumbnails";
import { uploadImageService, uploadVideoService } from '../services/upload';

type Photo = { id: string; uri: string; key: string; type: string };
type Video = { mediaURL: string; thumbnailURL: string; type: string; id: string };
interface Media {
    uri: string;
    type: 'video' | 'photo';
}

const useUploadMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mediaURLs, setMediaURLs] = useState<string[]>([]);
  const [thumbnailURLs, setThumbnailURLs] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [mediaType, setMediaType] = useState<number>(0);

  const uploadPhoto = async (media: Media, response_id: string) => {
    const name = media.uri.split("/").pop() || '';
    const key = `uploads/${name}`;
    
    if(media.type === 'video') {
      setMediaType(0);
    } else if (media.type === 'photo') {
      setMediaType(1);
    }

    const newFile = {
      id: response_id,
      uri: media.uri,
      name: name,
      type: 'image/jpeg',
    };
    const imageResponse = await uploadImageService(newFile, response_id, setProgress);
    if (!imageResponse || !imageResponse.uri) {
      console.error('Failed to upload image:', imageResponse);
      return null; // Return null or handle as appropriate
    }
    console.log(`Photo uploaded: ${imageResponse.uri} with key ${key}`);
    return {
      id: response_id,
      uri: imageResponse.uri,
      key: key,
      type: 'photo'
    };
  };

  const uploadVideo = async (media: Media, response_id: string) => {
    try {
      console.log('Starting video upload process');
      const name = media.uri.split("/").pop() || '';
      const videoKey = `videos/${name}`;
      const newFile = {
        id: response_id,
        uri: media.uri,
        name: name,
        type: 'video/mp4',
      };
      console.log('Prepared video file:', newFile);
  
      console.log('Calling uploadVideoService');
      const videoResponse = await uploadVideoService(newFile, response_id, setProgress);
      console.log('uploadVideoService response:', videoResponse);
  
      if (!videoResponse || !videoResponse.uri) {
        throw new Error('Failed to upload video: Invalid response from uploadVideoService');
      }
      console.log(`Video uploaded: ${videoResponse.uri} with key ${videoKey}`);
  
      console.log('Generating thumbnail');
      const thumbnailURI = await thumbnailImg(media.uri);
      console.log('Thumbnail generated:', thumbnailURI);
  
      const thumbnailName = "thumbnail_" + (name.replace(/\.\w+$/, ".jpeg"));
      const thumbnailKey = `uploads/${thumbnailName}`;
      const thumbnailFile = {
        id: response_id,
        uri: thumbnailURI,
        name: thumbnailName,
        type: 'image/jpeg',
      };
      console.log('Prepared thumbnail file:', thumbnailFile);
  
      console.log('Uploading thumbnail');
      const thumbnailResponse = await uploadImageService(thumbnailFile, response_id, setProgress);
      console.log('Thumbnail upload response:', thumbnailResponse);
  
      if (!thumbnailResponse || !thumbnailResponse.uri) {
        console.error('Failed to upload thumbnail:', thumbnailResponse);
        // Continue with video upload even if thumbnail fails
      } else {
        console.log(`Thumbnail uploaded: ${thumbnailResponse.key} with key ${thumbnailKey}`);
      }
  
      return {
        mediaURL: videoResponse.uri,
        thumbnailURL: thumbnailResponse?.key,
        type: 'video',
        id: response_id,
        key: videoKey
      };
    } catch (error) {
      console.error('Error in uploadVideo:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
      return null;
    }
  };

  const thumbnailImg = async (videoUri: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 1000 });
      return uri;
    } catch (e) {
      console.log(`Error generating thumbnail: ${e}`);
      return '';
    }
  };

  const uploadMedia = async (pickedMedia: Media[]) => {
    setIsLoading(true);
    setProgress(0);
    const uploadPromises = pickedMedia.map(media => {
      const response_id = Date.now().toString();
      return media.type === 'video' ? uploadVideo(media, response_id) : uploadPhoto(media, response_id);
    });

    try {
      const results = await Promise.all(uploadPromises);
      setMediaURLs(results.map(result => result.uri));
      setThumbnailURLs(results.find(result => result.type === 'video')?.thumbnailURL || results.find(result => result.type === 'photo')?.key);
      const filteredResults = results.filter(result => result !== undefined) as (Photo | Video)[];
      setPhotos(filteredResults.filter(result => result.type === 'photo') as Photo[]);
      setVideos(filteredResults.filter(result => result.type === 'video') as Video[]);
    } catch (error) {
      console.error("Error uploading media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadMedia, isLoading, progress, mediaURLs, thumbnailURLs, photos, videos, mediaType };
};

export default useUploadMedia;