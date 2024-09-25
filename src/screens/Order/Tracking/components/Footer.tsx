import { StyleSheet } from "react-native";
import { FlexContainer, InfoCard } from "../../../../components/custom";
import {
  Pressable,
  Text,
  TouchableOpacity,
} from "../../../../components/native";
import { useTheme } from "../../../../hooks";
import { COLORS, SIZES } from "../../../../constants/theme";
import { useDispatch } from "react-redux";
import { openModalPin } from "../../../../redux/slides/modalSlice";
import { ArrowUp, Location09Icon } from "../../../../constants/IconsPro";

type Props = {
    data: {
        locationDetails: string;
    };
};
const Footer = (props: Props) => {
  const { data,  } = props;
  const { BackgroundMain, Title } = useTheme();
  const dispatch = useDispatch();
  const openModal = () => {
    if (data) {
      dispatch(openModalPin({ data }));
    }
  }
  
  return (
    <Pressable onPress={openModal}
      style={[
        styles.container,
        {
          backgroundColor: BackgroundMain,
        },
      ]}
    >
      <InfoCard
        icon={
          <Location09Icon
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
            color={COLORS.primary}
          />
        }
        title="You receive it in"
        description={data.locationDetails || ''}
        orientation="LEGHT"
        showArrow={true}
        onPress={openModal}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    height: SIZES.height / 8,
    position: "absolute",
    bottom: 0,
    width: SIZES.width,
    borderTopRightRadius: SIZES.gapLarge,
    borderTopLeftRadius: SIZES.gapLarge,
  },
});

export default Footer;
