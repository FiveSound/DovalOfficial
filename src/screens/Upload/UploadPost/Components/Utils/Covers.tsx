import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {  responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { CLOUDFRONT } from '../../../../../services';
import { Ilustrations } from '../../../../../constants';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Typography } from '../../../../../components/custom';

interface MediaItem {
  key: string;
  type: 'photo' | 'video';
  id: string;
  extension?: string;
}

interface CoversProps {
  data: MediaItem[];
  ShowDivider?: boolean;
}

const Covers = React.memo(({ data, ShowDivider = false }: CoversProps) => {
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const [imageSize, setImageSize] = useState<number>(0);
  const thumbnail = data || ''
  const imgSource = `${CLOUDFRONT}${thumbnail}`

  
 
  useEffect(() => {
    if (imgSource) {
      Image.getSize(
        imgSource,
        (width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const desiredWidth = screenWidth / 1.4;
          const calculatedHeight = (height / width) * desiredWidth;
          console.log('calculatedHeight', calculatedHeight)
          setDisplayHeight(calculatedHeight);
        },
        (error) => {
          console.log('Error fetching image size:', error);
          setDisplayHeight(responsiveFontSize(400)); 
        }
      );
    }

     if (imgSource) {
      console.log('optimizedImage', imgSource)
      fetch(imgSource, { method: 'HEAD' })
      .then(response => {

        const contentLength = response.headers.get('Content-Length');
        console.log('contentLength', contentLength)
        if (contentLength) {
          const sizeInBytes = parseInt(contentLength, 10);
          const sizeInMB = sizeInBytes / (1024 * 1024); 
          setImageSize(sizeInBytes);
          console.log(`Tamaño de la imagen: ${sizeInMB.toFixed(2)} MB`);
        }
      })
      .catch(err => {
          console.error('Error obteniendo el tamaño de la imagen:', err);
        });
    }
  }, [imgSource]);



  if (data?.length === 0 || 0) {
    return (
      <Image
        source={Ilustrations.EmptyMedia}
        style={styles.mediaEmpty}
        resizeMode="cover"
      />
    );
  }

  if (data) {
    return (
     <>
      <Image
      source={{ uri: imgSource }}
      style={[styles.media, { height: displayHeight }]}
      resizeMode="cover"
    />
    </>
    );
  }
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
    width: "90%",
    borderRadius: SIZES.radius * 2,
    alignSelf: 'center',
  },
  mediaEmpty: {
    height: SIZES.height / 2.5,
    width: SIZES.width,
  },
});

export default Covers;
