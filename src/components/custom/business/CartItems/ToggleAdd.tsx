import React from "react";
import { Text, TouchableOpacity } from "../../../native";
import FlexContainer from "../../FlexContainer";
import Icons from "../../Icons";
import {
  Delete03IconSharp,
  Delete03IconStroke,
  PencilEdit02IconSharp,
  PlusSignIcon,
} from "../../../../constants/IconsPro";
import { StyleSheet } from "react-native";
import Typography from "../../Typography";
import { useTheme } from "../../../../hooks";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { useCart } from "../../../../context/CartContext";

type Props = {
  recipeID: number;
  setLoad: (load: boolean) => void;
  qty: number;
};

const ToggleAdd = (props: Props) => {
  const { recipeID, setLoad, qty } = props;
  const { addProduct, removeProduct } = useCart();

  console.log('addProduct', addProduct);
  console.log('removeProduct', removeProduct);
  console.log('qty', qty);
  
  return (
    <FlexContainer variant="row" newStyle={styles.container}>
      <AddRemove 
        qty={qty} 
        add={() => {
          console.log('Adding product with recipeID:', recipeID);
          addProduct(recipeID, setLoad);
        }}
        remove={() => {
          console.log('Removing product with recipeID:', recipeID);
          removeProduct(recipeID, setLoad);
        }} 
      />
      <EditRecipie />
    </FlexContainer>
  );
};

const EditRecipie = () => {
  const { border, Description } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.containerIcons,
        {
          backgroundColor: border,
        },
      ]}
    >
      <Icons
        appendIcons={
          <PencilEdit02IconSharp
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={Description}
          />
        }
        styles={{
          backgroundColor: border,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Typography variant="H4title">Edit</Typography>
    </TouchableOpacity>
  );
};

export const AddRemove = (props: any) => {
  const { qty, add, remove } = props;
  const { border, Description } = useTheme();
  return (
    <FlexContainer
      newStyle={[
        styles.containerIcons,
        {
          gap: SIZES.gapLarge,
          borderColor: border,
        },
      ]}
    >
      <Icons
        onPress={remove}
        appendIcons={
          <Delete03IconSharp
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={Description}
          />
        }
      />
      <Typography variant="H4title">{qty || 1}</Typography>
      <Icons
        onPress={add}
        appendIcons={
          <PlusSignIcon
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={Description}
          />
        }
      />
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerIcons: {
    alignItems: "center",
    borderRadius: SIZES.radius,
    justifyContent: "center",
    paddingHorizontal: SIZES.gapLarge,
    flexDirection: "row",
    height: SIZES.BtnHeight,
    borderWidth: SIZES.borderWidth,
  },
});
export default ToggleAdd;