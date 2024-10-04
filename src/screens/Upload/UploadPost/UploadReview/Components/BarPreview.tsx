import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated } from 'react-native';

interface MediaItem {
  id: string;
  uri: string;
}

interface Props {
  pickedMedia: MediaItem[];
  totalTime: string;
  isPlaying: boolean;
  handlePlayPause: () => void;
  IDSong: (id: string, sourceSong: string) => void
  sourceSong: string
}

const BarPreview: React.FC<Props> = ({ pickedMedia, totalTime, isPlaying, handlePlayPause, IDSong, sourceSong}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const convertTimeToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const totalTimeInSeconds = convertTimeToSeconds(totalTime);
  const durationPerItem = totalTimeInSeconds / pickedMedia.length;

  useEffect(() => {
    if (isPlaying) {
      Animated.timing(progress, {
        toValue: 1,
        duration: totalTimeInSeconds * 1000,
        useNativeDriver: false,
      }).start();
    } else {
      progress.setValue(0);
    }
  }, [isPlaying]);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const verticalBarPosition = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${100 + (30 / pickedMedia.length)}%`],
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ScrollView horizontal={true}>
        {pickedMedia.map((item) => (
          <View key={item.id} style={styles.mediaItem}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        ))}
        </ScrollView>
         <BarMusic 
         IDSong={IDSong}
         totalTimeInSeconds={totalTimeInSeconds}
         audioUri={sourceSong} 
         isPlaying={isPlaying} 
         handlePlayPause={handlePlayPause} />
        <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
        <Animated.View style={[styles.verticalBar, { left: verticalBarPosition }]} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapMedium,
    height: SIZES.height / 3,
    justifyContent: 'center',
  },
  scrollView: {
    // flexDirection: 'row',
    // position: 'relative',
  },
  mediaItem: {
    margin: 5,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    width: responsiveFontSize(60),
    height: responsiveFontSize(60),
    borderRadius: SIZES.radius,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 2,
    backgroundColor: COLORS.TranspDarkSecundary,
  },
  verticalBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'white',
  },
  totalTime: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default BarPreview;