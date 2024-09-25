import React, { memo, useState } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import {
  FlexContainer,
  LineDivider,
  Typography,
} from "../../../../components/custom";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

type Props = {
  item: {
    name: string;
    description: string;
  };
};

const InfoDescriptions = memo(({ item }: Props) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <FlexContainer
      newStyle={{
        ...styles.flexContainer,
        width: descriptionOpen ? SIZES.width : SIZES.width / 1.4,
        height: descriptionOpen ? SIZES.height / 3 : "auto",
      }}>
      {descriptionOpen && (
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1.9)"]}
          style={styles.linearGradient}
        />
      )}
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => setDescriptionOpen(!descriptionOpen)}
          style={styles.touchableOpacity}>
          {item.name !== "" && (
            <Typography
              variant="H4title"
              numberOfLines={descriptionOpen ? undefined : 1}
              newStyle={styles.titlePost}>
              {item.name || ""}
            </Typography>
          )}
          {descriptionOpen && <LineDivider />}
        </TouchableOpacity>
        {item.description !== "" && (
          <ScrollView
            style={{
              maxHeight: descriptionOpen ? SIZES.height / 2 : "auto",
            }}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              paddingBottom: descriptionOpen ? SIZES.height / 4 : 0,
            }}>
            <TouchableOpacity
              onPress={() => setDescriptionOpen(!descriptionOpen)}>
              <Typography
                variant="SubDescription"
                numberOfLines={descriptionOpen ? undefined : 2}
                newStyle={{
                  ...styles.descriptionPost,
                  color: descriptionOpen ? COLORS.light : COLORS.TranspLight,
                }}
                ellipsizeMode="tail">
                {item.description || ''}
              </Typography>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </FlexContainer>
  );
});

export default InfoDescriptions;
