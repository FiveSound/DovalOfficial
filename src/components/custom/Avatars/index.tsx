import React, { useEffect, useState } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import FlexContainer from '../FlexContainer';
import { PlusSignIcon } from '../../../constants/IconsPro';
import Typography from '../Typography';
import { TouchableOpacity, Image } from '../../native';
import IsLoading from '../Loaders/IsLoading';

type AvatarSize =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge'
  | 'xLarge'
  | 'ModeIcon'
  | 'xxLarge'
  | 'xxLargeProFile'
  | 'xxxLarge';

interface Props {
  source: string;
  size: AvatarSize;
  onPress?: () => void;
  Upload?: boolean;
  IsLoading?: boolean;
  label?: string;
  ShowStatus?: boolean;
  onPressAvatar?: () => void;
  showLabel?: boolean;
}

const avatarSizeMap = {
  ModeIcon: SIZES.icons / 1.6,
  extraSmall: responsiveFontSize(26),
  small: responsiveFontSize(32),
  medium: responsiveFontSize(40),
  large: responsiveFontSize(48),
  extraLarge: responsiveFontSize(56),
  xLarge: responsiveFontSize(64),
  xxLarge: responsiveFontSize(72),
  xxLargeProFile: responsiveFontSize(92),
  xxxLarge: responsiveFontSize(180),
};


const Avatars = React.memo((props: Props) => {
  const {
    source,
    size,
    onPress,
    Upload,
    IsLoading: Loading,
    label,
    ShowStatus = false,
    showLabel = false,
    onPressAvatar,
  } = props;
  const [loader, setLoader] = useState(true);
  const { Bg, Description, Title } = useTheme();

  useEffect(() => {
    if (source) {
      setLoader(true);
      const timer = setTimeout(() => {
        if (source) {
          setLoader(false);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [source]);

  const sizeScaled = scale(avatarSizeMap[size]);
  return loader ? (
    <IsLoading  />
  ) : (
    <>
      <FlexContainer newStyle={styles.containerLabel}>
        <TouchableOpacity
          onPress={onPressAvatar}
          style={[
            styles.touchableOpacity,
            {
              padding: !ShowStatus ? 0 : SIZES.radius2 / 2,
              borderRadius: ShowStatus ? sizeScaled / 8 : sizeScaled,
              borderColor: !ShowStatus ? COLORS.light : Description,
            },
          ]}
        >
          <Image
            placeholderSource={source}
            showPlaceholder={true}
            contentFit="cover"
            priority="high"
            cachePolicy="memory-disk"
            onError={error => console.log('Error al cargar la imagen:', error)}
            style={[
              styles.image,
              {
                width: sizeScaled,
                height: sizeScaled,
                borderRadius: ShowStatus ? sizeScaled / 8 : sizeScaled,
              },
            ]}
          />
        </TouchableOpacity>
        {showLabel && (
          <Typography
            variant="H4title"
            numberOfLines={2}
            newStyle={styles.label}
          >
            {label}
          </Typography>
        )}
      </FlexContainer>
      {Upload && (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.uploadButton,
            {
              backgroundColor: Bg,
            },
          ]}
        >
          <FlexContainer style={styles.plusIconContainer}>
            <PlusSignIcon
              width={SIZES.icons / 1.6}
              height={SIZES.icons / 1.6}
              color={Bg}
            />
          </FlexContainer>
        </TouchableOpacity>
      )}
      {Loading && <IsLoading showLabel={true} label={label} />}
    </>
  );
});

const styles = StyleSheet.create({
  touchableOpacity: {
    // Add any common styles here if needed
  },
  image: {
    // Common image styles
  },
  uploadButton: {
    position: 'absolute',
    padding: SIZES.radius2 / 2,
    borderRadius: SIZES.radiusExtra,
    right: responsiveFontSize(174),
    top: responsiveFontSize(66),
  },
  plusIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusExtra,
    padding: SIZES.radius2 / 2,
  },
  loadingContainer: {},
  containerLabel: {
    alignItems: 'center',
    gap: SIZES.gapMedium,
    justifyContent: 'center',
  },
  label: {
    width: SIZES.width / 5,
    ...FONTS.text14,
  },
});

export default Avatars;
