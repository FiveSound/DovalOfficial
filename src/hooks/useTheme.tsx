import { useColorScheme } from 'react-native';
import { COLORS, darkTheme, lightTheme } from '../constants/theme';

const useTheme = () => {
  const theme = useColorScheme();
  const isDark = theme == 'dark';

  const Bg = isDark ? darkTheme.backgroundColor : lightTheme.backgroundColor;
  const color = isDark ? COLORS.TitleColor : '#2C2C2C';
  const borderInput = isDark ? darkTheme.borderInput : lightTheme.borderInput;
  const bgInput = theme === 'dark' ? darkTheme.bgInput : lightTheme.bgInput;
  const mode: any = isDark ? 'dark' : 'light';
  const border = isDark ? darkTheme.borderInput : lightTheme.borderInput;
  const greyText = isDark ? '#d4d4d8' : '#E8E8E8';
  const divider = isDark ? '#ffffff26' : '#11111126';
  const BgTransparent = isDark
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(255, 255, 255, 0.1)';
  const BackSecundary = isDark ? COLORS.BgDark : lightTheme.backgroundColor;
  const BackgroundMain = isDark
    ? COLORS.BackgroundMain
    : COLORS.BackgroundMainLight;
  const backgroundMaingrey = isDark
    ? COLORS.backgroundMaingrey
    : COLORS.backgroundMaingreyLight;
  const Title = isDark ? COLORS.TitleColor : '#2C2C2C';
  const Description = isDark ? COLORS.Description : COLORS.DescriptionLight;
  const TransBack = isDark ? COLORS.TranspDark : COLORS.TranspDark;
  const backSuccess = isDark ? COLORS.success20Dark : COLORS.backSuccess;

  return {
    Bg,
    borderInput,
    bgInput,
    mode,
    color,
    border,
    greyText,
    divider,
    BgTransparent,
    BackSecundary,
    BackgroundMain,
    backgroundMaingrey,
    Description,
    Title,
    TransBack,
    backSuccess,
  };
};

export default useTheme;
