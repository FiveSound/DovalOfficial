import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ViewToken } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SIZES } from '../../../constants/theme';
import { Dots, LineDivider } from '../../../components/custom';
import { Image } from '../../../components/native';

interface MediaItem {
  uri: string;
  type: 'photo' | 'video';
  id: string;
  extension?: string;
}

interface VideoPreviewProps {
  pickedMedia: MediaItem[];
  ShowDivider?: boolean;
  ShowDot?: boolean;
}

const VideoPreview = React.memo(
  ({ pickedMedia, ShowDivider = true, ShowDot = true }: VideoPreviewProps) => {
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
    const flatListRef = useRef(null);
    const onViewableItemsChanged = useRef(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
          setCurrentVisibleIndex(viewableItems[0].index);
        }
      },
    ).current;

    const renderItem = useCallback(
      ({ item }: { item: MediaItem }) => {
        const isVideo = item.type === 'video';
        return (
          <View style={styles.container}>
            {isVideo ? (
              <Video
                key={item.id}
                style={[styles.media, { borderColor: '' }]}
                source={{ uri: item.uri }}
                useNativeControls
                isLooping
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <Image
                key={item.id}
                contentFit="cover"
                style={[styles.media, { borderColor: '' }]}
                placeholderSource={item.uri}
              />
            )}
          </View>
        );
      },
      [pickedMedia],
    );

    if (pickedMedia.length === 0) return null;

    if (pickedMedia.length > 1) {
      return (
        <>
          <View style={styles.main}>
            <FlatList
              ref={flatListRef}
              data={pickedMedia}
              snapToInterval={SIZES.width}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
            {ShowDot && (
              <Dots
                totalSteps={pickedMedia.length}
                currentStep={currentVisibleIndex}
              />
            )}
          </View>
          {ShowDivider && <LineDivider lineStyle={styles.lineDivider} />}
        </>
      );
    }
  },
);

const styles = StyleSheet.create({
  main: {
    width: SIZES.width,
    height: SIZES.height / 3,
    backgroundColor: 'transparent',
  },
  container: {
    width: SIZES.width,
    marginVertical: SIZES.gapMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: SIZES.width / 2.8,
    height: SIZES.height / 3.6,
  },
  lineDivider: {
    height: SIZES.gapMedium,
  },
});

export default VideoPreview;
