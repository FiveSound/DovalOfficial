import { Dimensions, PixelRatio, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  ///Transparent
  BackgroundMain: '#09090b',
  BackgroundMainLight: '#F9F9F9',
  backgroundMaingrey: '#181818',
  backgroundMaingreyLight: '#ECECEC',
  TranspDark: 'rgba(0, 0, 0, 0.6)',
  MainTransparents: 'rgba(255, 255, 255, 0.1)',
  TranspLight: 'rgba(255, 255, 255, 0.8)',
  TranspDarkSecundary: 'rgba(255, 255, 255, 0.2)',
  Description: '#616161',
  DescriptionLight: '#5A5A5A',
  BorderLineLight: '#D1D1D1',
  visa: '#1A1F71',
  mastercard: '#FF5F00',
  amex: '#2E77BB',

  // ErrorLight
  error: '#f31260',
  error80: '#610726',
  error60: '#c20e4d',
  error70: '#920b3a',
  error20: '#faa0bf',
  error90: '#310413',
  error30: '#f871a0',
  error40: '#f54180',
  backError: '#FFF0E6',

  // ErrorDark
  errorDark: '#f31260',
  error80Dark: '#fdd0df',
  error60Dark: '#f871a0',
  error70Dark: '#faa0bf',
  error20Dark: '#920b3a',
  error90Dark: '#310413',
  error30Dark: '#c20e4d',
  error40Dark: '#f31260',

  // Primary Light
  primary: '#FF5F00',
  primary80: '#B45A1E',
  primary60: '#8A4319',
  primary70: '#A24F1C',
  primary20: '#FAD199',
  primary90: '#703315',
  primary30: '#F7B46F',
  primary40: '#F39B3B',

  // Primary Dark
  primaryDark: '#FF5500',
  primaryDark50: '#fff7ed',
  primaryDark100: '#ffedd5',
  primaryDark200: '#fed7aa',
  primaryDark300: '#fdba74',
  primaryDark400: '#fb923c',
  primaryDark500: '#f97316',
  primaryDark600: '#ea580c',
  primaryDark700: '#c2410c',
  primaryDark800: '#9a3412',
  primaryDark900: '#7c2d12',
  primaryDark950: '#432007',

  // Success Light
  success: '#17c964',
  success80: '#128A4A',
  success60: '#0D8030',
  success70: '#116D3D',
  success20: '#8CE6B1',
  success90: '#085C16',
  success30: '#4FD391',
  success40: '#2BC176',
  backSuccess: '#E7F7EF',

  // Success Dark
  successDark: '#17c964',
  success80Dark: '#8CE6B1',
  success60Dark: '#4FD391',
  success70Dark: '#6ED8A6',
  success20Dark: '#116D3D',
  success90Dark: '#085C16',
  success30Dark: '#2BC176',
  success40Dark: '#17c964',
  backSuccessDark: '#028a4a',

  // Dark
  dark: '#000000',
  dark2: '#0D0D0D',
  dark60: 'rgba(13, 15, 35, 0.6)',
  dark20: 'rgba(13, 15, 35, 0.2)',
  dark08: 'rgba(13, 15, 35, 0.08)',
  skeletonDark: '#0D0D0D',
  BgDark: '#181818',

  // Grey
  grey: '#d4d4d8',
  grey70: '#3F3F46',
  grey80: '#27272A',
  grey60: '#52525B',
  grey20: '#e4e4e7',
  grey30: '#d4d4d8',
  grey08: '#27272A',
  grey50: '#fafafa',
  grey100: '#f4f4f5',
  grey400: '#a1a1aa',
  grey500: '#71717a',
  grey600: '#52525b',
  grey700: '#3f3f46',
  grey800: '#27272a',
  grey900: '#18181b',
  grey200: '##e4e4e7',

  // GreyDark
  greyDark: '#d4d4d8',
  grey70Dark: '#3F3F46',
  grey80Dark: '#27272A',
  grey60Dark: '#52525B',
  grey20Dark: '#e4e4e7',
  grey30Dark: '#52525b',
  grey08Dark: '#27272A',
  grey50Dark: '#18181b',
  grey100Dark: '#27272a',
  grey400Dark: '#71717a',
  grey500Dark: '#a1a1aa',
  grey600Dark: '#d4d4d8',
  grey700Dark: '#e4e4e7',
  grey800Dark: '#f4f4f5',
  grey900Dark: '#fafafa',
  greyDark200: '#3f3f46',

  // Light Grey
  lightGrey: 'rgba(247, 247, 247, 1)',
  lightGrey80: 'rgba(247, 247, 247, 0.8)',
  lightGrey60: 'rgba(247, 247, 247, 0.6)',
  lightGrey20: 'rgba(247, 247, 247, 0.2)',
  lightGrey08: 'rgba(247, 247, 247, 0.08)',

  // Light
  light: '#fff',
  light80: 'rgba(255, 255, 255, 0.8)',
  light60: 'rgba(255, 255, 255, 0.6)',
  light20: 'rgba(255, 255, 255, 0.2)',
  light08: 'rgba(255, 255, 255, 0.08)',
  skeletonLight: '#EEEEEE',
  TitleColor: '#FAFAFA',

  //ColorsInputDark
  BgInput: '#101010',
  BorderInput: '#282828',

  //ColorsInputLight
  BgInputLight: '#F6F3F7',
  BorderInputLight: '#D1D1D1',

  // Support 1
  support1: 'rgba(110, 162, 255, 1)',
  support1_08: 'rgba(110, 162, 255, 0.08)',

  // Support 2
  support2: 'rgba(249, 161, 218, 1)',
  support2_08: 'rgba(249, 161, 218, 0.08)',

  // Support 3
  support3: 'rgba(0, 210, 224, 1)',
  support3_08: 'rgba(0, 210, 224, 0.08)',

  // Support 4
  support4: 'rgba(255, 132, 13, 1)',
  support4_08: 'rgba(255, 132, 13, 0.08)',

  // Support 5
  support5: 'rgba(123, 96, 238, 1)',
  support5_08: 'rgba(123, 96, 238, 0.08)',

  // Shadow
  shadow: 'rgba(138, 149, 158, 1)',
  shadow08: 'rgba(138, 149, 158, 0.08)',
};

