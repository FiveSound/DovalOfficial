import React, { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';
import Typography from '../../Typography';
import ButtonAcces from '../../Buttons/ButtonAcces';
import FlexContainer from '../../FlexContainer';
import { FONTS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { ScrollView, useNavigation } from '../../../native';
import Box from '../../box';

interface row {
  label: string;
  content: {
    id: string;
    label: string;
    description: string;
    navigation: string;
    icon: any;
    subLabel: string;
    showAppend: boolean;
    isNavigation: boolean;
  }[];
}
type props = {
  row: row[];
  footerCustom?: ReactNode;
};

const PersonalInf = (props: props) => {
  const { row, footerCustom } = props;
  const { backgroundMaingrey, Description } = useTheme();
  const navigation = useNavigation();

  return (
    <FlexContainer newStyle={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {row.map((item, index) => (
          <>
            <Typography
              variant='title'
              newStyle={[
                styles.title,
                {
                  color: Description,
                },
              ]}
            >
              {item.label}
            </Typography>
            <FlexContainer
              newStyle={[
                styles.subContainer,
                {
                  backgroundColor: backgroundMaingrey,
                },
              ]}
            >
              {item.content.map((content, index) => (
                  <ButtonAcces
                  key={index}
                  label={content.label}
                  labelPreview={content.subLabel}
                  ShowLineDivider={false}
                  append={content.icon}
                  ShowAppendPreview={true}
                  showAppend={content.showAppend}
                  onPress={() => {
                    if (content.isNavigation) {
                      navigation.navigate(content.navigation);
                    }
                  }}
                  container={styles.buttonContainer}
                  labelStyle={styles.labelStyle}
                />
              ))}
            </FlexContainer>
          </>
        ))}
        {footerCustom}
      </ScrollView>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapLarge,
    flex: 1,
  },
  subContainer: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    paddingHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapMedium,
    gap: SIZES.gapSmall,
    padding: SIZES.gapSmall,
  },
  title: {
    marginBottom: SIZES.gapSmall,
    ...FONTS.semi16
  },
  buttonContainer: {
    width: SIZES.BtnWidth / 1.02,
    paddingHorizontal: SIZES.gapSmall,
  },
  labelStyle: {
    ...FONTS.semi16
  },
});

export default PersonalInf;
