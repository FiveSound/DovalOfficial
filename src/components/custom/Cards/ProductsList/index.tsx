import React, { useState } from "react";
import { StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import {
  COLORS,
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
import Icons from "../../Icons";
import { ArrowDown } from "../../../../constants/IconsPro";

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
  limit_qty: number;
}

const OptionList: React.FC<Props> = React.memo(({ option, title, required, onPress, value, limites, variantID, limit_qty }) => {
  const { backgroundMaingrey, Title } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

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
        <FlexContainer variant="row">
        {required === 1 && 
          <Perks 
            status={!limites[variantID] ? 'error' : 'success'} 
            label={!limites[variantID] ? ` ${i18next.t("Required")} ${limit_qty}` : i18next.t("completed")}
          />
        }
          <Icons 
          onPress={toggleExpand}
            appendIcons={
            <ArrowDown 
            color={Title} 
            width={SIZES.icons}
            height={SIZES.icons}
            style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }} />
            
          }
          />
        </FlexContainer>
      </FlexContainer>
      {expanded && (
        <FlexContainer newStyle={styles.optionsContainer}>
          {option.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.item}
              onPress={() => onPress && onPress(item.id)}
            >
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
      )}
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.base,
    padding: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...FONTS.semi16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.gapSmall,
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
  },
  optionsContainer: {
    marginTop: SIZES.base,
  },
});

export default OptionList;