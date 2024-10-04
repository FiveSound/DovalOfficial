import React, { lazy, Suspense, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { GalleryLayout, PickerComponent, VideoPreview, MediaList, GalleryControls, SkeletonAssets } from "./Components";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks";
import { useMediaLibrary } from "../../hooks/useMediaLibrary";
import * as MediaLibrary from "expo-media-library";
import * as Haptics from 'expo-haptics';
import { Alert, Linking } from "react-native";
import i18next from "../../Translate";
import { MediaItem } from "./Components/MediaList";
import Signup from "../auth/Signup";
import { ScreenEmpty } from "../../components/custom";
import { COLORS, SIZES } from "../../constants/theme";
import { Ilustrations } from "../../constants";
const LazyCard = lazy(() => import("../../components/custom/Cards/CardGallery"))

const Upload = () => {
  const isFetching = useRef(false);
  const [videoKey, setVideoKey] = useState<number>(0);
  const { user } = useAuth();
  const { backgroundMaingrey } = useTheme();
  const { media, fetchMedia, albums, fetchAlbums, fetchMoreMedia } = useMediaLibrary();
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
  const [pickedMedia, setPickedMedia] = useState<any[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("all-media");
  const [selectionOrder, setSelectionOrder] = useState<Map<string, number>>(new Map());
  const [hasPermission, setHasPermission] = useState(false);

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (!albums.length) {
      fetchAlbums();
    }
    if (!media.length) {
      fetchMedia(16, selectedAlbumId);
    }
  }, [selectedAlbumId, albums.length, fetchAlbums, fetchMedia, media.length]);

  const formatDuration = useCallback((durationInSeconds: number): string => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleVideoError = () => {
    setVideoKey(prevKey => prevKey + 1);
  };

  const handleAlbumChange = (albumId: string) => {
    if (albumId !== selectedAlbumId) {
      setSelectedAlbumId(albumId);
      fetchMedia(24, albumId);
    }
  };

  const toggleSelection = useCallback((mediaId: string, mediaType: string, mediaUri: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSelectedImageIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(mediaId)) {
        newSelectedIds.delete(mediaId);
        setPickedMedia(pickedMedia.filter(media => media.id !== mediaId));
        setSelectionOrder(prevOrder => {
          const newOrder = new Map(prevOrder);
          newOrder.delete(mediaId);
          return newOrder;
        });
      } else {
        if (mediaType === 'photo') {
          if (pickedMedia.some(media => media.type === 'video')) {
            Alert.alert(i18next.t('Selection not allowed You cannot select images because you already have a video selected.'));
            return newSelectedIds;
          }
          if (newSelectedIds.size < 10) {
            newSelectedIds.add(mediaId);
            setPickedMedia([...pickedMedia, { id: mediaId, type: mediaType, uri: mediaUri }]);
            setSelectionOrder(prevOrder => {
              const newOrder = new Map(prevOrder);
              const nextIndex = Array.from(newOrder.values()).reduce((max, cur) => Math.max(max, cur), 0) + 1;
              newOrder.set(mediaId, nextIndex);
              return newOrder;
            });
          }
        } else if (mediaType === 'video') {
          if (pickedMedia.some(media => media.type === 'photo')) {
            Alert.alert(i18next.t("Selection not allowed, You cannot select a video because you already have images selected."));
            return newSelectedIds;
          }
          newSelectedIds.clear();
          newSelectedIds.add(mediaId);
          setPickedMedia([{ id: mediaId, type: mediaType, uri: mediaUri }]);
          setSelectionOrder(new Map([[mediaId, 1]]));
        }
      }
      return newSelectedIds;
    });
  }, [pickedMedia]);

  const renderItem = useCallback(({ item }: { item: MediaItem }) => {
    const mediaUri = item.node.uri;
    const mediaType = item.node.mediaType === 'video' ? 'video' : 'photo';
    const isSelected = selectedImageIds.has(item.node.id);
    const selectionIndex = isSelected ? selectionOrder.get(item.node.id) : 0;

    return (
      <Suspense fallback={<SkeletonAssets />}>
        <LazyCard
          mediaKey={item.node.id}
          mediaSource={mediaUri}
          mediaType={mediaType}
          onPressImg={() => toggleSelection(item.node.id, item.node.mediaType, mediaUri)}
          isSelected={isSelected}
          duration={item.node.duration ? formatDuration(item.node.duration) : undefined}
          CountSelect={selectionIndex}
        />
      </Suspense>
    );
  }, [selectedImageIds, formatDuration, toggleSelection]);

  const handleEndReached = useCallback(() => {
    fetchMoreMedia();
  }, [fetchMoreMedia]);

  if (!user) {
    return <Signup />;
  }

  if (!hasPermission) {
    return (
      <ScreenEmpty
        labelPart1={i18next.t('Oh we dont have permits')}
        labelStylePart1={{ textAlign: 'center', color: COLORS.error }}
        subLabel={i18next.t('You need to give us permission to access this area')}
        ShowButton={true}
        ImgWidth={SIZES.width}
        ImgHeigth={SIZES.height / 3}
        source={Ilustrations.Broken}
        Container={{ flex: 1, backgroundColor: backgroundMaingrey }}
        onPress={() => Linking.openSettings()}
        labelButton={i18next.t('Open settings')}
        colorVariant='primary'
      />
    );
  }

  return (
    <GalleryLayout>
      <GalleryControls label="Continuar" pickedMedia={pickedMedia} />
      <VideoPreview pickedMedia={pickedMedia} />
      <PickerComponent value={selectedAlbumId} onValueChange={handleAlbumChange} items={albums} />
      <MediaList media={media} onEndReached={handleEndReached} renderItem={renderItem} />
    </GalleryLayout>
  );
};

export default Upload;