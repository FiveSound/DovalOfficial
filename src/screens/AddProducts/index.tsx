import React, { useEffect, useState, useCallback } from "react";
import { Container, InputLabel, LineDivider, LoadingScreen, OptionList, ProductCard, Typography } from "../../components/custom";
import { Alert, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity, useNavigation, View, Image, Text } from "../../components/native";
import { SIZES } from "../../constants/theme";
import { addToCartService, getRecipeVariantsService, getTotalVariantsService } from "../../services/cart";
import { useQuery } from "@tanstack/react-query";
import i18next from "../../Translate";
import { iconsNative } from "../../constants";

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
  const navigation = useNavigation();

  const total = useQuery({
    queryKey: ["cart-total-screen", recipeID, JSON.stringify(subVariants), qty],
    queryFn: getTotalVariantsService,
    enabled: !!recipeID,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["cart-variants-screen", recipeID],
    queryFn: getRecipeVariantsService,
    enabled: !!recipeID,
  });


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
    if (total.data) {
      setLoad(false);
    }
  }, [total.data]);

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
      // Manejar caso donde no se cumple la condición de éxito
    }
  }, [data, recipeID, subVariants, qty, resetState]);

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Container
      useSafeArea={true}
      style={styles.container}
      showHeader={true}
      showTwoIconsLabel={true}
      showFooter={false}
      showFooterCart={true}
      FooterPress={onSubmit}
      labelAdd={i18next.t("Add to cart")}
      loading={load}
      disabled={load}
      TotalPrice={total.data?.amount || "0"}
      add={() => setQty(qty + 1)}
      remove={() => {
        if (qty > 1) {
          setQty(qty - 1);
        }
      }}
      qty={qty}
    >
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <ProductCard product={data} />
        <LineDivider />
        {data?.variants.map((variant: TypeVariant) => {
          const subvariants = data.subvariants.filter((sub: TypeSubVariant) => sub.variantID === variant.id);
          return (
            <OptionList
              key={variant.id}
              option={subvariants}
              title={variant.title}
              required={variant.required ? 1 : 0}
              value={subVariants}
              onPress={(id: number) => handlePress(id, variant.id)}
              limites={limites}
              variantID={variant.id}
            />
          );
        })}
        <Typography variant='subtitle'>{i18next.t("Notes")}</Typography>
        <InputLabel
          label={i18next.t("Notes")}
          placeholder={i18next.t("Notes for riderMan")}
          onSize={true}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    paddingHorizontal: SIZES.gapLarge
  },
});

export default AddProducts;