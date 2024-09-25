import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
  flexContainer: {
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.gapMedium
  },
  touchableOpacity: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
  },
  businessName: {
    width: SIZES.width / 1.6,
    ...FONTS.heading18
  },
  flexContainerInner: {

  },
  timeSend: {
    width: responsiveFontSize(160),
    marginRight: SIZES.padding,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.radius,
  },
  storeStatus: {
    paddingHorizontal: SIZES.margin,
    borderRadius: SIZES.radius,
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
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    width: responsiveFontSize(140),
  }
});

export default styles;