export const GreyLight = {
  grey: COLORS.grey,
  grey70: COLORS.grey70,
  grey80: COLORS.grey80,
  grey60: COLORS.grey60,
  grey20: COLORS.grey20,
  grey30: COLORS.grey30,
  grey08: COLORS.grey08,
  grey50: COLORS.grey50,
  grey100: COLORS.grey100,
  grey400: COLORS.grey400,
  grey500: COLORS.grey500,
  grey600: COLORS.grey600,
  grey700: COLORS.grey700,
  grey800: COLORS.grey800,
  grey900: COLORS.grey900,
  grey200: COLORS.grey200,
};

export const GreyDark = {
  grey: COLORS.greyDark,
  grey70: COLORS.grey70Dark,
  grey80: COLORS.grey80Dark,
  grey60: COLORS.grey60Dark,
  grey20: COLORS.grey20Dark,
  grey30: COLORS.grey30Dark,
  grey08: COLORS.grey08Dark,
  grey50: COLORS.grey50Dark,
  grey100: COLORS.grey100Dark,
  grey400: COLORS.grey400Dark,
  grey500: COLORS.grey500Dark,
  grey600: COLORS.grey600Dark,
  grey700: COLORS.grey700Dark,
  grey800: COLORS.grey800Dark,
  grey900: COLORS.grey900Dark,
  grey200: COLORS.greyDark200,
};

export const ErrorLight = {
  error: COLORS.error,
  error80: COLORS.error80,
  error60: COLORS.error60,
  error70: COLORS.error70,
  error20: COLORS.error20,
  error90: COLORS.error90,
  error30: COLORS.error30,
  error40: COLORS.error40,
};

export const ErrorDark = {
  error: COLORS.errorDark,
  error80: COLORS.error80Dark,
  error60: COLORS.error60Dark,
  error70: COLORS.error70Dark,
  error20: COLORS.error20Dark,
  error90: COLORS.error90Dark,
  error30: COLORS.error30Dark,
  error40: COLORS.error40Dark,
};

export const SuccessLight = {
  success: COLORS.success,
  success80: COLORS.success80,
  success60: COLORS.success60,
  success70: COLORS.success70,
  success20: COLORS.success20,
  success90: COLORS.success90,
  success30: COLORS.success30,
  success40: COLORS.success40,
};

export const SuccessDark = {
  success: COLORS.successDark,
  success80: COLORS.success80Dark,
  success60: COLORS.success60Dark,
  success70: COLORS.success70Dark,
  success20: COLORS.success20Dark,
  success90: COLORS.success90Dark,
  success30: COLORS.success30Dark,
  success40: COLORS.success40Dark,
};

export const responsiveFontSize = (fontSize: number): number => {
  const { width, height } = Dimensions.get('window');
  const standardScreenHeight = 812;
  const standardScreenWidth = 375;

  const scaleWidth = width / standardScreenWidth;
  const scaleHeight = height / standardScreenHeight;
  const scale = Math.min(scaleWidth, scaleHeight);

  // Ajuste específico para Android si es necesario
  const adjustmentFactor = Platform.OS === 'android' ? 0.92 : 0.88;

  const scaledFontSize = fontSize * scale * adjustmentFactor;

  return Math.round(PixelRatio.roundToNearestPixel(scaledFontSize));
};

