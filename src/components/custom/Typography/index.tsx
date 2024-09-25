import React from 'react';
import { TextProps, StyleSheet, TextStyle } from 'react-native';
import { FONTS , COLORS} from '../../../constants/theme';
import { Text } from '../../native';
import { useTheme } from '../../../hooks';
type Props = {
  variant: 'title' | 'subtitle' | 'H4title' | 'description' | 'SubDescription';
  newStyle?: TextStyle
  children: React.ReactNode;
} & TextProps;

const Typography = ({ variant, children, newStyle, ...textProps }: Props) => {
const {Title} = useTheme()
  let style;
  switch (variant) {
    case 'title':
      style = [ styles.title, {color: Title}, newStyle]
      break;
    case 'subtitle':
      style = [styles.subtitle, {color: Title}, newStyle ]
      break;
      case 'H4title':
      style = [styles.H4title,{color: Title}, newStyle ]
      break;
    case 'description':
        style = [styles.description, {color: COLORS.Description}, newStyle]
      break;
      case 'SubDescription':
        style = [styles.subDescription, {color: COLORS.Description}, newStyle]
      break;
    default:
      style = {};
  }

  return <Text style={[style, textProps.style]} {...textProps}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
   ...FONTS.semi18,
  },
  subtitle: {
    ...FONTS.semi16,
  },
  H4title: {
    ...FONTS.semi14,
  },
  description: {
    ...FONTS.body3,
  },
  subDescription: {
    ...FONTS.text14,
  },
});

export default Typography;