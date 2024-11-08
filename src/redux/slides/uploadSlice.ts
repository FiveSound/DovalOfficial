import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageService, uploadVideoService } from '../../services/upload';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { generateUniqueId } from '../../utils/Utils';

type Photo = {
  id: string;
  key: string;
  optimizedKey?: string; // Almacena la clave de la imagen optimizada
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

interface MediaURL {
  type: 'video' | 'photo';
  key: string;
  id: string;
}

interface UploadState {
  isLoading: boolean;
  progress: number;
  mediaURLs: MediaURL[]; // Updated to store type, key, id
  optimizedMediaURLs: string[]; // Almacena las URLs de imágenes optimizadas
  thumbnailURLs: string[];
  photos: Photo[];
  videos: Video[];
  mediaType: number;
  error: string | null;
}

const initialState: UploadState = {
  isLoading: false,
  progress: 0,
  mediaURLs: [], // Initialized as empty array of MediaURL
  optimizedMediaURLs: [], // Inicializado
  thumbnailURLs: [],
  photos: [],
  videos: [],
  mediaType: 0,
  error: null,
};

// Async Thunks
export const uploadMedia = createAsyncThunk(
  'upload/uploadMedia',
  async (pickedMedia: Media[], { dispatch, rejectWithValue }) => {
    // console.log('uploadMedia iniciado con:', pickedMedia);
    try {
      const uploadPromises = pickedMedia.map(async (media) => {
        const response_id = generateUniqueId(); // Generador de ID único
        // console.log(
        //   `Iniciando subida para media ID: ${response_id}, tipo: ${media.type}`
        // );
        if (media.type === 'video') {
          return await uploadVideo(media, response_id, (progress) => {
            // console.log(
            //   `Progreso de subida para video ID: ${response_id}: ${progress}%`
            // );
            dispatch(setProgress(progress));
          });
        } else {
          return await uploadPhoto(media, response_id, (progress) => {
            // console.log(
            //   `Progreso de subida para foto ID: ${response_id}: ${progress}%`
            // );
            dispatch(setProgress(progress));
          });
        }
      });

      const results = await Promise.allSettled(uploadPromises);
      // console.log('Resultados de las promesas de subida:', results);

      const fulfilled = results
        .filter(
          (result) => result.status === 'fulfilled' && result.value !== null
        )
        .map(
          (result) =>
            (result as PromiseFulfilledResult<Photo | Video | null>).value
        ) as (Photo | Video)[];

      // console.log('Elementos subidos exitosamente:', fulfilled);
      return fulfilled;
    } catch (error: any) {
      console.error('Error en uploadMedia:', error);
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
  // console.log(`uploadPhoto iniciado para media ID: ${response_id}`, media);
  try {
    const name = media.uri.split('/').pop() || '';
    const key = `uploads/${name}`;
    // console.log(`Nombre de archivo original: ${name}, clave: ${key}`);

    // Subir la imagen original
    const originalFile = {
      id: response_id,
      uri: media.uri,
      name,
      type: 'image/jpeg',
    };
    // console.log('Subiendo imagen original:', originalFile);
    const originalResponse = await uploadImageService(
      originalFile,
      response_id,
      setProgress
    );
    // console.log('Respuesta de subida de imagen original:', originalResponse);
    if (!originalResponse || !originalResponse.uri) {
      throw new Error('Failed to upload original image');
    }

    // Crear y subir una versión optimizada de la imagen
    // console.log('Iniciando manipulación de la imagen para optimización.');
    const ImgOptimized = await manipulateAsync(
      media.uri,
      [
        // { resize: { width: 800 } }, // Redimensiona a un ancho de 800px
      ],
      { compress: 0.7, format: SaveFormat.JPEG } // Aplica 70% de compresión
    );
    // console.log('Imagen optimizada creada:', ImgOptimized);

    const optimizedName = `optimized_${name}`;
    const optimizedKey = `uploads/optimized/${optimizedName}`;
    // console.log('Nombre y clave de la imagen optimizada:', optimizedName, optimizedKey);

    const optimizedFile = {
      id: `${response_id}-optimized`,
      uri: ImgOptimized.uri,
      name: optimizedName,
      type: 'image/jpeg',
    };
    // console.log('Subiendo imagen optimizada:', optimizedFile);

    const optimizedResponse = await uploadImageService(
      optimizedFile,
      `${response_id}-optimized`,
      setProgress
    );
    // console.log('Respuesta de subida de imagen optimizada:', optimizedResponse);
    if (!optimizedResponse || !optimizedResponse.uri) {
      console.warn('Failed to upload optimized image');
    }

    return {
      id: response_id,
      key,
      optimizedKey: optimizedResponse?.key, // Almacena la clave de la imagen optimizada
      type: 'photo',
    };
  } catch (error) {
    console.error('Error en uploadPhoto:', error);
    return null;
  }
};

const uploadVideo = async (
  media: Media,
  response_id: string,
  setProgress: (progress: number) => void
): Promise<Video | null> => {
  // console.log(`uploadVideo iniciado para media ID: ${response_id}`, media);
  try {
    const name = media.uri.split('/').pop() || '';
    const videoKey = `videos/${name}`;
    // console.log(`Nombre de video: ${name}, clave: ${videoKey}`);

    const newFile = {
      id: response_id,
      uri: media.uri,
      name,
      type: 'video/mp4',
    };
    // console.log('Subiendo video:', newFile);

    const videoResponse = await uploadVideoService(
      newFile,
      response_id,
      setProgress
    );
    // console.log('Respuesta de subida de video:', videoResponse);
    if (!videoResponse || !videoResponse.uri) {
      throw new Error('Failed to upload video');
    }

    // Generar y subir la miniatura del video
    // console.log('Generando miniatura del video.');
    const thumbnailResult = await VideoThumbnails.getThumbnailAsync(media.uri, {
      time: 1000,
    });
    // console.log('Miniatura generada:', thumbnailResult);

    const thumbnailURI = thumbnailResult.uri;
    const thumbnailName = `thumbnail_${name.replace(/\.\w+$/, '.jpeg')}`;
    const thumbnailKey = `uploads/${thumbnailName}`;
    // console.log('Nombre y clave de la miniatura:', thumbnailName, thumbnailKey);

    const thumbnailFile = {
      id: `${response_id}-thumbnail`,
      uri: thumbnailURI,
      name: thumbnailName,
      type: 'image/jpeg',
    };
    // console.log('Subiendo miniatura del video:', thumbnailFile);

    const thumbnailResponse = await uploadImageService(
      thumbnailFile,
      `${response_id}-thumbnail`,
      setProgress
    );
    // console.log('Respuesta de subida de miniatura:', thumbnailResponse);
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
    console.error('Error en uploadVideo:', error);
    return null;
  }
};

// Slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      // console.log(`Actualizando progreso a: ${action.payload}%`);
      state.progress = action.payload;
    },
    resetProgress(state) {
      // console.log('Reiniciando progreso a 0%');
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        // console.log('uploadMedia pendiente.');
        state.isLoading = true;
        state.progress = 0;
        state.error = null;
        state.mediaURLs = [];
        state.optimizedMediaURLs = []; // Reiniciar URLs optimizadas
        state.thumbnailURLs = [];
        state.photos = [];
        state.videos = [];
      })
      .addCase(
        uploadMedia.fulfilled,
        (state, action: PayloadAction<(Photo | Video)[]>) => {
          // console.log('uploadMedia cumplido con:', action.payload);
          state.isLoading = false;
          state.progress = 0; // Reiniciar progreso a 0
          
          // Actualizar mediaURLs con type, key, id
          state.mediaURLs = action.payload.map((item) => ({
            type: item.type,
            key: item.type === 'photo' ? (item.optimizedKey || item.key) : item.key,
            id: item.id,
          }));

          // Almacenar las URLs de las imágenes optimizadas
          state.optimizedMediaURLs = action.payload
            .filter(
              (item): item is Photo =>
                item.type === 'photo' && !!item.optimizedKey
            )
            .map((item) => item.optimizedKey as string);

          // Almacenar las URLs de las miniaturas de videos
          state.thumbnailURLs = action.payload
            .filter(
              (item): item is Video =>
                item.type === 'video' && !!item.thumbnailURL
            )
            .map((item) => item.thumbnailURL);

          // Separar las fotos y videos
          state.photos = action.payload.filter(
            (item) => item.type === 'photo'
          ) as Photo[];
          state.videos = action.payload.filter(
            (item) => item.type === 'video'
          ) as Video[];
        }
      )
      .addCase(uploadMedia.rejected, (state, action) => {
        // console.error('uploadMedia rechazado con:', action.payload);
        state.isLoading = false;
        state.progress = 0; // Reiniciar progreso a 0
        state.error = action.payload as string;
      });
  },
});

export const { setProgress, resetProgress } = uploadSlice.actions;
export default uploadSlice.reducer;