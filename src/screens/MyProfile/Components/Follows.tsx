import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks';
import { FlexContainer, Typography } from '../../../components/custom';
import { FONTS, SIZES } from '../../../constants/theme';
import i18next from '../../../Translate';
import { memo } from 'react';

type Props = {
  data: {
    followers?: number;
    following?: number;
    posts?: number;
  };
  onPressPosts?: () => void;
  onPressFollowing?: () => void;
  onPressFollowers?: () => void;
};

const Follows = ({
  data,
  onPressFollowing,
  onPressFollowers,
  onPressPosts,
}: Props) => {
  const { Title, Description } = useTheme();
  return (
    <FlexContainer newStyle={styles.flexContainer}>
      <TouchableOpacity onPress={onPressPosts} style={styles.touchable}>
        <FlexContainer newStyle={styles.view}>
          <Typography variant="H4title" newStyle={styles.typography}>
            {data?.posts || 0}
          </Typography>
          <Typography
            newStyle={{ color: Description }}
            variant="SubDescription"
          >
            Post
          </Typography>
        </FlexContainer>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressFollowers} style={styles.touchable}>
        <FlexContainer newStyle={styles.view}>
          <Typography variant="H4title" newStyle={styles.typography}>
            {data?.followers || 0}
          </Typography>
          <Typography
            newStyle={{ color: Description }}
            variant="SubDescription"
          >
            {i18next.t('Followers')}
          </Typography>
        </FlexContainer>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressFollowing} style={styles.touchable}>
        <FlexContainer newStyle={styles.view}>
          <Typography
            variant="H4title"
            newStyle={{ ...styles.typography, color: Title }}
          >
            {data?.following || 0}
          </Typography>
          <Typography
            newStyle={{ color: Description }}
            variant="SubDescription"
          >
            {i18next.t('Following')}
          </Typography>
        </FlexContainer>
      </TouchableOpacity>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: SIZES.width,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    paddingHorizontal: SIZES.gapMedium,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  typography: {
    ...FONTS.heading18,
  },
});

export default memo(Follows);
