import React from "react";
import {StyleSheet } from "react-native";
import {
  FONTS,
  SIZES,
} from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import { useTheme } from "../../../../hooks";
import { StaticCheckbox } from "../../Checkbox";
import { TouchableOpacity } from "../../../native";
import Perks from "../../Perks";
import i18next from "../../../../Translate";

interface TypeSubVariant {
  id: number;
  variantID: number;
  name: string;
  price: string;
  defaultSelected: boolean;
}

interface Props {
  option: TypeSubVariant[];
  title: string;
  required: number;
  onPress?: (id: number) => void;
  value: number[];
  limites: { [key: number]: boolean };
  variantID: number;
}

const OptionList: React.FC<Props> = React.memo(({ option, title, required, onPress, value, limites, variantID }) => {
  const { backgroundMaingrey } = useTheme();

  return (
    <FlexContainer
      newStyle={[
        styles.container,
        {
          backgroundColor: backgroundMaingrey,
        },
      ]}
    >
      <FlexContainer newStyle={styles.containerTitle}>
        <Typography variant="subtitle" newStyle={styles.title}>
          {title}
        </Typography>
        {required === 1 && <Perks status={!limites[variantID] ? 'error' : 'success'} label={!limites[variantID] ? i18next.t("Required") : i18next.t("completed")}/>}
      </FlexContainer>
      {option.map((item) => (
        <TouchableOpacity key={item.id} style={styles.item}
        onPress={() => onPress && onPress(item.id)}>
          <Typography variant="H4title" newStyle={styles.itemName}>
            {item.name}
          </Typography>
          <FlexContainer newStyle={styles.containerPrices} variant="row">
            <Typography variant="H4title" newStyle={styles.itemName}>
              {parseFloat(item.price) > 0 ? `+$${item.price}` : "Free"}
            </Typography>

            <StaticCheckbox 
              checked={value.includes(item.id)} 
              showLabel={false} 
            />
          </FlexContainer>
        </TouchableOpacity>
      ))}
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.base,
    padding: SIZES.gapMedium,
    borderRadius: SIZES.radius,
  },
  title: {
    ...FONTS.semi18,
    marginBottom: SIZES.base,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.gapMedium,
    gap: SIZES.gapMedium
  },
  containerPrices: {
    alignItems: "center",
  },
  itemName: {
    ...FONTS.semi14,
    marginRight: SIZES.gapLarge
  },
  label: {
    width: "auto",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.gapMedium,
    gap: SIZES.gapMedium
  }
});

export default OptionList;