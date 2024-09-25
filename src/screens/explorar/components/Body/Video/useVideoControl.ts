import { useEffect, useRef, useState, useCallback } from 'react';
import { Video as TypeVideo } from 'expo-av';
import { useSelector } from 'react-redux';

const useVideoControl = (uri: string, isItemFocused: boolean) => {
  
  const videoRef = useRef<TypeVideo>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const reloadVideo = useCallback(() => {
    console.log('Reloading video with URI:', uri);
    if (videoRef.current) {
      videoRef.current.unloadAsync().then(() => {
        videoRef.current.loadAsync({ uri: uri }, {}, false);
      });
    }
  }, [uri]);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        if (isItemFocused) {
          // console.log('Playing video because isFocused is true');
          await videoRef.current.playAsync();
          await videoRef.current.setVolumeAsync(1.0);
          setIsPlaying(true);
        } else {
          // console.log('Pausing video because isFocused is false');
          await videoRef.current.pauseAsync();
          setIsPlaying(false);
        }
      }
    };

    // console.log('useEffect triggered with isFocused:', isFocused);
    playVideo();
  }, [isItemFocused]);

  const togglePlayPause = useCallback(() => {
    // console.log('Toggling play/pause. Current isPlaying state:', isPlaying);
    if (isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return { videoRef, isPlaying, reloadVideo, togglePlayPause };
};

export default useVideoControl;