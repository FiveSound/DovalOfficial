import React, { useState } from "react";
import { verificateOrderService } from "../../../services/orders";
import { Container, LoadingScreen, ScreenEmpty } from "../../../components/custom";
import { ScrollView, useNavigation } from "../../../components/native";
import { AddressList, CouponList, OrderList, PaymentMethodList, ResumeOrderList } from "./components";
import i18next from "../../../Translate";
import { useQuery } from "@tanstack/react-query";
import { useDashboard } from "../../../context/DashboardContext";
import { SOCKET_ORDER_BUSINESS_NOTIFY } from "../../../constants/sockets";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { setOrderID } from "../../../redux/slides/navigations";
import { RootState } from "../../../redux/store";

interface Props {}

const QUERY_KEY = "screen-checkout-orders-useQuery";
const Checkout = (props: Props) => {
  const { socket } = useDashboard();
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { cartID, couponID } = useAppSelector((state: RootState) => state.navigation);

  const { data, isError, isLoading, isFetching, isRefetching, refetch } = useQuery({
    queryKey: [QUERY_KEY, cartID, couponID],
    queryFn: async () => await verificateOrderService(cartID, couponID),
  });

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await socket?.emitWithAck(SOCKET_ORDER_BUSINESS_NOTIFY, {
        cartID: cartID,
        couponID: couponID,
      });
      console.log("response socket onSubmit", response);
      if (!response.success) throw Error("Error create order!");
      console.log({ response });
      navigation.navigate("ConfirmOrder", { orderID: response.orderID });
      dispatch(setOrderID(response.orderID));
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (isError)
    return (
      <ScreenEmpty
        labelPart1={i18next.t("This order is not available")}
        labelPart2={i18next.t("Please try again later")}
        onPress={refetch}
        labelButton={i18next.t("Try again")}
      />
    );

  if (isLoading || isFetching || isRefetching || submitting)
    return <LoadingScreen label={!submitting ? i18next.t("Loading...") : i18next.t("Processing...")} />;

  if (data) {
    const { location, card, cart, available, details } = data;
    return (
      <Container
        label={i18next.t("Checkout")}
        showBack={true}
        showHeader={true}
        showFooter={true}
        labels={submitting ? i18next.t("Loading...") : i18next.t("Order Now")}
        onPressButtons={onSubmit}
        loading={submitting}
        disabled={submitting}
      >
        <ScrollView>
          <AddressList location={location} details={details} />
          <PaymentMethodList card={card} />
          <CouponList id={couponID} />
          <ResumeOrderList details={details} />
          <OrderList data={cart} />
        </ScrollView>
      </Container>
    );
  }

  return null;
};

export default Checkout;
