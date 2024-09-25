import React from "react";
import { View } from "../../../native";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import { Skeleton } from "moti/skeleton";
import FlexContainer from "../../FlexContainer";
import LineDivider from "../../LineDivider";
import { useColorScheme } from "react-native";

export const CardUserSkeleton = () => {
const theme = useColorScheme()
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: responsiveFontSize(6),
            gap: SIZES.gapSmall,
          }}>
          <Skeleton
            colorMode={theme === 'dark' ? 'dark' : 'light'}
            width={SIZES.icons * 2}
            height={SIZES.icons * 2}
            radius="round"
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <FlexContainer
              variant="row"
              newStyle={{
                alignItems: "center",
                width: SIZES.width / 2.4,
              }}>
              <Skeleton
                colorMode={theme === 'dark' ? 'dark' : 'light'}
                width={SIZES.width / 3}
                height={responsiveFontSize(8)}
                radius='square'
              />
            </FlexContainer>
            <Skeleton
              colorMode={theme === 'dark' ? 'dark' : 'light'}
              width={SIZES.width / 1.4}
              height={responsiveFontSize(8)}
              radius='square'
            />
          </View>
        </View>
        <LineDivider
          lineStyle={{
            height: responsiveFontSize(1),
          }}
        />
      </>
    );
  };