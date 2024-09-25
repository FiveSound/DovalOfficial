import React from "react";
import { TouchableOpacity } from "react-native";
import {
  InstagramIcon,
  InstagramIconStroke,
  TiktokIcon,
  TiktokIconStroke,
  WhatsappIconStroke,
} from "../../../constants/IconsPro";
import { Typography } from "../../../components";
import { SIZES } from "../../../constants";

type Props = {
  label: string;
  SocialType: "instagram" | "tiktotk" | "ws";
  color: string;
};

const SocialItems = ({ label, SocialType, color }: Props) => {
  const renderIcon = () => {
    switch (SocialType) {
      case "instagram":
        return (
          <InstagramIconStroke
            color={color}
            width={SIZES.icons / 1.4}
            height={SIZES.icons / 1.4}
          />
        );
      case "tiktotk":
        return (
          <TiktokIconStroke
            color={color}
            width={SIZES.icons / 1.4}
            height={SIZES.icons / 1.4}
          />
        );
      case "ws":
        return (
          <WhatsappIconStroke
            color={color}
            width={SIZES.icons / 1.4}
            height={SIZES.icons / 1.4}
          />
        );
    }
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: SIZES.gapSmall,
      }}
    >
      {renderIcon()}
      <Typography variant="SubDescription">{label}</Typography>
    </TouchableOpacity>
  );
};

export default SocialItems;
