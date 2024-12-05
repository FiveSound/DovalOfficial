import { ReactNode, memo } from "react";
import { StyleSheet } from "react-native";
import { Buttons, Container } from "@/src/components/custom";
import { Text, useNavigation, View } from "@/src/components/native";
import i18next from "../../../../Translate";

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
    <Container showBack={true} showHeader={true} label={i18next.t("")} style={{ flex: 1 }}>
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
              console.log("Continue!");
            }}
            containerButtons={styles.containerButtonss}
            variant={props.disabled ? "disabled" : "primary"}
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
  },
  containerButtonss: {
    width: "30%",
  },
});
export default Layout;
