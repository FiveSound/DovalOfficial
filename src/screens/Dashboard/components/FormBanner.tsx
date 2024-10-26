import { StyleSheet } from "react-native";
import { FlexContainer } from "../../../components/custom";
import { Home01Icon } from "../../../constants/IconsPro";

const FormBanner = () => (
  <FlexContainer style={styles.banner}>
    <Home01Icon />
  </FlexContainer>
);

export default FormBanner;

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5500",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 95,
    height: 115,
    tintColor: "#000",
  },
});