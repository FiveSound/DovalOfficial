import { useState, useCallback, useRef, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

interface MediaNode {
    id: string;
    mediaType: string;
    uri: string;
    duration?: number;
    FileName: string;
}

interface MediaItem {
    key: string;
    node: MediaNode;
}

interface Album {
    id: string;
    title: string;
    assetCount: string;
    uriAsset: string;
}

export const useMediaLibrary = () => {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [error, setError] = useState<string | null>(null);
    const isFetching = useRef(false);
    const lastAssetId = useRef<string | undefined>(undefined);
    const currentAlbumId = useRef<string | undefined>(undefined);
    const uriCache = useRef<Map<string, string>>(new Map());
    
    const hasPermission = async (): Promise<boolean> => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        return status === "granted";
    };
    
    useEffect(() => {
        const initFetch = async () => {
            if (albums.length === 0) {
                await fetchAlbums();
            }
        };
        initFetch();
    }, []);

    const fetchAlbums = useCallback(async () => {
        if (!await hasPermission()) {
            setError('No permission to access media library');
            return;
        }
        try {
            const albumsResult = await MediaLibrary.getAlbumsAsync();
            const allAssets = await MediaLibrary.getAssetsAsync({
                mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo]
            });
            const formattedAssetCount = allAssets.totalCount.toLocaleString();
            const allMediaAlbum = { id: 'all-media', title: 'Recientes', assetCount: formattedAssetCount, uriAsset: allAssets.assets[0]?.uri };

            const albumsWithUri = await Promise.all(albumsResult.map(async (album) => {
                const albumAssets = await MediaLibrary.getAssetsAsync({
                    album: album.id,
                    first: 1
                });
                return {
                    id: album.id,
                    title: album.title,
                    assetCount: album.assetCount.toLocaleString(),
                    uriAsset: albumAssets.assets[0]?.uri
                };
            }));

            setAlbums([allMediaAlbum, ...albumsWithUri]);
        } catch (error) {
            console.error("Error fetching albums:", error);
            setError('Failed to fetch albums');
        }
        finally {
        }
    }, [hasPermission]);

    const fetchMedia = useCallback(async (count: number, albumId?: string) => {
        // setIsLoading(true);
        const startTime = performance.now()
        if (isFetching.current) return;
        isFetching.current = true;
    
        if (!await hasPermission()) {
            setError('No permission to access media library');
            isFetching.current = false;
            return;
        }
    
        if (currentAlbumId.current !== albumId) {
            setMedia([]);
            lastAssetId.current = undefined;
            currentAlbumId.current = albumId;
          }
    
        const options = {
            first: count,
            after: lastAssetId.current,
            album: albumId === 'all-media' ? undefined : albumId,
            mediaType: [MediaLibrary.MediaType.video, MediaLibrary.MediaType.photo],
            sortBy: [MediaLibrary.SortBy.creationTime],
            fast: true
        };
    
        try { 
            const assets = await MediaLibrary.getAssetsAsync(options);
            if (assets.assets.length > 0) {
                lastAssetId.current = assets.assets[assets.assets.length - 1].id;
            }
    
            const mediaItems = await Promise.all(assets.assets.map(async (asset, index) => {
                let uri = asset.uri;
                if (uri.startsWith('ph://')) {
                    const assetId = uri.split('ph://')[1];
                    if (uriCache.current.has(assetId)) {
                        uri = uriCache.current.get(assetId)!;
                    } else {
                        const assetInfo = await MediaLibrary.getAssetInfoAsync(assetId);
                        uri = assetInfo.localUri || assetInfo.uri;
                        uriCache.current.set(assetId, uri);
                    }
                }
                const key = `${asset.id}-${index}`;
                return {
                    key: key,
                    node: {
                        id: asset.id,
                        mediaType: asset.mediaType,
                        uri: uri,
                        duration: asset.mediaType === 'video' ? asset.duration : undefined,
                        FileName: asset.filename,
                    },
                };
            }));

    
            setMedia((prevMedia) => [...prevMedia, ...mediaItems]);
        } catch (error) {
            console.error("Error fetching media:", error);
            setError('Failed to fetch media');
        } finally {
            isFetching.current = false;
            const endTime = performance.now(); 
            console.log(`fetchMedia took ${endTime - startTime} milliseconds`);
        }
    }, [hasPermission, lastAssetId, setMedia]);

    const fetchMoreMedia = useCallback(async () => {
        if (isFetching.current || !lastAssetId.current) return;
        await fetchMedia(24, currentAlbumId.current);
    }, [fetchMedia]);
    

        return { media, fetchMedia, fetchMoreMedia, albums, fetchAlbums, error };
};