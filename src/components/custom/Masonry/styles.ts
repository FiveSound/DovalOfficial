import { StyleSheet } from "react-native";
import { SIZES } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SIZES.gapSmall,
    paddingBottom: SIZES.height / 10,
  },
  column: {
    flex: 1,
    marginHorizontal: SIZES.gapSmall / 2,
  },
  containerButtons: {
    borderRadius: SIZES.padding,
    width: SIZES.width / 3,
    alignSelf: "center",
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  loader: {
    marginVertical: SIZES.padding,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});