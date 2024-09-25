import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Skeleton } from "moti/skeleton";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import { Image } from "../../../native";
import IsLoading from "../../Loaders/IsLoading";

type Props = {
  source: string;
};

const Cover = ({ source }: Props) => {
  const theme = useColorScheme();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (source) {
      setLoader(true);
      const timer = setTimeout(() => {
        if (source) {
          setLoader(false);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [source]);

  return loader ? (
    <IsLoading />
  ) : (
    <Image
      source={{ uri: source }}
      contentFit="cover"
      cachePolicy="memory-disk"
      priority="high"
      style={{
        width: responsiveFontSize(80),
        height: responsiveFontSize(80),
        borderRadius: SIZES.gapMedium,
      }}
    />
  );
};

export default Cover;