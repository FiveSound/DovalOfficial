import React from 'react';
import {
  FlexContainer,
  Icons,
  IsLoading,
  Typography,
} from '../../../../components/custom';
import { PlusSignIcon } from '../../../../constants/IconsPro';
import { AddressList } from './components';
import styles from './styles';
import { COLORS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity, useNavigation } from '../../../../components/native';
import { useAppDispatch } from '../../../../redux';
import { closeAddressModal } from '../../../../redux/slides/modalSlice';

type Props = {};

const Main = (props: any) => {
  const { data, Loading, isFetching, isRefetching } = props;
  const dispatch = useAppDispatch();
  const { Title } = useTheme();
  const navigation = useNavigation();

  if (Loading) {
    return <IsLoading />;
  }

  return (
    <FlexContainer newStyle={styles.containerMain}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          dispatch(closeAddressModal());
          navigation.navigate('SettingStack', { screen: 'MyLocationsGeneral' });
        }}
      >
        <Icons
          onPress={() => {
            dispatch(closeAddressModal());
            navigation.navigate('SettingStack', {
              screen: 'MyLocationsGeneral',
            });
          }}
          appendIcons={
            <PlusSignIcon
              width={SIZES.icons}
              height={SIZES.icons}
              color={Title}
            />
          }
          styles={styles.containerCircle}
        />
        <Typography variant="subtitle" newStyle={styles.text}>
          Add Address
        </Typography>
      </TouchableOpacity>
      <AddressList data={data} />
    </FlexContainer>
  );
};

export default Main;
