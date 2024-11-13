import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FlexContainer from '../../FlexContainer';
import LineDivider from '../../LineDivider';
import Typography from '../../Typography';
import Cover from '../../Avatars/Cover';
import { useTheme } from '../../../../hooks';
import styles from './styles';
import { Switch, useNavigation } from '../../../native';
import { CLOUDFRONT } from '../../../../services';
import i18next from '../../../../Translate';
import { ArrowRight01Icon, Clock01Icon, HeartAddIconStroke, ShoppingBag01Icon } from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import { ArrowRight } from '../../Arrows';

export type businessListitems = {
  id: number;
  avatar: string;
  business_name: string;
  timeSend: string;
  amountSend: string;
  rating: string;
  Like: boolean;
  open: boolean;
  onPress?: () => void;
  businessID: number;
  bio: string;
};

const CardBusiness = ({
  item,
}: {
  item: businessListitems;
  onPress?: () => void;
}) => {
  const {
    avatar,
    business_name,
    timeSend,
    amountSend,
    rating,
    Like,
    open,
    id,
    businessID,
    bio,
  } = item;
  const { Title } = useTheme();
  const navigation = useNavigation();
  const CoverBusiness = `${CLOUDFRONT}${avatar}`;
  const memoizedCoverBusiness = useMemo(() => CoverBusiness, [CoverBusiness]);
  const handleNavigation = useCallback(() => {
    if (item) {
      navigation.navigate('MainStackt', { screen: 'Business', params: { id: businessID } });
    }
  }, [navigation]);

  return (
    <>
      <FlexContainer key={id} newStyle={styles.flexContainer}>

        <Typography
          variant="H4title"
          numberOfLines={1}
          newStyle={{
            color: open ? COLORS.success : COLORS.error,
          }}
        >
          {open ? i18next.t('Open store') : i18next.t('closed for moments')}
        </Typography>
        <TouchableOpacity
          onPress={handleNavigation}
          style={styles.touchableOpacity}
        >
          <Cover source={memoizedCoverBusiness} size='medium' />

          <View style={styles.flexContainerInner}>
            <Typography
              variant='title'
              numberOfLines={1}
              newStyle={styles.businessName}
            >
              {business_name}
            </Typography>
            <FlexContainer newStyle={styles.flexContainerInner}>
              <Typography
                variant='H4title'
                newStyle={styles.timeSend}
                numberOfLines={1}
              >
                {bio}
              </Typography>
            </FlexContainer>

          </View>
          <ArrowRight onPress={handleNavigation} />
        </TouchableOpacity>
        <FlexContainer variant='row' newStyle={{ gap: SIZES.gapSmall, marginTop: SIZES.gapSmall }}>
        <FlexContainer newStyle={{ gap: SIZES.gapSmall, alignItems: 'center' }} variant='row'>
          <Clock01Icon color={Title} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
          <Typography variant='H4title' newStyle={styles.timeSend}>
            Times: {timeSend}
          </Typography>
        </FlexContainer>
        <FlexContainer newStyle={{ gap: SIZES.gapSmall, alignItems: 'center' }} variant='row'>
          <ShoppingBag01Icon color={Title} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
          <Typography variant='H4title' newStyle={styles.timeSend}>
            Shopping: {amountSend}
          </Typography>
        </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <LineDivider lineStyle={styles.lineDivider} variant="secondary" />
    </>
  );
};

export default memo(CardBusiness);
