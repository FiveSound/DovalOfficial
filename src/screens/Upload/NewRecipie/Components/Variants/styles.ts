import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../../../constants/theme";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.gapLarge,
  },
  variant: {
    marginVertical: SIZES.gapLarge,
    width: "100%",
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    gap: SIZES.gapSmall,
  },
  variantHeader: {
    marginBottom: SIZES.gapSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: SIZES.BtnWidth,
    gap: SIZES.gapMedium
  },
  variantSubVariant: {
    marginBottom: SIZES.gapSmall,
    padding: SIZES.gapSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'transparent',
  },
  variantButton: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#C8C8C8",
  },
  variantButtonText: {
    fontWeight: "bold",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapSmall,
    justifyContent: 'flex-start'
  },
  texteDelete: {
    color: COLORS.error
  },
  inputVariant: {
...FONTS.heading18,
  width: SIZES.BtnWidth / 1.7,
  color: COLORS.dark
  },
  variantSubVariantPrice: {
    flexDirection: "row",
    gap: SIZES.gapSmall,
    alignItems: "center",
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  variantSubVariantName: {
    flexDirection: "row",
    gap: SIZES.gapMedium,
    alignItems: "center",
    backgroundColor: 'transparent'
  },
  inputVariantInput: {
    ...FONTS.text14
  },
  lineDivider: {
    width: SIZES.width,
    alignSelf: 'center'
  }
});
