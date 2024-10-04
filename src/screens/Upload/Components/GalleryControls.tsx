import React from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Cancel01Icon } from "../../../constants/IconsPro";
import useTheme from "../../../hooks/useTheme";
import { Buttons, LineDivider } from "../../../components/custom";
import { Button, SafeAreaView, TouchableOpacity, useNavigation } from "../../../components/native";

interface GalleryControlsProps {
  pickedMedia: string[];
  label: string;
}

const GalleryControls = ({ pickedMedia, label }: GalleryControlsProps) => {
  const navigation = useNavigation();
  const { color } = useTheme();
  const MediaType = pickedMedia[0]?.type === "video" ? true : false;
 console.log(pickedMedia);
 
  return (
    <>
      {pickedMedia.length >= 1 && (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Cancel01Icon
              width={SIZES.icons / 1.2}
              height={SIZES.icons / 1.2}
              color={color}
            />
          </TouchableOpacity>
          <Buttons
            label={label}
            containerButtons={styles.containerButtons}
            onPress={() => {
              if (pickedMedia.length >= 1) {
                navigation.navigate(MediaType ? "UploadPost" : "UploadReview", {
                  pickedMedia: pickedMedia,
                });
              } else {
                console.log("No video selected");
              }
            }}
          />
        </SafeAreaView>
      )}
      {pickedMedia.length >= 1 && <LineDivider variant="secondary"/>}
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: SIZES.BtnHeight,
    paddingHorizontal: SIZES.margin / 2,
    zIndex: 1,
  },
  containerButtons: {
    justifyContent: "center",
    width: "30%",
  },
});

export default GalleryControls;