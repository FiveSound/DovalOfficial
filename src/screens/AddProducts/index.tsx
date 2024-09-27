import React, { useEffect, useState, useCallback } from "react";
import { Container, InputLabel, LineDivider, LoadingScreen, OptionList, ProductCard, Typography } from "../../components/custom";
import { Alert, StyleSheet } from "react-native";
import { useNavigation, RefreshControl, KeyboardAwareScrollView } from "../../components/native";
import { SIZES } from "../../constants/theme";
import { addToCartService, getRecipeVariantsService, getTotalVariantsService } from "../../services/cart";
import { useQuery } from "@tanstack/react-query";
import i18next from "../../Translate";
import { useRefreshData } from "../../hooks";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Signup from "../auth/Signup";

type Props = {
  route?: {
    params: {
      recipeID: number;
    };
  };
};

type TypeVariant = {
  id: number;
  recipeID: number;
  title: string;
  limit_qty: number;
  required: boolean;
};

type TypeSubVariant = {
  id: number;
  variantID: number;
  name: string;
  price: string;
};

const AddProducts: React.FC<Props> = ({ route }) => {
  const recipeID = route?.params.recipeID;
  const [load, setLoad] = useState(false);
  const [qty, setQty] = useState(1);
  const [required, setRequired] = useState<null | number>(null);
  const [subVariants, setSubVariants] = useState<number[]>([]);
  const [limites, setLimites] = useState<{ [key: number]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(false); // Nuevo estado
  const navigation = useNavigation();
  const {
    isAuthenticated,
    isLoadingApp
  } = useSelector((state: RootState) => state.auth)

  const total = useQuery({
    queryKey: ["cart-total-screen", recipeID, JSON.stringify(subVariants), qty],
    queryFn: getTotalVariantsService,
    enabled: !!recipeID,
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["cart-variants-screen", recipeID],
    queryFn: getRecipeVariantsService,
    enabled: !!recipeID,
  });
  const { isRefreshing, onRefresh } = useRefreshData([refetch])

  const resetState = () => {
    setLoad(false);
    setQty(1);
    setRequired(null);
    setSubVariants([]);
    setLimites({});
  };

  const handlePress = useCallback((id: number, variantID: number) => {
    setSubVariants((prevSubVariants) => {
      const isIdPresent = prevSubVariants.includes(id);
      const variantSubVariants = data.subvariants.filter((sub: TypeSubVariant) => sub.variantID === variantID);
      const selectedVariantSubVariants = prevSubVariants.filter((subId) => variantSubVariants.map((sub) => sub.id).includes(subId));
      const limitQty = data.variants.find((variant: TypeVariant) => variant.id === variantID)?.limit_qty || 0;
      const limitReached = selectedVariantSubVariants.length >= limitQty;

      setLimites((prevLimites) => ({
        ...prevLimites,
        [variantID]: limitReached,
      }));

      if (!isIdPresent && limitReached) {
        Alert.alert(i18next.t("Limit reached"), i18next.t("You cannot select more variants for this option."));
        setLoad(false)
        return prevSubVariants;
      }

      const newSubVariants = isIdPresent
        ? prevSubVariants.filter((subId) => subId !== id)
        : [...prevSubVariants, id];

      const newSelectedVariantSubVariants = newSubVariants.filter((subId) => variantSubVariants.map((sub) => sub.id).includes(subId));
      const newLimitReached = newSelectedVariantSubVariants.length >= limitQty;

      setLimites((prevLimites) => ({
        ...prevLimites,
        [variantID]: newLimitReached,
      }));

      return newSubVariants;
    });
    setLoad(true);
  }, [data]);

  useEffect(() => {
    if (total) {
      setLoad(false);
    }
  }, [total]);

  useEffect(() => {
    if (!data) {
      setIsFormValid(false);
      return;
    }

    const requiredVariants = data.variants.filter((variant: TypeVariant) => variant.required);

    const allRequiredSelected = requiredVariants.every((variant) => {
      const selected = subVariants.filter((subId) => {
        const sub = data.subvariants.find((s) => s.id === subId);
        return sub?.variantID === variant.id;
      });
      return selected.length >= variant.limit_qty;
    });

    setIsFormValid(allRequiredSelected);
  }, [data, subVariants]);

  const onSubmit = useCallback(async () => {
    let success = false;
  
    for (const element of data.variants.filter((row: TypeVariant) => row.required)) {
      let limit = element.limit_qty;
      let id = element.id;
  
      let comparison = data.subvariants
        .filter((row: TypeSubVariant) => row.variantID === id)
        .map((row: TypeSubVariant) => row.id);
  
      let selecteds = subVariants.filter((row) => comparison.includes(row));
  
      if (selecteds.length < limit || selecteds.length > limit) {
        setRequired(id);
        Alert.alert(
          i18next.t("You are missing some variants"),
          `${i18next.t("Select at least")} ${limit} ${i18next.t("mandatory variants")}`
        );
        return;
      }
  
      success = true;
    }
  
    if (success && recipeID) {
      setLoad(true);
      try {
        const response = await addToCartService(recipeID, subVariants, qty);
        if (response.success) {
          Alert.alert(
            i18next.t("Added to cart!"),
            i18next.t("You have added a new product to your cart!"),
            [
              {
                text: i18next.t("Go back"),
                onPress: () => {
                  console.log('Navegando hacia atrás.');
                  navigation.goBack();
                },
                style: "cancel"
              },
              {
                text: i18next.t("Add more variants"),
                onPress: () => {
                  console.log('Agregar más variantes');
                },
                style: "cancel"
              },
              {
                text: i18next.t("Go to cart"),
                onPress: () => {
                  console.log('Navegando al carrito.');
                  navigation.navigate("OrderStack");
                }
              }
            ],
            { cancelable: false }
          );
          // Resetear los estados después de agregar al carrito
          resetState();
        } else {
          // Manejar respuesta fallida si es necesario
        }
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        Alert.alert(i18next.t("Error"), i18next.t("There was a problem adding the product to the cart."));
      } finally {
        setLoad(false);
      }
    } else {
    }
  }, [data, recipeID, subVariants, qty, resetState]);

  if (!isAuthenticated) {
    return <Signup />;
  }

  if (isLoading || isFetching || isLoadingApp) {
    return <LoadingScreen />;
  }

  return (
    <Container
      useSafeArea={true}
      label={data.name || ''}
      style={styles.container}
      showHeader={true}
      showBack={true}
      showTwoIconsLabel={true}
      showFooter={false}
      showFooterCart={true}
      FooterPress={onSubmit}
      labelAdd={i18next.t("Add to cart")}
      loading={load}
      disabledCart={load ||!isFormValid}
      TotalPrice={total.data?.amount || "0"}
      add={() => setQty(qty + 1)}
      remove={() => {
        if (qty > 1) {
          setQty(qty - 1);
        }
      }}
      qty={qty}

    >
      <KeyboardAwareScrollView 
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.containerScroll}
        extraScrollHeight={SIZES.gapLarge * 2}
      >
        <ProductCard product={data} />
        <LineDivider />
        {data?.variants.map((variant: TypeVariant) => {
          const subvariants = data.subvariants.filter((sub: TypeSubVariant) => sub.variantID === variant.id);
          return (
            <OptionList
              key={variant.recipeID}
              option={subvariants}
              title={variant.title}
              required={variant.required ? 1 : 0}
              value={subVariants}
              onPress={(id: number) => handlePress(id, variant.id)}
              limites={limites}
              variantID={variant.id}
              limit_qty={variant.limit_qty}
            />
          );
        })}
        <Typography variant='subtitle'>{i18next.t("Notes")}</Typography>
        <InputLabel
          label={i18next.t("Notes")}
          placeholder={i18next.t("Notes for riderMan")}
          onSize={true}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    width: SIZES.width,
  },
  containerScroll: {
    paddingHorizontal: SIZES.gapLarge,
    paddingBottom: SIZES.height / 4
  },
});

export default AddProducts;