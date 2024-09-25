import { Skeleton } from 'moti/skeleton';
import React from 'react'
import { useColorScheme, View } from 'react-native';
import { responsiveFontSize, SIZES } from '../../constants/theme';

type Props = {}

const SkeletonPosts = () => {
    const theme = useColorScheme();
    

    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <View  style={{ width: "33.33%", padding: responsiveFontSize(1) }}>
          <Skeleton
            width="100%"
            height={SIZES.height / 5}
            colorMode={theme === "dark" ? "dark" : "light"}
            radius={0}
          />
      </View>
      </View>
    );
  };

  export default SkeletonPosts