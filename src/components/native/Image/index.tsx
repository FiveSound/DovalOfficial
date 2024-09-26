import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Dimensions, ActivityIndicator } from 'react-native'
import { Image as RNImage, ImageProps } from 'expo-image'
// import { IsLoading } from '../../custom/Loaders'

type Props = ImageProps & {
  placeholderSource?: string
  showPlaceholder?: boolean
  server?: boolean
  tintColor?: string
  priority?: 'high' | 'low'
  cachePolicy?: 'memory-disk' | 'disk' | 'memory'
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const Image = ({ placeholderSource, style, showPlaceholder = false, server = true, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  const handleLoad = () => {
    setIsLoading(false)
    console.log('Fade-in animation completed')
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
    })
  }

  const handleError = (error: any) => {
    console.log('Error loading image:', error)
    setHasError(true)
    setIsLoading(false)
  }


  return (
      <View style={[styles.container, style, {
        backgroundColor: showPlaceholder ? server ? '#e1e4e8' : "transparent" : 'transparent',
      }]}>
        {placeholderSource && (
          <RNImage
             tintColor={props.tintColor}
            source={server ? { uri: placeholderSource } : placeholderSource}
            style={[StyleSheet.absoluteFill, styles.placeholder]}
             priority={props.priority}
            cachePolicy={props.cachePolicy}
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
            />
          </Animated.View>
        )}
        {isLoading && !placeholderSource && <ActivityIndicator />}
        {hasError && placeholderSource && (
          <RNImage
            tintColor={props.tintColor}
            source={{ uri: placeholderSource }}
            style={[StyleSheet.absoluteFill, styles.placeholder]}
          />
        )}
      </View>
  )
}

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
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
  },
})

export default React.memo(Image)