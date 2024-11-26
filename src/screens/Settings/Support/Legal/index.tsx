import { ButtonAcces, CardsPreview, Container, FlexContainer, Typography } from '@/src/components/custom';
import { StyleSheet } from 'react-native';
import React from 'react';
import { data, legalData } from './data';
import { EditUser02Icon, Legal01Icon } from '@/src/constants/IconsPro';
import { FONTS, SIZES } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks';
import { useNavigation } from '@/src/components/native';

const Legal = () => {
  const { border, Title, backgroundMaingrey } = useTheme();
  const navigation = useNavigation();
  const appent = (
    <FlexContainer
      newStyle={[
        styles.container,
        {
          backgroundColor: border,
        },
      ]}
    >
      <Legal01Icon width={SIZES.icons} height={SIZES.icons} color={Title} />
    </FlexContainer>
  );

  return (
    <Container
    label='Legal'
    showHeader={true}
    >
      <CardsPreview row={data} showAvatar={false} custom={appent} />
      <FlexContainer newStyle={[styles.containerFlex, {
        backgroundColor: backgroundMaingrey,
      }]} >
      {
        legalData.map((item) => (
         <ButtonAcces 
         key={item.id}
         label={item.label}
         onPress={() => navigation.navigate(item.navigation)}
         container={styles.containerButton}
         labelStyle={styles.labelStyle}
         ShowAppendPreview={true}
         ShowLineDivider={false}
         />
        ))
      }
      </FlexContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.gapLarge,
  },
  containerButton: {
    padding: SIZES.gapLarge,
    width: SIZES.width / 1.1,
  },
  labelStyle: {
    ...FONTS.text16,
  },
  containerFlex: {
    borderRadius: SIZES.gapLarge,
    marginHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapLarge,
  },
});

export default Legal;