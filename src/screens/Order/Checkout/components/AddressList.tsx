import { StyleSheet} from 'react-native';
import { memo } from 'react';
import { useNavigation } from '../../../../components/native';
import {
  Box,
  FlexContainer,
  Icons,
  Typography,
} from '../../../../components/custom';
import { SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';

type Props = {
  location: {
    details: string;
    tag: string;
  };
  details: {
    delivery: string;
    duration: string;
  };
};

const AddressList = (props: Props) => {
  const { location } = props;
  const navigation = useNavigation();
  const handleChange = () => {navigation.navigate('MyLocations');};

  return (
    <Box title={i18next.t('Deliver to')}
    sucess={location.details ? true : false}
    >
      <FlexContainer newStyle={styles.header}>
        {location?.details ? (
          <FlexContainer newStyle={styles.container}>
            <Typography variant="subtitle">{location?.tag}</Typography>
            <Typography
              numberOfLines={2}
              newStyle={styles.text}
              variant="SubDescription"
            >
              {location?.details}
            </Typography>
          </FlexContainer>
        ) : (
          <FlexContainer>
            <Typography variant="H4title">
              {i18next.t('Select address to')}
            </Typography>
          </FlexContainer>
        )}
        <Icons
          onPress={handleChange}
          styles={{
            borderRadius: SIZES.radius,
          }}
          appendIcons={
            <Typography variant="H4title">{i18next.t('Change')}</Typography>
          }
        />
      </FlexContainer>
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    width: SIZES.width / 1.4,
  },
  container: {
    gap: SIZES.gapSmall,
  },
  icons: {
    backgroundColor: 'transparent',
  },
  containerIcons: {
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
});

export default memo(AddressList);
