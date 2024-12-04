import { memo } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@/src/components/native";
import { Buttons } from "@/src/components/custom";
import i18next from "../../../../Translate";

type Props = {
  title?: string;
  href: string;
  disabled?: boolean;
  onSubmit?: () => Promise<void>;
  submit?: boolean;
};

const Header = memo((props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Buttons
        label={i18next.t("Atras")}
        onPress={() => navigation.goBack()}
        variant={"disabled"}
        variantLabel={"disabled"}
        containerButtons={styles.containerButtonss}
      />
      <Text>{props.title}</Text>
      {props.submit ? (
        <Buttons
          label={i18next.t("Submit")}
          onPress={props.onSubmit}
          containerButtons={styles.containerButtonss}
          variant={props.disabled ? "disabled" : "primary"}
          disabled={props.disabled}
        />
      ) : (
        <Buttons
          label={i18next.t("Continue")}
          onPress={() => navigation.navigate(props.href)}
          containerButtons={styles.containerButtonss}
          variant={props.disabled ? "disabled" : "primary"}
          disabled={props.disabled}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerButtonss: {
    width: "30%",
  },
  // container: {
  //   flex: 1,
  // },
  // close: {
  //   position: "absolute",
  //   top: 10,
  //   left: 10,
  // },
  // closeText: {
  //   color: "#FFF",
  // },
  // actions: {
  //   flexDirection: "row",
  //   gap: responsiveFontSize(20),
  //   justifyContent: "space-between",
  //   width: "100%",
  //   paddingHorizontal: SIZES.gapLarge,
  //   marginBottom: SIZES.gapLarge,
  // },
  // containerButtons: {
  //   width: SIZES.width / 3,
  //   backgroundColor: "transparent",
  // },
  // labelStyle: {
  //   color: COLORS.primary,
  // },
  // progressContainer: {
  //   alignItems: "center",
  //   marginVertical: SIZES.gapLarge,
  //   gap: SIZES.gapLarge,
  // },
  // lineStyle: {
  //   marginBottom: SIZES.gapLarge,
  // },
  // containerButtonss: {
  //   width: "30%",
  // },
  // icon: {
  //   width: SIZES.icons,
  //   height: SIZES.icons,
  // },
  // stylesMedia: {
  //   width: responsiveFontSize(140),
  //   height: responsiveFontSize(160),
  // },
  // stylesMain: {
  //   width: SIZES.width / 3,
  //   height: SIZES.height / 6,
  //   backgroundColor: "transparent",
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  // },
});

export default Header;
