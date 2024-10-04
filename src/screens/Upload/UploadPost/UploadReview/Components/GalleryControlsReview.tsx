import React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../../hooks';
import { COLORS, SIZES } from '../../../../../constants/theme';
import { Cancel01Icon } from '../../../../../constants/IconsPro';
import { LineDivider } from '../../../../../components/custom';


interface GalleryControlsProps {
  pickedMedia: string[];
  label: string
}

const GalleryControlsReview = ({ pickedMedia, label }: GalleryControlsProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { color } = useTheme()
  return (
    <>
      {pickedMedia.length >= 1 &&
        <SafeAreaView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: SIZES.BtnHeight,
            paddingHorizontal: SIZES.margin / 2,
            zIndex: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('TabsNavigator')}>
            <Cancel01Icon
              width={SIZES.icons / 1.2}
              height={SIZES.icons / 1.2}
              color={color}
            />
          </TouchableOpacity>
          <Button
            title={label}
            color={COLORS.primary}
            onPress={() => {
              if (pickedMedia.length >= 1) {
                navigation.navigate('UploadPost', { pickedMedia: pickedMedia });
              } else {
                console.log('No video selected');
              }
            }}
          />
        </SafeAreaView>}
      {pickedMedia.length >= 1 && <LineDivider />}
    </>

  );
};

export default GalleryControlsReview;