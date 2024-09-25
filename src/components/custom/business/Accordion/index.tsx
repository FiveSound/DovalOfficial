import React, { memo, useState, useCallback } from "react";
import { useTheme } from "../../../../hooks";
import FlexContainer from "../../FlexContainer";
import { TouchableOpacity, View } from "react-native";
import Avatars from "../../Avatars";
import Typography from "../../Typography";
import { ArrowDown, ArrowUp } from "../../../../constants/IconsPro";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import LineDivider from "../../LineDivider";
import CartItem from "../CartItems";
import styles from "./styles";
import { CLOUDFRONT } from "../../../../services";
import i18next from "../../../../Translate";

type CartItemType = {
  postID: number;
  recipeID: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  qty: number;
  businessID: number;
  business_name: string;
  cover: string;
};

type Props = {
  row: CartItemType[];
};

const Accordion: React.FC<Props> = ({ row }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { Description, Title } = useTheme();
  const business = row[0];

  const toggleAccordion = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <FlexContainer newStyle={styles.container}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={styles.header}
        accessibilityLabel={isOpen ? "Cerrar detalles del negocio" : "Abrir detalles del negocio"}
        accessibilityRole="button"
      >
        <View style={styles.subheader}>
          <Avatars 
            source={`${CLOUDFRONT}${business.cover}`}
            size="medium"
          />
          <FlexContainer>
            <Typography
              variant="subtitle"
              newStyle={styles.business}
            >
              {business.business_name}
            </Typography>
            <Typography variant="SubDescription">
              {row.length} {row.length > 1 ? i18next.t("Products") : i18next.t("Product")}
            </Typography>
          </FlexContainer>
        </View>
        {isOpen ? 
          <ArrowUp 
            width={SIZES.icons}
            height={SIZES.icons}
            color={Title}
            accessibilityLabel="Contraer lista de productos"
          /> :
          <ArrowDown 
            width={SIZES.icons}
            height={SIZES.icons}
            color={Title}
            accessibilityLabel="Expandir lista de productos"
          />}
      </TouchableOpacity>
      <LineDivider
        lineStyle={{
          marginBottom: SIZES.gapSmall,
        }}
      />
      {isOpen && (
        <View style={styles.dropdown}>
          {row.map((item) => (
            <CartItem key={item.postID} {...item} />
          ))}
        </View>
      )}
    </FlexContainer>
  );
};

export default memo(Accordion);