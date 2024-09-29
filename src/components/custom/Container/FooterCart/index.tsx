import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import i18next from "../../../../Translate";
import { StyleSheet } from "react-native";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import { IsLoading } from "../../Loaders";
import { AddRemove } from "../../business/CartItems/ToggleAdd";
import React from "react";
import Buttons from "../../Buttons/Buttons";

export const FooterCart = (props: any) => {
const { TotalPrice, FooterPress, labelAdd, loading = false, qty, add, remove, disabledCart, showAdd = true } = props;

  return (
    <FlexContainer newStyle={styles.containerMain}>
     <FlexContainer variant="row" newStyle={styles.container}>
      <Typography variant='title'>{i18next.t("Your Product")}</Typography>
      {
        qty == 0 ? <IsLoading /> : <Typography variant='title'>{TotalPrice}</Typography>
      }
     </FlexContainer>

     {/* Buttons */}
      <FlexContainer newStyle={styles.container}>
        <FlexContainer newStyle={styles.innerContainer}>
          <FlexContainer variant="row" newStyle={styles.rowContainer}>
            {showAdd && <FlexContainer>
              <AddRemove 
              add={add}
              remove={remove}
              qty={qty}
              />
            </FlexContainer>}
            <Buttons
              label={labelAdd}
              onPress={FooterPress}
              variant={disabledCart ? 'disabled' : 'primary'}
              containerButtons={styles.button}
              disabled={disabledCart}
            />
         </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapSmall,
  },
  container: {
    height: responsiveFontSize(44),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapLarge / 2,
    width: '100%',
  },
  productText: {
    color: COLORS.dark,
  },
  rowContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    gap: SIZES.gapMedium,
    justifyContent: "space-between",
    width: "100%"
  },
  totalText: {
    color: COLORS.dark,
    ...FONTS.semi16
  },
  button: {
   flex: 1,
   borderRadius: 0
  },
  buttonText: {
    color: COLORS.TitleColor
  },
});