export const SIZES = {
  base: responsiveFontSize(6),
  font: responsiveFontSize(12),
  smallRadius: responsiveFontSize(2),
  radius: responsiveFontSize(4),
  radius2: responsiveFontSize(4),
  radiusExtra: responsiveFontSize(18),
  borderWidth: responsiveFontSize(1),
  padding: responsiveFontSize(22),
  margin: responsiveFontSize(18),
  icons:
    Platform.OS === 'ios' ? responsiveFontSize(24) : responsiveFontSize(24),
  iconsPro:
    Platform.OS === 'ios' ? responsiveFontSize(16) : responsiveFontSize(16),
  gapSmall: responsiveFontSize(4),
  gapMedium: responsiveFontSize(8),
  gapLarge: responsiveFontSize(12),

  // font sizes
  largeTitle: responsiveFontSize(20),
  h1: responsiveFontSize(21),
  h2: responsiveFontSize(18),
  h3: responsiveFontSize(16),
  h4: responsiveFontSize(14),
  h5: responsiveFontSize(12),
  h6: responsiveFontSize(30),
  body1: responsiveFontSize(21),
  body2: responsiveFontSize(18),
  body3: responsiveFontSize(16),
  body4: responsiveFontSize(14),
  body5: responsiveFontSize(12),
  Border: responsiveFontSize(10),

  // heading
  heading44: responsiveFontSize(44),
  heading32: responsiveFontSize(32),
  heading24: responsiveFontSize(24),
  heading21: responsiveFontSize(21),
  heading18: responsiveFontSize(18),

  // bold

  // text-semi
  semi21: responsiveFontSize(21),
  semi18: responsiveFontSize(18),
  semi16: responsiveFontSize(16),
  semi14: responsiveFontSize(14),
  semi12: responsiveFontSize(12),

  // text-medium
  medium16: responsiveFontSize(16),
  medium14: responsiveFontSize(14),

  // text
  text16: responsiveFontSize(16),
  text14: responsiveFontSize(14),
  text12: responsiveFontSize(12),

  // app dimensions
  width,
  height,

  // Buttons
  BtnWidth: width * 0.92,
  BtnHeight: responsiveFontSize(44),
  InputsHeight: responsiveFontSize(38),
};

export const FONTS = {
  // heading
  heading44: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.heading44,
    lineHeight: responsiveFontSize(44),
  },
  heading32: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.heading32,
    lineHeight: responsiveFontSize(32),
  },
  heading24: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.heading24,
    lineHeight: SIZES.heading24,
  },
  heading21: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.heading21,
    lineHeight: SIZES.heading21 * 1.6,
  },
  heading18: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.heading18,
    lineHeight: SIZES.heading18 * 1.6,
  },

  // bold

  // text-semi
  semi21: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.semi21,
    lineHeight: responsiveFontSize(28),
  },

  semi18: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.semi18,
    lineHeight: responsiveFontSize(28),
  },

  semi16: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.semi16,
    lineHeight: responsiveFontSize(24),
  },
  semi14: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.semi14,
    lineHeight: responsiveFontSize(20),
  },
  semi12: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.semi12,
    lineHeight: responsiveFontSize(14),
  },

  // text-medium
  medium16: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: SIZES.medium16,
    lineHeight: responsiveFontSize(18),
  },
  medium14: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: SIZES.medium14,
    lineHeight: responsiveFontSize(18),
  },

  // text
  text16: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.text16,
    lineHeight: responsiveFontSize(20),
  },

  text14: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.text14,
    lineHeight: SIZES.text14 * 1.2,
  },

  text12: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.text12,
    lineHeight: responsiveFontSize(14),
  },

  LargeTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.largeTitle,
    lineHeight: responsiveFontSize(28),
  },
  h1: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h1,
    lineHeight: responsiveFontSize(24),
  },
  h2: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h2,
    lineHeight: responsiveFontSize(20),
  },
  h3: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.h3,
    lineHeight: responsiveFontSize(14),
  },
  h4: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.h4,
    lineHeight: responsiveFontSize(14),
  },
  h5: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.h5,
    lineHeight: responsiveFontSize(12),
  },
  h6: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: SIZES.h6,
    lineHeight: responsiveFontSize(10),
  },
  body1: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body1,
    lineHeight: responsiveFontSize(24),
  },
  body2: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body2,
    lineHeight: responsiveFontSize(18),
  },
  body3: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body3,
    lineHeight: responsiveFontSize(18),
  },
  body4: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: SIZES.body4,
    lineHeight: responsiveFontSize(12),
  },
  body5: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: SIZES.body5,
    lineHeight: responsiveFontSize(10),
  },
};

export const darkTheme = {
  primary: COLORS.primary,
  color: COLORS.light,
  backgroundColor: COLORS.dark,
  bgInput: COLORS.BgInput,
  borderInput: COLORS.BorderInput,
  TextGray: COLORS.grey80,
  BgSkeleton: COLORS.skeletonDark,
};

export const lightTheme = {
  primary: COLORS.primary,
  color: COLORS.dark,
  backgroundColor: COLORS.light,
  bgInput: COLORS.BgInputLight,
  borderInput: COLORS.BorderInputLight,
  TextGray: COLORS.grey80,
  BgSkeleton: COLORS.skeletonLight,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
