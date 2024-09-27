import React, { lazy, memo , Suspense, useEffect, useState} from 'react';
import { IsLoading } from '../../../../components/custom';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
const ButtonLazy = lazy(() => import('../../../../components/custom/Buttons/ButtonAcces'));

type Props = {
    item: {
        countryName: string;
        CodePostal: number;
        codigoISO: string;
    };
    onSelectItem: (item: { countryName: string; CodePostal: number , codigoISO: string}) => void; 
}

const RenderItem = (props: Props) => {
  const { item, onSelectItem } = props;
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 500 });
}, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
          <Suspense fallback={<IsLoading />}>
              <ButtonLazy 
                  label={item.countryName}
                  subLabel=''
                  labelPreview={`${"+"}${item.CodePostal.toString()}`}
                  onPress={() => {
                      onSelectItem(item);
                  }}
              />
          </Suspense>
      </Animated.View>
  )
}
  
  export default memo(RenderItem)