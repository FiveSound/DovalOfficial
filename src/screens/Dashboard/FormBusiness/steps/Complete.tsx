import { memo } from "react";
import { useNavigation } from "../../../../components/native";
import { FlexContainer, ScreenEmpty } from "../../../../components/custom";
import { Ilustrations } from "../../../../constants";
import { SIZES } from "../../../../constants/theme";
import i18next from "i18next";
import { useAppDispatch } from "@/src/redux";
import { reloadApp } from "@/src/redux/slides/appSlice";

const Complete = memo(() => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <FlexContainer newStyle={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ScreenEmpty
      labelPart1={i18next.t("Your account has been created successfully")}
      subLabel={i18next.t("You will receive your first order shortly")}
      source={Ilustrations.GoodJob}
      ImgWidth={SIZES.width}
      ImgHeigth={SIZES.height / 3}
      ShowButton={true}
      onPress={() => {
        dispatch(reloadApp());
      }}
      labelButton={i18next.t("Go to Feed")}
    />
    </FlexContainer>
  );
});

export default Complete;
