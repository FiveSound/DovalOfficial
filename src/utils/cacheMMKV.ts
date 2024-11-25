import { MMKV } from 'react-native-mmkv';
import RNFetchBlob from 'rn-fetch-blob';

const mmkv = new MMKV();

const generateKey = (url: string) => {
  const key = url.replace(/[^a-zA-Z0-9]/g, '');
  // console.log(`[generateKey] URL: ${url} -> Key: ${key}`);
  return key;
};

const ensureDirectoryExists = async (dirPath: string) => {
  const { fs } = RNFetchBlob;
  const exists = await fs.exists(dirPath);
  if (!exists) {
    try {
      await fs.mkdir(dirPath);
      // console.log(`[ensureDirectoryExists] Directorio creado: ${dirPath}`);
    } catch (error) {
      if (error.message.includes('exists')) {
        console.log(`[ensureDirectoryExists] El directorio ya existe: ${dirPath}`);
      } else {
        console.error(`[ensureDirectoryExists] Error al crear el directorio "${dirPath}":`, error);
        throw error;
      }
    }
  } else {
    console.log(`[ensureDirectoryExists] El directorio ya existe: ${dirPath}`);
  }
};

// Función para obtener una imagen caché
export const getCachedImage = async (url: string): Promise<string> => {
  // console.log(`[getCachedImage] Llamado con URL: ${url}`);
  const key = generateKey(url);
  const cachedPath = mmkv.getString(key);
  // console.log(`[getCachedImage] Ruta en caché para la clave "${key}": ${cachedPath}`);

  if (cachedPath) {
    console.log(`[getCachedImage] Devolviendo ruta en caché para la URL: ${url}`);
    return cachedPath;
  }

  try {
    // Si no está en caché, descarga y guarda
    const { config, fs } = RNFetchBlob;
    const pictureDir = `${fs.dirs.CacheDir}/images`;
    // console.log(`[getCachedImage] Directorio de imágenes: ${pictureDir}`);

    // Asegura que el directorio exista
    await ensureDirectoryExists(pictureDir);

    const fileName = generateKey(url);
    const path = `${pictureDir}/${fileName}.jpg`;
    // console.log(`[getCachedImage] Descargando imagen a la ruta: ${path}`);

    await config({
      path,
      fileCache: true,
    }).fetch('GET', url);
    // console.log(`[getCachedImage] Descarga completada para la URL: ${url}`);

    mmkv.set(key, path);
    // console.log(`[getCachedImage] Ruta en caché establecida para la clave "${key}": ${path}`);

    return path;
  } catch (error) {
    console.error(`[getCachedImage] Error al guardar en caché la imagen desde la URL "${url}":`, error);
    throw error;
  }
};

// Función para obtener un video caché
export const getCachedVideo = async (url: string): Promise<string> => {
  // console.log(`[getCachedVideo] Llamado con URL: ${url}`);
  const key = generateKey(url);
  const cachedPath = mmkv.getString(key);
  // console.log(`[getCachedVideo] Ruta en caché para la clave "${key}": ${cachedPath}`);

  if (cachedPath) {
    console.log(`[getCachedVideo] Devolviendo ruta en caché para la URL: ${url}`);
    return cachedPath;
  }

  try {
    // Si no está en caché, descarga y guarda
    const { config, fs } = RNFetchBlob;
    const videoDir = `${fs.dirs.CacheDir}/videos`;
    // console.log(`[getCachedVideo] Directorio de videos: ${videoDir}`);

    // Asegura que el directorio exista
    await ensureDirectoryExists(videoDir);

    const fileName = generateKey(url);
    const path = `${videoDir}/${fileName}.mp4`;
    // console.log(`[getCachedVideo] Descargando video a la ruta: ${path}`);

    await config({
      path,
      fileCache: true,
    }).fetch('GET', url);
    // console.log(`[getCachedVideo] Descarga completada para la URL: ${url}`);

    mmkv.set(key, path);
    // console.log(`[getCachedVideo] Ruta en caché establecida para la clave "${key}": ${path}`);

    return path;
  } catch (error) {
    console.error(`[getCachedVideo] Error al guardar en caché el video desde la URL "${url}":`, error);
    throw error;
  }
};