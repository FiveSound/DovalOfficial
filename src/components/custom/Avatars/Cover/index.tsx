import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Skeleton } from "moti/skeleton";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import { Image } from "../../../native";
import IsLoading from "../../Loaders/IsLoading";
import { Loading } from "../../../native/Image";

type Props = {
  source: string;
  size: 'small' | 'medium' | 'large';
};

const Cover = ({ source, size = 'medium' }: Props) => {
  const theme = useColorScheme();
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (source) {
      setLoader(true);
      const timer = setTimeout(() => {
        if (source) {
          setLoader(false);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [source]);

  const getSize = () => {
    switch (size) {
      case 'small':
        return responsiveFontSize(54);
      case 'medium':
        return responsiveFontSize(80);
      case 'large':
        return responsiveFontSize(160);
      default:
        return responsiveFontSize(80);
    }
  };

  const imageSize = getSize();

  return loader ? (
    <Loading isLoading={loader} height={imageSize} width={imageSize} />
  ) : ( <Image
      source={{ uri: source }}
      placeholderSource={source}
      showPlaceholder={true}
      contentFit="cover"
      cachePolicy="memory-disk"
      priority="high"
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: SIZES.gapMedium,
      }}
    />
  );
};

export default Cover;