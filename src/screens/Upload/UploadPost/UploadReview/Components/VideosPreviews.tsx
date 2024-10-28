import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, ViewToken, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useTheme } from '../../../../../hooks';
import { SIZES } from '../../../../../constants/theme';
import { Dots, LineDivider } from '../../../../../components/custom';

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
  duration: string;
  time: string;
  onPressPlay: () => void;
  isPlay: boolean;
}

const VideosPreviews = React.memo(
  ({
    onPressPlay,
    pickedMedia,
    ShowDivider = true,
    ShowDot = true,
    duration,
    time,
    isPlay,
  }: VideoPreviewProps) => {
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
    const { borderInput } = useTheme();
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
                style={[styles.media, { borderColor: borderInput }]}
                source={{ uri: item.uri }}
                useNativeControls
                isLooping
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <Image
                key={item.id}
                contentFit="cover"
                style={[styles.media, { borderColor: borderInput }]}
                source={{ uri: item.uri }}
              />
            )}
          </View>
        );
      },
      [pickedMedia],
    );

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
          <BarStatus
            duration={duration}
            time={time}
            onPressPlay={onPressPlay}
            isPlay={isPlay}
          />
        </View>
        {ShowDivider && <LineDivider />}
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    width: SIZES.width,
    height: SIZES.height / 2,
    backgroundColor: 'transparent',
  },
  container: {
    width: SIZES.width,
    marginVertical: SIZES.gapMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    width: SIZES.width / 2,
    height: SIZES.height / 2.3,
    borderRadius: SIZES.radiusExtra,
    borderWidth: SIZES.borderWidth / 2,
  },
});

export default VideosPreviews;
