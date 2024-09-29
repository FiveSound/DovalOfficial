import React, {memo, useState } from "react";
import { StyleSheet } from "react-native";
import { CLOUDFRONT } from "../../../../services";
import {
  FONTS,
  SIZES,
} from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import { useTheme } from "../../../../hooks";
import Typography from "../../Typography";
import { AddRemove } from "./ToggleAdd";
import Cover from "../../Avatars/Cover";
import { addToCartService, removerCartService } from "../../../../services/cart";

interface row {
  recipeID: number,
  name: string,
  description: string,
  formatprice: string,
  qty: number,
  thumbnail: string,
  variants: number[]
}

type Props = {
  row: row,
  refetch: () => void
};

const CartItem: React.FC<Props> = ({
  row, refetch
}) => {
  const { backgroundMaingrey } = useTheme();
  const { recipeID, name, description, formatprice, qty, thumbnail, variants} = row;
  const [localQty, setLocalQty] = useState(qty); // Local state for quantity

  const addToCart = async (recipeID: number, subVariants: number[], qty: number) => {
    setLocalQty((prevQty) => prevQty + 1); // Update local state immediately
    const response = await addToCartService(recipeID, subVariants, qty);
    if (response.success) {
      refetch();
    }
  };

  const removeCart = async (recipeID: number, subVariants: number[]) => {
    setLocalQty((prevQty) => Math.max(prevQty - 1, 0)); // Update local state immediately
    const response = await removerCartService(recipeID, subVariants);
    if (response.success) {
      refetch();
    }
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
      <FlexContainer
        variant="row"
        newStyle={[
          styles.containerExtra,
          {
            backgroundColor: backgroundMaingrey,
          },
        ]}
      >
        <Cover source={`${CLOUDFRONT}${thumbnail}`} size='medium' />
        <FlexContainer newStyle={styles.containerText}>
          <Typography
            newStyle={styles.maxText}
            variant="subtitle"
            numberOfLines={2}
          >
            {name}
          </Typography>
          <Typography
            variant="SubDescription"
            numberOfLines={3}
            newStyle={styles.maxText}
          >
            {description}
          </Typography>
          <FlexContainer variant="row" newStyle={styles.containerprice}>
            <Typography variant="subtitle" newStyle={styles.price}>
              {formatprice}
            </Typography>
            <AddRemove
              add={() => addToCart(recipeID, variants, 1)}
              remove={() => removeCart(recipeID, variants)}
              qty={localQty}
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.gapMedium,
    width: "100%",
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
  },
  containerExtra: {
    gap: SIZES.gapLarge,
  },
  maxText: {
    width: SIZES.width / 1.4,
  },
  price: {
    ...FONTS.semi18,
  },
  containerText: {
    gap: SIZES.gapSmall,
  },
  containerprice: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: SIZES.gapLarge,
  }
});