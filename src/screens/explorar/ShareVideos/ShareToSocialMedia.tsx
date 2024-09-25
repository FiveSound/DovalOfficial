import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Image } from "../../../constants/ThemeDark";
import { SIZES } from "../../../constants";
import { responsiveFontSize } from "../../../constants/theme";
import { Typography, LineDivider } from "../../../components";
import { scale } from "react-native-size-matters";

const socialMediaPlatforms = [
  // {
  //   id: "1",
  //   name: "Compartir",
  //   Img: require("../../../assets/icons/Share.png"),
  // },
  {
    id: "2",
    name: "Whatsapp",
    Img: require("../../../assets/icons/WhatsApp.png"),
  },
  {
    id: "3",
    name: "Copiar enlace",
    Img: require("../../../assets/icons/Share.png"),
  },
  {
    id: "4",
    name: "Facebook",
    Img: require("../../../assets/icons/Facebook.png"),
  },
  {
    id: "5",
    name: "Instagram",
    Img: require("../../../assets/icons/Instagram.png"),
  },
  {
    id: "6",
    name: "Messenger",
    Img: require("../../../assets/icons/Messeger.png"),
  },
];

const ShareToSocialMedia = () => {
  return (
    <>
      <View style={styles.container}>
        <Typography
          variant="H4title"
          newStyle={styles.title}
        >
          Compartir en redes sociales
        </Typography>
        <FlatList
          data={socialMediaPlatforms}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => console.log("Test")}
              style={styles.button}
            >
              <Image
                source={item.Img}
                style={styles.Img}
                contentFit="contain"
              />
              <Typography
                variant="SubDescription"
                numberOfLines={1}
                newStyle={styles.buttonText}
              >
                {item.name}
              </Typography>
            </TouchableOpacity>
          )}
        />
      </View>
      <LineDivider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsiveFontSize(20),
  },
  title: {
    marginBottom: responsiveFontSize(10),
  },
  button: {
    marginRight: responsiveFontSize(15),
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
  },
  Img: {
    width: responsiveFontSize(38),
    height: responsiveFontSize(38),
    borderRadius: responsiveFontSize(80),
  },
});

export default ShareToSocialMedia;
