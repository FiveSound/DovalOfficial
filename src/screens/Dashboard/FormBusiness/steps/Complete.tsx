import { memo } from "react";
import { useNavigation } from "../../../../components/native";
import { ScreenEmpty } from "../../../../components/custom";
import { Ilustrations } from "../../../../constants";
import { SIZES } from "../../../../constants/theme";

const Complete = memo(() => {
  const navigation = useNavigation();
  return (
    <ScreenEmpty
      labelPart1="Your account has been created successfully"
      subLabel="You will receive your first order shortly"
      source={Ilustrations.GoodJob}
      ImgWidth={SIZES.width}
      ImgHeigth={SIZES.height / 3}
      ShowButton={true}
      onPress={() => {
        navigation.navigate("UserProfile");
      }}
      labelButton="Go to Profile"
    />
  );
});

export default Complete;
