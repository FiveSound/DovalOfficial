import React, { ReactNode } from 'react';
import {
  ImageProps,
  ImageStyle,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import FlexContainer from '../FlexContainer';
import Typography from '../Typography';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { Image, View } from '../../native';
import Buttons from '../Buttons/Buttons';

type Props = {
  labelPart1?: string;
  labelPart2?: string;
  labelStylePart1?: TextStyle;
  labelStylePart2?: TextStyle;
  sublabelStyles?: TextStyle;
  subLabel?: string;
  source?: string;
  ImageStyle?: StyleProp<ImageStyle>;
  Lottiew?: boolean;
  sourceLottiew?: string;
  children?: ReactNode;
  height?: number;
  width?: number;
  ImgWidth?: number;
  ImgHeigth?: number;
  labelButton?: string;
  onPress?: () => void;
  Container?: ViewStyle;
  ShowButton?: Boolean;
  colorVariant?: 'primary' | 'secundary' | 'default';
  top?: boolean;
};

const ScreenEmpty = ({
  labelPart1,
  labelPart2,
  labelStylePart1,
  labelStylePart2,
  subLabel,
  source,
  ImageStyle,
  Lottiew,
  sourceLottiew,
  children,
  height,
  width,
  ImgWidth,
  ImgHeigth,
  labelButton,
  Container,
  onPress,
  ShowButton = true,
  colorVariant = 'default',
  top = true,
  sublabelStyles,
}: Props) => {
  return (
    <FlexContainer
      newStyle={{
        ...styles.container,
        ...Container,
      }}
    >
      {!top && children}
      {!top && (
        <Image
          source={source}
          placeholderSource={source}
          server={false}
          showPlaceholder={true}
          style={{
            ...styles.image,
            ...(ImageStyle as object),
            width: ImgWidth,
            height: ImgHeigth,
          }}
        />
      )}
      
      {/* Separación de los labels */}
      <View style={styles.labelsContainer}>
        <Typography
          variant="subtitle"
          newStyle={[styles.labelOne, labelStylePart1]}
        >
          {labelPart1}
        </Typography>
        <Typography
          variant="title"
          newStyle={[styles.labelOne, labelStylePart2]}
        >
          {labelPart2}
        </Typography>
      </View>
      
      <Typography
        variant="SubDescription"
        newStyle={[styles.subDescription, sublabelStyles]}
      >
        {subLabel}
      </Typography>
      {top && (
        <Image
          source={source}
          placeholderSource={source}
          server={false}
          showPlaceholder={true}
          style={{
            ...(ImageStyle as object),
            width: ImgWidth,
            height: ImgHeigth,
          }}
        />
      )}
      {top && children}
      {ShowButton && <Buttons label={labelButton} onPress={onPress} />}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    gap: SIZES.gapMedium,
  },
  labelsContainer: {
    alignItems: 'center', // Alinea los labels al centro
    marginBottom: SIZES.gapSmall, // Espacio inferior entre los labels y el siguiente elemento
  },
  subtitle: {
    width: SIZES.BtnWidth,
  },
  labelOne: {
    ...FONTS.heading24,
    textAlign: 'center',
    color: COLORS.primary,
  },
  subDescription: {
    width: SIZES.BtnWidth,
    textAlign: 'center',
    ...FONTS.semi21,
  },
  buttonLabel: {
    ...FONTS.h4,
  },
});

export default ScreenEmpty;
