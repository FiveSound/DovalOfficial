import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
  flexContainer: {
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.gapMedium,
    marginVertical: SIZES.gapMedium,
    width: "98%",
    alignSelf: "center"
  },
  touchableOpacity: {
    alignItems: "center",
    height: "auto",
    paddingVertical: SIZES.gapMedium,
    flexDirection: 'row',
    gap: SIZES.gapLarge
  },
  businessName: {
    width: SIZES.width / 1.6,
    ...FONTS.semi16
  },
  flexContainerInner: {

  },
  timeSend: {
    width: SIZES.width / 1.5,
    marginRight: SIZES.padding,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.radius,
  },
  storeStatus: {
    color: COLORS.error,
    marginBottom: SIZES.gapSmall
  },
  storeStatusText: {
    color: COLORS.dark,
  },
  flexContainerRow: {
    width: "auto",
    alignItems: 'center'
  },
  ratingContainer: {
    alignItems: "center",
    gap: SIZES.gapSmall,
    width: "auto",
  },
  ratingText: {
    marginLeft: SIZES.padding,
    ...FONTS.semi16
  },
  favouriteIconContainer: {
    flexDirection: "row",
  },
  lineDivider: {
    height: responsiveFontSize(1),
  },
  buttonscontainer: {
    backgroundColor: COLORS.primary,
    width: responsiveFontSize(140),
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    marginVertical: SIZES.gapMedium
  },
  buttonscontainerOthers: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    marginVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center'
  },
  openClose: {
    marginLeft: SIZES.gapSmall,
    color: COLORS.dark
  }
});

export default styles;