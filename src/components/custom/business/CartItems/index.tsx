import React, { useState, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useCart } from "../../../../context/CartContext";
import { CLOUDFRONT } from "../../../../services";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import { Image } from "../../../native";
import { useTheme } from "../../../../hooks";
import Typography from "../../Typography";
import LineDivider from "../../LineDivider";
import ToggleAdd from "./ToggleAdd";

type Props = {
  recipeID: number;
  name: string;
  description: string;
  price: number;
  qty: number;
  thumbnail: string;
};

const CartItem: React.FC<Props> = ({
  recipeID,
  name,
  description,
  price,
  qty,
  thumbnail,
}) => {
  const [load, setLoad] = useState<boolean>(false);
  const { backgroundMaingrey } = useTheme();
  const { addProduct, removeProduct } = useCart();

  const handleAdd = useCallback(() => {
    addProduct(recipeID, setLoad);
  }, [addProduct, recipeID]);

  const handleRemove = useCallback(() => {
    removeProduct(recipeID, setLoad);
  }, [removeProduct, recipeID]);

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
        <Image
          source={{ uri: `${CLOUDFRONT}${thumbnail}`}}
          style={styles.thumbnail}
          cachePolicy="memory-disk"
          priority="high"
          accessibilityLabel={`${name} imagen`}
        />
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
          <Typography variant="subtitle" newStyle={styles.price}>
            {price}
          </Typography>
        </FlexContainer>
      </FlexContainer>
      <LineDivider />
      <ToggleAdd 
        recipeID={recipeID}
        setLoad={setLoad}
        qty={qty}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    </FlexContainer>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.gapMedium,
    width: "100%",
    padding: SIZES.gapMedium,
    gap: SIZES.gapLarge,
    borderRadius: SIZES.radius,
  },
  containerExtra: {
    gap: SIZES.gapLarge,
  },
  thumbnail: {
    width: responsiveFontSize(98),
    height: responsiveFontSize(98),
    borderRadius: SIZES.radius * 2,
  },
  maxText: {
    width: SIZES.width / 1.4,
  },
  price: {
    ...FONTS.heading24,
  },
  containerText: {
    gap: SIZES.gapLarge,
  },
});