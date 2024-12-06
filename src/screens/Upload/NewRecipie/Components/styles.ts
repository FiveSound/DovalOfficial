import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

/**
 * Estilos para el componente Variant.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.gapLarge,
    backgroundColor: COLORS.BackgroundMainLight,
  },
  variant: {
    marginVertical: SIZES.gapLarge,
    width: "100%",
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    gap: SIZES.gapSmall,
    justifyContent: "space-between",
    backgroundColor: COLORS.light,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  deleteButton: {
    alignSelf: "flex-end",
    padding: SIZES.gapSmall,
  },
  variantHeader: {
    marginBottom: SIZES.gapMedium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: SIZES.gapMedium,
  },
  inputContainer: {
    flex: 1,
    position: "relative",
  },
  inputVariant: {
    ...FONTS.heading18,
    color: COLORS.dark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey08,
    paddingVertical: SIZES.gapSmall,
    paddingRight: SIZES.gapLarge,
  },
  limitContainer: {
    paddingHorizontal: SIZES.gapLarge,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapSmall,
  },
  label: {
    ...FONTS.text16,
    color: COLORS.dark,
  },
  limitInput: {
    ...FONTS.semi18,
    width: 40,
    textAlign: "center",
    color: COLORS.dark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey08,
    paddingVertical: 5,
  },
  counterButton: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.backgroundMaingreyLight,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    ...FONTS.text16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapSmall,
    justifyContent: "flex-start",
  },
  requiredLabel: {
    ...FONTS.text16,
    color: COLORS.dark,
  },
  texteDelete: {
    ...FONTS.text16,
    color: COLORS.error,
    fontWeight: "bold",
  },
  subVariantContainer: {
    marginVertical: SIZES.gapSmall,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGrey,
    padding: SIZES.gapSmall,
  },
  variantSubVariant: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.gapMedium,
    width: "100%",
  },
  deleteSubVariantButton: {
    padding: SIZES.gapSmall,
  },
  variantSubVariantName: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapSmall,
    flex: 2,
  },
  variantSubVariantPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapSmall,
    flex: 1,
  },
  inputVariantInput: {
    ...FONTS.text14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey08,
    paddingVertical: 5,
    flex: 1,
    color: COLORS.dark,
  },
  priceLabel: {
    ...FONTS.text16,
    color: COLORS.dark,
  },
  lineDivider: {
    width: "100%",
    alignSelf: "center",
    marginVertical: SIZES.gapSmall,
    backgroundColor: COLORS.grey08,
    height: 1,
    borderRadius: 1,
  },
  containerButton: {
    width: SIZES.width / 1.02,
    marginVertical: SIZES.gapSmall,
  },
  actions: {
    flexDirection: 'row',
    gap: responsiveFontSize(20),
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SIZES.gapLarge,
    marginBottom: SIZES.gapLarge,
  },
  containerButtons: {
    width: SIZES.width / 2.5,
  }
});
