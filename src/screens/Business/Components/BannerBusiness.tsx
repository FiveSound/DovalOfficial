import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { Avatars, FlexContainer } from '../../../components/custom';
import { Image } from '../../../components/native';
import { CLOUDFRONT } from '../../../services';
type Props = {
  banner: string;
  avatar: string;
};

const BannerBusiness = (props: Props) => {
  const { banner, avatar } = props;
  const bannerBusiness = `${CLOUDFRONT}${banner}`;
  const avatarBusiness = `${CLOUDFRONT}${avatar}`;

  return (
    <FlexContainer>
      <Image
        cachePolicy="memory-disk"
        priority="high"
        style={styles.banner}
        contentFit="cover"
        showPlaceholder={true}
        // placeholderSource={bannerBusiness}
      />
      <FlexContainer style={styles.containerAvatar}>
        <Avatars source={avatarBusiness} size="large" ShowStatus={false} />
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: SIZES.width,
    height: SIZES.height / 8,
    borderBottomEndRadius: SIZES.gapLarge,
    borderBottomStartRadius: SIZES.gapLarge,
  },
  containerAvatar: {
    position: 'relative',
    backgroundColor: 'transparent',
    left: SIZES.width / 14,
    width: responsiveFontSize(58),
    height: responsiveFontSize(20),
    borderRadius: responsiveFontSize(48),
    bottom: SIZES.height / 40,
  },
});
export default BannerBusiness;
