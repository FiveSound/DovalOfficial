import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, useNavigation, View } from '../../../native';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../../constants/theme';
import Typography from '../../Typography';
import {
  ArrowLeft,
  Cancel01Icon,
  Delete03IconStroke,
  HelpCircleIcon,
  HelpSquareIcon,
} from '../../../../constants/IconsPro';
import { ArrowBack } from '../../Arrows';
import Hint from '../../hint';
import Actions from '../../Actions';
import { useTheme } from '../../../../hooks';

type Props = {
  label?: string;
  showBack?: boolean;
  onPress?: () => void;
};

const TwoIconsLabel = (props: Props) => {
  const { label, showBack = true, onPress } = props;
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const { Title } = useTheme();

  const Close = ({ onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Cancel01Icon width={SIZES.icons} height={SIZES.icons} color={Title} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showBack && <ArrowBack />}
      {!showBack && <Close onPress={onPress} />}
      <Typography variant="subtitle" numberOfLines={1} newStyle={styles.label}>
        {label}
      </Typography>
      <Actions onPress={() => {
        console.log('show', show);
        navigation.navigate('SettingStack', { screen: 'Support' });
      }}>
        <HelpCircleIcon
          width={SIZES.icons}
          height={SIZES.icons}
          color={Title}
        />
      </Actions>
      {/* <Hint
        label="You can not get in? Calm down! The cracks in the support will help you in the blink of an eye."
        showLabel={true}
        ShowAlert={show}
        position="right"
        orientation="bottom"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.BtnHeight,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  label: {
    width: SIZES.width / 1.5,
  },
});
export default TwoIconsLabel;
