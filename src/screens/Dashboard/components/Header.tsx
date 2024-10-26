import { memo } from "react";
import { StyleSheet} from "react-native";
import { CLOUDFRONT } from "../../../services";
import { Menu01Icon } from "../../../constants/IconsPro";
import { SafeAreaView, TouchableOpacity, View, Image, Text, Platform  } from "../../../components/native";
import { COLORS, SIZES } from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { Avatars, LineDivider, Typography } from "../../../components/custom";

type Props = {
  title: string;
  cover: string;
  openDrawer: () => void;
};

const HeaderDashboard = memo(
  (props: Props) => {     
    const { Title } = useTheme();
    return (
      <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={props.openDrawer}>
            <Menu01Icon
              width={SIZES.icons}
              height={SIZES.icons}
              color={Title}
            />
          </TouchableOpacity>
          {props.cover && (
            <Avatars
              size='small'
              source={`${CLOUDFRONT}${props.cover}`}
            />
          )}
          <Typography variant='subtitle'>{props.title}</Typography>
        </View>
        <LineDivider variant='secondary' lineStyle={styles.divider} />
      </SafeAreaView>
    </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title &&
    prevProps.cover === nextProps.cover
);

export default HeaderDashboard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapLarge,
    paddingHorizontal: Platform.OS === 'android' ? 0 : SIZES.gapLarge,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapLarge,
  },
  divider: {
    marginVertical: SIZES.gapLarge,
    width: Platform.OS === "ios" ? "100%" : SIZES.width,
    alignSelf: 'center',
  },
});
