import { StyleSheet } from "react-native";
import { TypeCart } from "../../../../types/cart/Cart.types";
import { Avatars, Box, FlexContainer, Icons, LineDivider, Typography } from "../../../../components/custom";
import { View ,Image, Text, ScrollView } from "../../../../components/native";
import { SIZES } from "../../../../constants/theme";
import { CLOUDFRONT } from "../../../../services";
import { useTheme } from "../../../../hooks";
import i18next from "../../../../Translate";

interface PropsOrderList {
  data: TypeCart[][];
}

type OrderType = {
  title: string;
  cover: string;
  business_name: string;
  row: TypeCart[];
};

const Order = (props: OrderType) => {
    const { border } = useTheme()
  return (
    <Box title={props.title}>
      <FlexContainer style={styles.header}>
        <FlexContainer newStyle={styles.subheader}>
          <Avatars
          size='medium'
          source={`${CLOUDFRONT}${props.cover}`}
          />
          <View>
            <Typography variant='H4title' newStyle={styles.title}>{props.business_name}</Typography>
          </View>
        </FlexContainer>
        <Icons 
       appendIcons={
        <Typography variant='H4title'>{i18next.t("Change")}</Typography>
       }/>
      </FlexContainer>

      <LineDivider lineStyle={{ marginVertical: 15 }} />
      {/* <ScrollView horizontal>
        {props.row.map((item) => (
          <View key={item.postID}>
            <Text
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                textAlign: "center",
                backgroundColor: "#000",
                color: "#FFF",
                borderRadius: 10,
                zIndex: 1,
              }}
            >
              {item.qty}
            </Text>
            <Image
              style={{
                marginLeft: 10,
                width: 80,
                height: 80,
              }}
              source={{ uri: `${CLOUDFRONT}${item.thumbnail}` }}
            />
          </View>
        ))}
      </ScrollView> */}
    </Box>
  );
};

const OrderList = (props: PropsOrderList) => {
  return (
    <>
      {props.data.map((row, index) => (
        <Order
          key={row.businessID}
          title={index === 0 ? "Details order" : ""}
          business_name={row[0].business_name}
          cover={row[0].cover}
          row={row}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subheader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    width: SIZES.width / 2
  },
  subtitle: {
    width: SIZES.width / 2
  },
});

export default OrderList;