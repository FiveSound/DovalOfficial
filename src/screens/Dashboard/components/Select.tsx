import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { Typography } from "../../../components/custom";

type ListProps = {
  title: string;
  value: string | number;
};

type Props = {
  list: ListProps[];
  onChange: (value: string | number) => void;
  value: string | number;
  defaultValue: string | number;
};

const Select = ({ list, onChange, value }: Props) => {
  const { border, Title } = useTheme();
  return (
    <View style={styles.container}>
      {list.map(({ title, value: itemValue }) => {
      const isSelected = itemValue === value;
      return (
        <TouchableOpacity
          key={title}
          onPress={() => onChange(itemValue)}
          style={[styles.item, isSelected ? styles.selected : { backgroundColor: border }]}
        >
          <Typography variant='H4title' newStyle={[styles.text, !isSelected ? { color: Title } : { color: COLORS.dark }]}>{title}</Typography>
        </TouchableOpacity>
      );
    })}
    </View>
  );
};

export default memo(Select);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 15,
  },
  item: {
    marginBottom: SIZES.gapSmall,
    padding: SIZES.gapMedium,
    borderRadius: SIZES.radius,
  },
  text: {
    color: COLORS.dark,
  },
  selected: {
    backgroundColor: COLORS.success,
  },
});
