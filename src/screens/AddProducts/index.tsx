import React, { useContext, useEffect } from "react";
import {
  Container,
  InputLabel,
  LineDivider,
  LoadingScreen,
  OptionList,
  ProductCard,
  Typography,
} from "../../components/custom";
import { StyleSheet } from "react-native";
import { RefreshControl, KeyboardAwareScrollView } from "../../components/native";
import { SIZES } from "../../constants/theme";
import i18next from "../../Translate";
import Signup from "../auth/Signup";
import { useAddProducts } from "./useAddProducts";
import { TypeSubVariant, TypeVariant } from "./types";
import { TabBarVisibilityContext } from "../../context/TabBarVisibilityContext";

type Props = {};

const AddProducts: React.FC<Props> = (props: Props) => {
  const {
    isAuthenticated,
    isLoadingApp,
    data,
    isLoading,
    isFetching,
    load,
    isFormValid,
    total,
    qty,
    handleQuantityChange,
    handleSubmit,
    handleOptionPress,
    isRefreshing,
    onRefresh,
    limites,
    subVariants,
  } = useAddProducts();

  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  if (!isAuthenticated) {
    return <Signup />;
  }

  if (isLoading || isFetching || isLoadingApp) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <Container
        useSafeArea={true}
        label={data.name}
        style={styles.container}
        showHeader={true}
        showBack={true}
        showTwoIconsLabel={true}
        showFooter={false}
        showFooterCart={true}
        FooterPress={handleSubmit}
        labelAdd={i18next.t("Add to cart")}
        loading={load}
        disabled={load}
        TotalPrice={total.data?.amount || "0"}
        add={() => handleQuantityChange(qty + 1)}
        remove={() => {
          if (qty > 1) {
            handleQuantityChange(qty - 1);
          }
        }}
        qty={qty}
        disabledCart={load || !isFormValid}
      >
        <KeyboardAwareScrollView
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.containerScroll}
          extraScrollHeight={SIZES.gapLarge * 2}
        >
          <ProductCard product={data} />
          <LineDivider lineStyle={styles.lineDivider} />
          {data?.variants.map((variant: TypeVariant) => {
            const subvariants = data.subvariants.filter((sub: TypeSubVariant) => sub.variantID === variant.id);
            return (
              <OptionList
                key={`${variant.recipeID}-${variant.id}`}
                option={subvariants}
                title={variant.title}
                required={variant.required ? 1 : 0}
                value={subVariants}
                onPress={(id: number) => handleOptionPress(id, variant.id)}
                limites={limites}
                variantID={variant.id}
                limit_qty={variant.limit_qty}
              />
            );
          })}
          <Typography variant="subtitle">{i18next.t("Notes")}</Typography>
          <InputLabel label={i18next.t("Notes")} placeholder={i18next.t("Notes for riderMan")} onSize={true} />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    width: SIZES.width,
  },
  containerScroll: {
    paddingHorizontal: SIZES.gapLarge,
    paddingBottom: SIZES.height / 4,
  },
  lineDivider: {
    height: SIZES.gapMedium,
    width: SIZES.width,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default AddProducts;
