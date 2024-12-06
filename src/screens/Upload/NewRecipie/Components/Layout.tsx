import { ReactNode, memo } from "react";
import { StyleSheet } from "react-native";
import { ArrowBack, Buttons, Container } from "@/src/components/custom";
import { KeyboardAwareScrollView, ScrollView, Text, useNavigation, View } from "@/src/components/native";
import i18next from "../../../../Translate";
import { responsiveHeight, SIZES } from "@/src/constants/theme";

type Props = {
  children: ReactNode;
  title: string;
  href: string;
  disabled?: boolean;
  onSubmit?: () => Promise<void>;
  submit?: boolean;
};

const Layout = memo((props: Props) => {
  const navigation = useNavigation();

  return (
    <Container showBack={true} showHeader={false} label={props.title} style={{ flex: 1 }}>
      <View style={styles.header}>
        <ArrowBack />
        {props.submit ? (
          <Buttons
            label={i18next.t("Submit")}
            onPress={() => props.onSubmit ? props.onSubmit() : {}}
            containerButtons={styles.containerButtonss}
            variant={props.disabled ? "disabled" : "primary"}
            disabled={props.disabled}
          />
        ) : (
          <Buttons
            label={i18next.t("Continue")}
            onPress={() => {
              navigation.navigate(props.href);
            }}
            containerButtons={styles.containerButtonss}
            variant={props.disabled ? "disabled" : "primary"}
            variantLabel={props.disabled ? "disabled" : 'secondary'}
            disabled={props.disabled}
          />
        )}
      </View>
      {props.children}
    </Container>
  );
});
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.gapLarge,
    backgroundColor: 'transparent',
  },
  containerButtonss: {
    width: "30%",
  },
});
export default Layout;
