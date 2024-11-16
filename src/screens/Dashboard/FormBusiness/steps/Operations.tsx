import { memo } from "react";
import { Text } from "react-native";
import { Header } from "../components";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { responsiveFontSize } from "../../../../constants/theme";

const Operations = memo(() => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        currentStep={4}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Financial")}
        showDivider
      />
      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        <Text>Operations</Text>
      </KeyboardAwareScrollView>
    </>
  );
});

export default Operations;
