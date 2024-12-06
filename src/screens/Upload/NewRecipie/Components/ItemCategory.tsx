import { FlexContainer, LineDivider, Perks, Typography } from "@/src/components/custom";
import { ScrollView, View } from "@/src/components/native";
import { SIZES } from "@/src/constants/theme";
import { memo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

const ItemCategory = memo((props: Props) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        style={styles.item}
      >
        <FlexContainer variant='row' newStyle={styles.flexContainer}>
          <FlexContainer>
            <Typography variant="subtitle">{props.name}</Typography>
            <Typography variant="SubDescription">{props.description}</Typography>
          </FlexContainer>
          {props.selected && <Perks label="" status="success" />}
        </FlexContainer>
      </TouchableOpacity>
      <LineDivider />
    </>
  );
});

const styles = StyleSheet.create({
  item: {
    padding: SIZES.gapLarge,
    width: '100%',
    backgroundColor: 'transparent',
    gap: SIZES.gapSmall,
  },
  flexContainer: {
    width: SIZES.width / 1.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});

export default ItemCategory;
