import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageService, uploadVideoService } from '../../services/upload';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { generateUniqueId } from '../../utils/Utils';

type Photo = {
  id: string;
  key: string;
  type: 'photo';
};

type Video = {
  mediaURL: string;
  thumbnailURL: string;
  type: 'video';
  id: string;
  key: string;
};

type Media = {
  uri: string;
  type: 'video' | 'photo';
};

interface UploadState {
  isLoading: boolean;
  progress: number;
  mediaURLs: string[];
  thumbnailURLs: string;
  photos: Photo[];
  videos: Video[];
  mediaType: number;
  error: string | null;
}

const initialState: UploadState = {
  isLoading: false,
  progress: 0,
  mediaURLs: [],
  thumbnailURLs: '',
  photos: [],
  videos: [],
  mediaType: 0,
  error: null,
};

// Async Thunks
export const uploadMedia = createAsyncThunk(
  'upload/uploadMedia',
  async (pickedMedia: Media[], { dispatch, rejectWithValue }) => {
    try {
      const uploadPromises = pickedMedia.map(async (media) => {
        const response_id = generateUniqueId(); // Use the unique ID generator
        if (media.type === 'video') {
          return await uploadVideo(media, response_id, (progress) => {
            dispatch(setProgress(progress));
          });
        } else {
          return await uploadPhoto(media, response_id, (progress) => {
            dispatch(setProgress(progress));
          });
        }
      });

      const results = await Promise.allSettled(uploadPromises);
      const fulfilled = results
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => (result as PromiseFulfilledResult<Photo | Video | null>).value) as (Photo | Video)[];

      return fulfilled;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper Functions
const uploadPhoto = async (
  media: Media,
  response_id: string,
  setProgress: (progress: number) => void
): Promise<Photo | null> => {
  try {
    const name = media.uri.split('/').pop() || '';
    const key = `uploads/${name}`;

    // Subir la imagen original
    const originalFile = {
      id: response_id,
      uri: media.uri,
      name,
      type: 'image/jpeg',
    };
    const originalResponse = await uploadImageService(originalFile, response_id, setProgress);
    if (!originalResponse || !originalResponse.uri) {
      throw new Error('Failed to upload original image');
    }

    // Crear y subir una versión optimizada de la imagen
    const optimizedImage = await manipulateAsync(
      media.uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );

    const optimizedName = `optimized_${name}`;
    const optimizedKey = `uploads/optimized/${optimizedName}`;
    const optimizedFile = {
      id: `${response_id}-optimized`,
      uri: optimizedImage.uri,
      name: optimizedName,
      type: 'image/jpeg',
    };

    const optimizedResponse = await uploadImageService(optimizedFile, `${response_id}-optimized`, setProgress);
    if (!optimizedResponse || !optimizedResponse.uri) {
      console.warn('Failed to upload optimized image');
    }

    return {
      id: response_id,
      key,
      type: 'photo',
    };
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    return null;
  }
};

const uploadVideo = async (
  media: Media,
  response_id: string,
  setProgress: (progress: number) => void
): Promise<Video | null> => {
  try {
    const name = media.uri.split('/').pop() || '';
    const videoKey = `videos/${name}`;

    const newFile = {
      id: response_id,
      uri: media.uri,
      name,
      type: 'video/mp4',
    };

    const videoResponse = await uploadVideoService(newFile, response_id, setProgress);
    if (!videoResponse || !videoResponse.uri) {
      throw new Error('Failed to upload video');
    }

    // Generar y subir la miniatura del video
    const thumbnailResult = await VideoThumbnails.getThumbnailAsync(media.uri, { time: 1000 });
    const thumbnailURI = thumbnailResult.uri;
    const thumbnailName = `thumbnail_${name.replace(/\.\w+$/, '.jpeg')}`;
    const thumbnailKey = `uploads/${thumbnailName}`;
    const thumbnailFile = {
      id: `${response_id}-thumbnail`,
      uri: thumbnailURI,
      name: thumbnailName,
      type: 'image/jpeg',
    };

    const thumbnailResponse = await uploadImageService(thumbnailFile, `${response_id}-thumbnail`, setProgress);
    if (!thumbnailResponse || !thumbnailResponse.uri) {
      console.warn('Failed to upload thumbnail');
    }

    return {
      mediaURL: videoResponse.uri,
      thumbnailURL: thumbnailResponse?.key || '',
      type: 'video',
      id: response_id,
      key: videoKey,
    };
  } catch (error) {
    console.error('Error in uploadVideo:', error);
    return null;
  }
};

// Slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    resetProgress(state) {
      state.progress = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.isLoading = true;
        state.progress = 0;
        state.error = null;
        state.mediaURLs = [];
        state.thumbnailURLs = '';
        state.photos = [];
        state.videos = [];
      })
      .addCase(uploadMedia.fulfilled, (state, action: PayloadAction<(Photo | Video)[]>) => {
        state.isLoading = false;
        state.progress = 0; // Reset progress to 0
        state.mediaURLs = action.payload.map(item => ('uri' in item ? item.uri : item.mediaURL));
        state.thumbnailURLs =
          action.payload.find(item => item.type === 'video')?.thumbnailURL ||
          action.payload.find(item => item.type === 'photo')?.key ||
          '';
        state.photos = action.payload.filter(item => item.type === 'photo') as Photo[];
        state.videos = action.payload.filter(item => item.type === 'video') as Video[];
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.progress = 0; // Reset progress to 0
        state.error = action.payload as string;
      });
  },
});

export const { setProgress, resetProgress } = uploadSlice.actions;
export default uploadSlice.reducer;