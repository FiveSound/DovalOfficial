import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  Text
} from 'react-native';
import { Image as RNImage, ImageProps } from 'expo-image';
import { Skeleton } from 'moti/skeleton';

type Props = ImageProps & {
  placeholderSource?: string;
  showPlaceholder?: boolean;
  server?: boolean;
  tintColor?: string;
  priority?: 'high' | 'low';
  cachePolicy?: 'memory-disk' | 'disk' | 'memory';
  retryLimit?: number;
  retryDelay?: number;
  source?: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ImageComponent: React.FC<Props> = ({
  source,
  placeholderSource = source,
  style,
  showPlaceholder = true,
  server = true,
  retryLimit = 3,
  retryDelay = 1000,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleError = useCallback(
    (error: any) => {
      console.error('Error loading image:', error);
      if (retryCount < retryLimit) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          setRetryCount(prev => prev);
        }, retryDelay);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    },
    [retryCount, retryLimit, retryDelay],
  );

  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);
  }, []);

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: showPlaceholder
            ? server
              ? '#e1e4e8'
              : 'transparent'
            : 'transparent',
        },
      ]}
    >
      {placeholderSource && (
        <RNImage
          tintColor={props.tintColor}
          source={server ? { uri: placeholderSource } : placeholderSource}
          style={[StyleSheet.absoluteFill, styles.placeholder]}
          priority={props.priority}
          cachePolicy={props.cachePolicy}
          transition={0}
        />
      )}
      {!hasError && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <RNImage
            {...props}
            onLoad={handleLoad}
            onError={handleError}
            tintColor={props.tintColor}
            priority={props.priority}
            cachePolicy={props.cachePolicy}
            style={[StyleSheet.absoluteFill, styles.image]}
            transition={0}
          />
        </Animated.View>
      )}
      {isLoading && !placeholderSource && (
        <Loading
          isLoading={isLoading}
          height={SCREEN_WIDTH * 0.75}
          width={SCREEN_WIDTH}
        />
      )}
      {hasError && placeholderSource && (
        <View style={styles.errorContainer}>
          <RNImage
            tintColor={props.tintColor}
            source={{ uri: placeholderSource }}
            style={[StyleSheet.absoluteFill, styles.placeholder]}
          />
          <TouchableOpacity onPress={retryLoad} style={styles.retryButton}>
            <Text>Try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

interface LoadingProps {
  isLoading: boolean;
  height: number;
  width: number;
}
export const Loading = ({ isLoading, height, width }: LoadingProps) => {
  const theme = useColorScheme();
  return (
    <Skeleton
      show={isLoading}
      height={height}
      width={width}
      transition={{ type: 'spring', duration: 1000 }}
      colorMode={theme === 'light' ? 'light' : 'dark'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loader: {
    position: 'absolute',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
  },
  retryIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default React.memo(ImageComponent);
