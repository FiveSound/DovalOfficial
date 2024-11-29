import { memo } from "react";
import { useNavigation } from "../../../../components/native";
import { Container, FlexContainer, ScreenEmpty } from "../../../../components/custom";
import { Ilustrations } from "../../../../constants";
import { SIZES } from "../../../../constants/theme";
import i18next from "i18next";
import { useAppDispatch } from "@/src/redux";
import { reloadApp } from "@/src/redux/slides/appSlice";

const Complete = memo(() => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <Container>
      <ScreenEmpty
      labelPart1={i18next.t("Your Business has been created successfully")}
      subLabel={i18next.t("Our review team will check your business, thank you! This process usually takes less than 24 hours")}
      source={Ilustrations.GoodJob}
      ImgWidth={SIZES.width}
      ImgHeigth={SIZES.height / 3}
      ShowButton={true}
      onPress={() => {
        dispatch(reloadApp());
      }}
      labelButton={i18next.t("Go to Feed")}
    />
    </Container>
  );
});

export default Complete;
