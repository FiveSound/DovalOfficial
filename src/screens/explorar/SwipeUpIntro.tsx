import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Typography } from '../../components/custom';
import { TouchableOpacity } from '../../components/native';
import i18next from '../../Translate';

type Props = {
  onSwipeUp: () => void;
  isVisible: boolean;
};

const SwipeUpIntro = ({ onSwipeUp, isVisible }: Props) => {
  const handleSwipeUp = () => {
    console.log('User swiped up');
    onSwipeUp();
  };

  return (
    isVisible && (
      <TouchableOpacity style={styles.container} onPress={handleSwipeUp}>
        <LottieView
          source={require('../../../assets/animations/SwipeUp.json')} 
          autoPlay
          loop
          style={styles.animation}
          speed={0.8}
        />
        <Typography 
          variant='H4title'
          newStyle={styles.text}
        >
          {i18next.t('Swipe up for more')}
        </Typography>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  },
  animation: {
    width: SIZES.width * 1.2,
    height: SIZES.height,
  },
  text: {
    ...FONTS.heading32,
    position: 'absolute',
    bottom: SIZES.height / 3.2,
    color: COLORS.TitleColor
  },
});

export default SwipeUpIntro;