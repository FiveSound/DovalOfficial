import React, { ReactNode, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks';
import { scale } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../../constants/theme';
import { LineDivider, Typography } from '../../../components/custom';
import i18next from '../../../Translate';

type Album = {
  title: string;
  id: string;
};
type Props = {
  selectedValue?: string;
  onValueChange?: (itemValue: any, itemIndex: number) => void;
  displayAssetCategories?: () => ReactNode;
  albums?: Album[];
  Proximo: () => void;
  onPress: () => void;
};

const GalleryHeader = ({
  selectedValue,
  onValueChange,
  albums,
  Proximo,
  onPress,
}: Props) => {
  const { color, bgInput, Bg } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue || null);
  // const items = albums.map(album => ({
  //   label: album.title,
  //   value: album.id.toString(),
  // }));

  return (
    <>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scale(40),
          paddingHorizontal: SIZES.margin / 2,
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <Typography variant="subtitle"> {i18next.t('Cancel')} </Typography>
        </TouchableOpacity>
        <View style={{ width: SIZES.width / 2 }}>
          {/* <DropDownPicker
          placeholder="Recientes"
          placeholderStyle={{
            color: color
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => {
            const newValue = callback(value);
            setValue(newValue);
            onValueChange(newValue, items.findIndex(item => item.value === newValue));
          }}
          style={{ backgroundColor: bgInput,  }}
          dropDownContainerStyle={{ backgroundColor: bgInput }}
          textStyle={{
            color: color
          }}
          arrowIconStyle={{
          
          }}
          ArrowDownIconComponent={({style}) => <ArrowDown01Icon style={style} color={color}/>}
          ArrowUpIconComponent={({style}) => <ArrowUp01Icon style={style} color={color}/>}
        /> */}
        </View>
        <TouchableOpacity onPress={Proximo}>
          <Typography
            newStyle={{
              color: COLORS.primary,
            }}
            variant="subtitle"
          >
            {i18next.t('Next')}
          </Typography>
        </TouchableOpacity>
      </SafeAreaView>
      <LineDivider />
    </>
  );
};

export default GalleryHeader;
