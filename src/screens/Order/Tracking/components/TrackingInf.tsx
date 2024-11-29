import React, { memo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks';
import { FONTS, SIZES } from '../../../../constants/theme';
import {
  GridViewIcon,
  Location09Icon,
  SafeDelivery01Icon,
  Store01IconStroke,
} from '../../../../constants/IconsPro';
import {
  Avatars,
  FlexContainer,
  InfoCard,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ScrollView } from '../../../../components/native';
import i18next from '../../../../Translate';
import { useQuery } from '@tanstack/react-query';
import { getRiderDetailsService } from '../../../../services/orders';
import { CLOUDFRONT } from '../../../../services';

type Props = {};

const QUERY_KEY = 'get-rider-details-production-tracking';
const TrackingInf = (props: Props) => {
  const { BackgroundMain, Title } = useTheme();
  const { data } = useSelector((state: RootState) => state.modal);
  const riderID = data?.riderID;
  console.log('riderID', riderID);
  

  const { data: row, isLoading } = useQuery({
    queryKey: [QUERY_KEY, riderID],
    queryFn: getRiderDetailsService,
    enabled: riderID ? true : false,
  });

  console.log('row', row);

  if (data) {
    const {
      rider_waiting,
      riderID,
      details,
      business_name,
      products_length,
      total,
      verification_code,
      products,
    } = data;
    const isValidVerificationCode = verification_code !== null && verification_code !== undefined;
   

    const PinComponents = () => {
      const { Title, backgroundMaingrey } = useTheme();
      const codeString = verification_code ? String(verification_code) : '';

      return (
        <FlexContainer newStyle={styles.container}>
          <FlexContainer style={styles.pinContainer}>
            {codeString.split('').map((digit: string, index: number) => (
              <FlexContainer key={index} newStyle={[styles.pinDigit, { backgroundColor: backgroundMaingrey }]}>
                <Typography variant='subtitle'>
                  {digit}
                </Typography>
              </FlexContainer>
            ))}

          </FlexContainer>
          <Typography variant='subtitle' newStyle={styles.pinText}>
            {i18next.t('Confirm your order to avoid fraud')}
          </Typography>
          <LineDivider variant='secondary' />
        </FlexContainer>
        
      );
    };

    return (
      <FlexContainer
        newStyle={[styles.container, { backgroundColor: BackgroundMain }]}
      >
        <ScrollView>
          <>
            {isValidVerificationCode && (
              <FlexContainer>
                <PinComponents />
              </FlexContainer>
            )}
          
            {riderID !== null && !isLoading && (
              <FlexContainer>
                <InfoCard
                  icon={
                    <Avatars
                      size="medium"
                      source={`${CLOUDFRONT}${row.avatar}`}
                    />
                  }
                  title={row.fullname || ''}
                  description={
                    `${i18next.t('Vehicle')}: ${row.vehicle}` ||
                    ''
                  }
                  showArrow={true}
                  showLineDivider={true}
                />
              </FlexContainer>
            )}

            <FlexContainer>
              <InfoCard
                icon={
                  <Location09Icon
                    width={SIZES.icons * 1.2}
                    height={SIZES.icons * 1.2}
                    color={Title}
                  />
                }
                title={i18next.t('You receive it in')}
                description={details}
                showArrow={true}
                showLineDivider={true}
              />
            </FlexContainer>

            <FlexContainer>
              <InfoCard
                icon={
                  <Store01IconStroke
                    width={SIZES.icons * 1.2}
                    height={SIZES.icons * 1.2}
                    color={Title}
                  />
                }
                title={products[0].name}
                description={
                  `${products_length || 0} ${i18next.t('Products')} | $${total}` ||
                  '0 Products'
                }
                showArrow={true}
                showLineDivider={true}
              />
            </FlexContainer>

            <FlexContainer>
              <InfoCard
                icon={
                  rider_waiting ? (
                    <Store01IconStroke
                      width={SIZES.icons * 1.2}
                      height={SIZES.icons * 1.2}
                      color={Title}
                    />
                  ) : (
                    <SafeDelivery01Icon
                      width={SIZES.icons * 1.2}
                      height={SIZES.icons * 1.2}
                      color={Title}
                    />
                  )
                }
                title={i18next.t('Delivery by')}
                description={
                  rider_waiting && row ? row.fullname || '' : 'Doval Rider'
                }
                orientation="LEGHT"
                showArrow={true}
                showLineDivider={true}
              />
            </FlexContainer>
          </>
        </ScrollView>
      </FlexContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    width: SIZES.width,
    gap: SIZES.gapMedium,
  },
  header: {
    ...FONTS.heading24,
    marginBottom: SIZES.gapMedium,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.gapLarge * 4,
  },
  pinDigit: {
    borderWidth: SIZES.borderWidth,
    borderColor: '#E0E0E0',
    borderRadius: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: SIZES.gapLarge * 2,
    paddingVertical: SIZES.gapLarge,
  },
  pinText: {
    textAlign: 'center',
  },
});

export default memo(TrackingInf);
