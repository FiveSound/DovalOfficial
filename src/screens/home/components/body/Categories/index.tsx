import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  FlatList,
  TouchableOpacity,
  useNavigation,
  View,
  Image,
  ScrollView,
} from "../../../../../components/native";
import { FlexContainer, Typography } from "../../../../../components/custom";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../../../constants/theme";
import { GridViewIcons } from "../../../../../constants/IconsPro";
import categories, { Category } from "./data";

type Props = {};

const Categories = (props: Props) => {
  const navigation = useNavigation();

  const renderItem = useCallback(
    ({ item }: { item: Category }) => (
      <TouchableOpacity
        onPress={() => item.navigation && navigation.navigate(item.navigation)}
        style={{
          alignItems: "center",
        }}
      >
        <View style={styles.itemContainer}>
          <FlexContainer
            newStyle={[
              styles.containerImg,
              {
                backgroundColor:
                  item.id === 5 ? COLORS.primaryDark950 : COLORS.primary,
              },
            ]}
          >
            {item.id === 5 ? (
              <View style={styles.iconsmore}>
                <GridViewIcons
                  width={responsiveFontSize(34)}
                  height={responsiveFontSize(34)}
                  color={COLORS.primary}
                />
              </View>
            ) : (
              <Image
                source={item.icon}
                style={styles.icon}
                contentFit="cover"
              />
            )}
          </FlexContainer>
        </View>
        <Typography
          numberOfLines={1}
          variant="H4title"
          newStyle={styles.itemText}
        >
          {item.name}
        </Typography>
      </TouchableOpacity>
    ),
    []
  );

    return (
        <ScrollView
          horizontal
          contentContainerStyle={styles.listContainer}
          nestedScrollEnabled={true}
        >
          {categories.map((item) => (
            <View key={item.id}>
              {renderItem({ item })}
            </View>
          ))}
        </ScrollView>
      );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: SIZES.gapSmall,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: SIZES.gapSmall,
    borderColor: COLORS.primaryDark950,
    borderWidth: SIZES.borderWidth,
    borderRadius: responsiveFontSize(34),
    justifyContent: "space-between",
    padding: SIZES.gapSmall / 2,
  },
  icon: {
    width: responsiveFontSize(50),
    height: responsiveFontSize(50),
    borderRadius: responsiveFontSize(50),
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    marginTop: responsiveFontSize(4),
    textAlign: "center",
    width: SIZES.width / 5.2,
    ...FONTS.semi14,
  },
  containerImg: {
    backgroundColor: COLORS.primary,
    borderRadius: responsiveFontSize(34),
    padding: SIZES.gapSmall,
  },
  iconsmore: {
    width: responsiveFontSize(50),
    height: responsiveFontSize(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default Categories;
