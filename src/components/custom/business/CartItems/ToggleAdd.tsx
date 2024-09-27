import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "../../../native";
import FlexContainer from "../../FlexContainer";
import Icons from "../../Icons";
import {
  Delete03IconSharp,
  Delete03IconStroke,
  PencilEdit02IconSharp,
  PlusSignIcon,
  Remove01Icon,
} from "../../../../constants/IconsPro";
import { StyleSheet } from "react-native";
import Typography from "../../Typography";
import { useTheme } from "../../../../hooks";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { useCart } from "../../../../context/CartContext";
import i18next from "../../../../Translate";

type Props = {
  recipeID: number;
  qty: number;
};

const ToggleAdd = (props: Props) => {
  const { recipeID, qty } = props;
  const { addProduct, removeProduct } = useCart();
  const [load, setLoad] = useState<boolean>(false);

  const handleAdd = useCallback(() => {
    addProduct(recipeID, setLoad);
    console.log('Adding product with recipeID:', recipeID);
  }, [addProduct, recipeID]);

  const handleRemove = useCallback(() => {
    removeProduct(recipeID, setLoad);
    console.log('Removing product with recipeID:', recipeID);
  }, [removeProduct, recipeID]);
  
  return (
    <FlexContainer variant="row" newStyle={styles.container}>
      <AddRemove 
        qty={qty} 
        add={handleAdd}
        remove={handleRemove} 
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
      <Typography variant="H4title">{i18next.t("Edit")}</Typography>
    </TouchableOpacity>
  );
};

export const AddRemove = (props: any) => {
  const { qty, add, remove } = props;
  const { Title, Description } = useTheme();
  return (
    <FlexContainer
      newStyle={[
        styles.containerIcons,
        {
          gap: SIZES.gapLarge,
          borderColor: Description,
        },
      ]}
    >
      <Icons
        onPress={remove}
        appendIcons={
          <Remove01Icon
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={Description}
          />
        }
        styles={styles.containerIconsEdit}
      />
      <Typography variant="H4title">{qty || 1}</Typography>
      <Icons
        onPress={add}
        appendIcons={
          <PlusSignIcon
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
            color={Title}
          />
        }
        styles={styles.containerIconsEdit}
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
    justifyContent: "center",
    paddingHorizontal: SIZES.gapLarge,
    flexDirection: "row",
    height: SIZES.InputsHeight,
    borderWidth: SIZES.borderWidth,
  },
  containerIconsEdit: {
   backgroundColor: 'transparent'
  },
});
export default ToggleAdd;