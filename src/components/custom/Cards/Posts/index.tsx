import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllReactions } from '../../../../services/posts';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import {
  Album02Icon,
  PlayIcon,
  VideoReplayIcon,
} from '../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../utils/format';
import { TouchableOpacity, View, Image } from '../../../native';
import { StyleSheet } from 'react-native';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { CLOUDFRONT } from '../../../../services';

type Row = {
  id: number;
  mediaType: number;
  thumbnail: string;
};

type Props = {
  row: Row;
  onPress: () => void;
  posterHeight: number;
  posterWidth: number;
};

const CardPosts = ({ row, onPress, posterHeight, posterWidth }: Props) => {
  const [visualizations, setVisualizations] = useState<{
    visualizations: number;
  } | null>(null);

  const fetchReactions = useCallback(async () => {
    try {
      await getAllReactions(row.id, setVisualizations);
    } catch (error) {
      console.error('Failed to fetch reactions', error);
    }
  }, [row]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const formattedVisualizations = useMemo(
    () => formatMilesAndMillions(visualizations?.visualizations || 0),
    [visualizations],
  );

  if (row) {
    const { thumbnail, mediaType } = row;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <FlexContainer newStyle={styles.Icons}>
          {mediaType === 0 ? (
            <VideoReplayIcon
              width={SIZES.icons / 1.4}
              height={SIZES.icons / 1.4}
              color={COLORS.light}
            />
          ) : (
            <Album02Icon
              width={SIZES.icons / 1.4}
              height={SIZES.icons / 1.4}
              color={COLORS.light}
            />
          )}
        </FlexContainer>
        <FlexContainer newStyle={styles.containerIcons}>
          <PlayIcon
            width={SIZES.icons / 1.4}
            height={SIZES.icons / 1.4}
            color={COLORS.light}
          />
          <Typography variant="SubDescription" newStyle={styles.typography}>
            {formattedVisualizations}
          </Typography>
        </FlexContainer>
        <Image
          placeholderSource={`${CLOUDFRONT}${thumbnail}`}
          cachePolicy="memory-disk"
          showPlaceholder={true}
          priority="high"
          style={{
            width: posterWidth,
            height: posterHeight,
          }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0.24)']}
          style={{
            position: 'absolute',
            width: posterWidth,
            height: posterHeight,
            zIndex: 2,
          }}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: responsiveFontSize(172),
  },
  containerIcons: {
    position: 'absolute',
    left: responsiveFontSize(4),
    bottom: responsiveFontSize(2),
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icons: {
    position: 'absolute',
    right: responsiveFontSize(4),
    top: responsiveFontSize(2),
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typography: {
    ...FONTS.semi14,
    color: COLORS.TitleColor,
    fontWeight: 'bold',
  },
});

export default CardPosts;
