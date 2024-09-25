import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { FlexContainer } from "../../../components/custom";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";

type Props = {
  ShowHeader?: boolean;
};

const LoaderMain = (props: Props) => {
  const { ShowHeader = true } = props;
  return (
    <FlexContainer
      newStyle={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: COLORS.dark,
      }}
    >
      {ShowHeader && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            top: SIZES.height / 14,
            width: SIZES.width,
            paddingHorizontal: SIZES.gapMedium,
          }}
        >
          <Skeleton
            width={responsiveFontSize(40)}
            height={responsiveFontSize(40)}
            radius={responsiveFontSize(40)}
          />
          <Skeleton
            width={responsiveFontSize(160)}
            height={responsiveFontSize(20)}
            radius={responsiveFontSize(40)}
          />
          <Skeleton
            width={responsiveFontSize(40)}
            height={responsiveFontSize(40)}
            radius={responsiveFontSize(40)}
          />
        </View>
      )}
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <FlexContainer
            newStyle={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.gapSmall,
            }}
          >
            <Skeleton
              width={responsiveFontSize(60)}
              height={responsiveFontSize(60)}
              radius={responsiveFontSize(60)}
            />
            <View>
              <Skeleton
                width={responsiveFontSize(120)}
                height={responsiveFontSize(10)}
                radius={responsiveFontSize(4)}
              />
              <Skeleton
                width={responsiveFontSize(90)}
                height={responsiveFontSize(10)}
                radius={responsiveFontSize(4)}
              />
            </View>
          </FlexContainer>
          <View>
            <Skeleton
              width={responsiveFontSize(240)}
              height={responsiveFontSize(10)}
              radius={responsiveFontSize(4)}
            />
            <Skeleton
              width={responsiveFontSize(90)}
              height={responsiveFontSize(10)}
              radius={responsiveFontSize(4)}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
          <View style={{ gap: SIZES.gapSmall, alignItems: "center" }}>
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(30)}
              radius={responsiveFontSize(30)}
            />
            <Skeleton
              width={responsiveFontSize(30)}
              height={responsiveFontSize(4)}
              radius={responsiveFontSize(4)}
            />
          </View>
        </View>
      </View>
    </FlexContainer>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: COLORS.dark,
  },
  leftSection: { flexDirection: "column", gap: SIZES.gapMedium },
  rightSection: { alignItems: "center", gap: SIZES.gapMedium },
});
export default LoaderMain;
