import React, { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, Image, Dimensions, View, Button } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { CLOUDFRONT } from '../../../../../services';
import { Ilustrations } from '../../../../../constants';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { VideoView, useVideoPlayer, VideoPlayer } from 'expo-video';
import { LineDivider } from '../../../../../components/custom';

interface MediaItem {
  key: string;
  type: 'photo' | 'video';
  id: string;
  extension?: string;
}

interface CoversProps {
  data?: MediaItem[];
  ShowDivider?: boolean;
}

const Covers = React.memo(({ data, ShowDivider = false }: CoversProps) => {
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const { type, key } = data?.[0] || {};
  const source = `${CLOUDFRONT}${key}`;
  const memoSource = useMemo(() => source, [source]);
  const playerRef = useRef<VideoPlayer>(null);

  useEffect(() => {
    if (type === 'photo') {
      Image.getSize(
        memoSource,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 1.4;
          const calculatedHeight = (height / width) * desiredWidth;
          console.log('calculatedHeight', calculatedHeight);
          setDisplayHeight(responsiveFontSize(calculatedHeight));
        },
        (error) => {
          console.log('Error fetching image size:', error);
          setDisplayHeight(responsiveFontSize(400));
        }
      );
    } else if (type === 'video') {
      (async () => {
        try {
          const { width, height } = await VideoThumbnails.getThumbnailAsync(source, {
            time: 1000, // Tiempo en milisegundos para generar la miniatura
          });
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 1.4;
          const calculatedHeight = (height / width) * desiredWidth;
          console.log('calculatedHeight for video', calculatedHeight);
          setDisplayHeight(responsiveFontSize(calculatedHeight));
        } catch (e) {
          console.warn('Error generating thumbnail for video:', e);
          setDisplayHeight(responsiveFontSize(400));
        }
      })();
    }
  }, [memoSource, type]);

  // Configurar el reproductor de video
  const player = useVideoPlayer(memoSource, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (isPlaying: boolean) => {
      // Puedes manejar el estado de reproducción aquí si es necesario
      console.log('Is video playing:', isPlaying);
    });

    return () => {
      subscription.remove();
      // player.dispose(); 
    };
  }, [player]);

  if (!data || data.length === 0) {
    return (
      <Image
        source={Ilustrations.EmptyMedia}
        style={styles.mediaEmpty}
        resizeMode="cover"
      />
    );
  }

  return (
    <View>
      {type === 'photo' ? (
        <Image
          source={{ uri: memoSource }}
          style={[styles.media, { height: displayHeight }]}
          resizeMode="cover"
        />
      ) : (
        <>
          <VideoView
            ref={playerRef}
            style={[styles.media, { height: displayHeight }]}
            player={player}
            contentFit='cover'
            allowsFullscreen
            allowsPictureInPicture
            onError={(error: any) => {
              console.log('Error loading video:', error);
              setDisplayHeight(responsiveFontSize(400));
            }}
          />
  
        </>
      )}
      {ShowDivider && <LineDivider lineStyle={styles.divider}  variant='secondary' />}
    </View>
  );
});

const styles = StyleSheet.create({
  main: {
    width: SIZES.width,
    height: SIZES.height / 2.3,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: SIZES.width,
    marginVertical: SIZES.gapMedium,
  },
  media: {
    width: '90%',
    borderRadius: SIZES.radius * 2,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  mediaEmpty: {
    height: SIZES.height / 2.5,
    width: SIZES.width,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  divider: {
    marginTop: SIZES.gapMedium,
  },
});

export default Covers;