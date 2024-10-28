import React, { memo, useCallback } from 'react';
import Video from './Video/Video';
import { CLOUDFRONT } from '../../../../services';
import { Dimensions } from 'react-native';
import Photo from './Photo/Photo';
import { responsiveFontSize, SIZES } from '../../../../constants/theme';

const screenHeight = Dimensions.get('window').height;

type Props = {
  item: any;
  onVisibleItemChange: (index: number) => void;
  isItemFocused: boolean;
};

const Media = ({ item, onVisibleItemChange, isItemFocused }: Props) => {
  const handleVisibleItemChange = useCallback(
    (index: number) => {
      onVisibleItemChange(index);
    },
    [onVisibleItemChange],
  );

  return item.mediaType === 0 ? (
    <Video
      postID={item.id}
      uri={`${CLOUDFRONT}${item.video}`}
      height={SIZES.height - responsiveFontSize(80)}
      isItemFocused={isItemFocused}
    />
  ) : (
    <Photo
      isItemFocused={isItemFocused}
      postID={item.id}
      DataExplorar={item.photos.map(photo => ({
        uri: photo.uri,
        type: 'photo',
        mediaType: item.mediaType,
        parentId: item.id.toString(),
        key: photo.key,
      }))}
      onVisibleItemChange={handleVisibleItemChange}
    />
  );
};

export default memo(Media);
