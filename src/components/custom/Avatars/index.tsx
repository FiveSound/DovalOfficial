import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
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

const isTablet = Math.min(SIZES.width, SIZES.height) >= 768;
const avatarSizeMap = {
  ModeIcon: SIZES.icons / 1.6,
  extraSmall: isTablet ? responsiveFontSize(26) : responsiveFontSize(20),
  small: isTablet ? responsiveFontSize(12) : responsiveFontSize(24),
  medium: isTablet ? responsiveFontSize(16) : responsiveFontSize(32),
  large: isTablet ? responsiveFontSize(24) : responsiveFontSize(36),
  extraLarge: isTablet ? responsiveFontSize(28) : responsiveFontSize(40),
  xLarge: isTablet ? responsiveFontSize(32) : responsiveFontSize(48),
  xxLarge: isTablet ? responsiveFontSize(36) : responsiveFontSize(56),
  xxLargeProFile: responsiveFontSize(12),
  xxxLarge: isTablet ? responsiveFontSize(60) : responsiveFontSize(120),
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
  const memoizedAvatar = useMemo(() => source, [source]);

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

  const sizeScaled = responsiveFontSize(avatarSizeMap[size]);
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
            placeholderSource={memoizedAvatar}
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
