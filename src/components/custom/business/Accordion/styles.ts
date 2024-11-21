import { StyleSheet } from 'react-native';
import { FONTS, responsiveFontSize, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    minHeight: responsiveFontSize(40),
    maxHeight: 'auto',
    borderRadius: SIZES.margin / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.margin / 2,
    marginVertical: SIZES.margin / 4,
    paddingHorizontal: SIZES.gapLarge,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: SIZES.width,
    paddingHorizontal: SIZES.margin,
    marginVertical: SIZES.margin / 4,
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  business: {
    ...FONTS.semi18,
  },
  arrow: {
    transform: 'rotate(180deg)',
    width: SIZES.icons,
    height: SIZES.icons,

  },
  arrowUp: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
  dropdown: {
    width: '100%',
    paddingTop: responsiveFontSize(5),
    paddingBottom: responsiveFontSize(5),
    borderRadius: SIZES.radius,
    marginTop: SIZES.radius,
    backgroundColor: 'transparent',
  },
  hiddenContainer: {
    position: 'absolute',
    top: -1000,
    left: 0,
    right: 0,
    opacity: 0,
  },
  checkbox: {
    width: 0,
    paddingHorizontal: 0,
    marginRight: SIZES.gapLarge * 1.5,
  },
});

export default styles;
