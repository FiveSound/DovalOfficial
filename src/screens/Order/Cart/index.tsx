import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { RefreshControl, ScrollView, useNavigation } from "../../../components/native";
import {
  Accordion,
  Container,
  LoadingScreen,
  ScreenEmpty,
} from "../../../components/custom";
import { SIZES } from "../../../constants/theme";
import { Ilustrations } from "../../../constants";
import styles from "./styles";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Cart = () => {
  const { cart, isLoading, refetching } = useCart();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoadingApp,
    isAuthenticated
  } = useSelector((state: RootState) => state.auth);


  const onRefresh = async () => {
    setRefreshing(true);
    await refetching();
    setRefreshing(false);
  };

  const handleBusiness = () => {
    navigation.navigate("SearchBusiness");
  };

  const handleNavigate = () => {
    navigation.navigate("Checkout", {
      locationID: null,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (cart.list.length === 0 && !isLoading && !isLoadingApp && isAuthenticated) {
        await refetching();
      }
    };
    fetchData();
  }, [cart, isLoading, isLoadingApp, isAuthenticated, refetching]);

  if (isLoading && isLoadingApp) return <LoadingScreen />;

  if (cart.list.length === 0 && isAuthenticated) {
    return (
      <Container 
      showBack={true} 
      showHeader={true} 
      label={i18next.t("Cart")}

      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScreenEmpty
            source={Ilustrations.CharcoPet}
            labelPart1={i18next.t("Oops! Your cart is empty 🍽️")}
            subLabel={i18next.t("Once you add items from a restaurants or storem your cart will appear here")}
            ImgWidth={SIZES.width}
            ImgHeigth={SIZES.height / 2}
            labelButton={i18next.t("View restaurants")}
            labelStylePart1={styles.labelpart1}
            onPress={handleBusiness}
          />
        </ScrollView>
      </Container>
    );
  }

  if (cart.list.length > 0 && isAuthenticated) {
    return (
      <Container
        showBack={true}
        showHeader={true}
        label={i18next.t("Cart")}
        showFooterCart={true}
        FooterPress={handleNavigate}
        ProductsLength={cart.list.flat().length || 0}
        labelAdd={i18next.t("Checkout")}
        TotalPrice={cart.total || '0'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cart.list.map((row: any) => (
            <Accordion
              key={row.businessID}
              row={row}
            />
          ))}
        </ScrollView>
      </Container>
    );
  }

  return null; // Opcional: manejar otros casos
};

export default Cart;