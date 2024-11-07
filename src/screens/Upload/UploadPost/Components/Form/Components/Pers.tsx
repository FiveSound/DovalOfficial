import React from 'react';
import { Icons, Typography } from '../../../../../../components/custom';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  label: string
  navigation: NavigationProp<any>
}

const Pers = (props: Props) => {
const { label, navigation } = props
  return <Icons
  onPress={() => navigation.navigate(label)}
  appendIcons={
    
    <>
    <Typography variant='H4title'>{label}</Typography>
    </>
  }
   />;
};

export default Pers;
