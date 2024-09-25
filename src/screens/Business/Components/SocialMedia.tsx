import React from "react";
import { TouchableOpacity } from "react-native";
import {
    EarthIcon,
  InstagramIcon,
  InstagramIconStroke,
  TiktokIcon,
  TiktokIconStroke,
  WhatsappIconStroke,
} from "../../../constants/IconsPro";
import { SIZES } from "../../../constants/theme";
import { Typography } from "../../../components/custom";
type Props = {
  label: string;
  SocialType: "instagram" | "tiktotk" | "ws" | "website";
  color?: string;
};

const SocialMedia = ({ label, SocialType, color }: Props) => {
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

        case "website":
            return (
              <EarthIcon
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

export default SocialMedia;
