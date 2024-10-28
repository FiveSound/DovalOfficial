import React, { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';
import Typography from '../../Typography';
import ButtonAcces from '../../Buttons/ButtonAcces';
import FlexContainer from '../../FlexContainer';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { ScrollView, useNavigation } from '../../../native';

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
              variant="H4title"
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
                  label={content.label}
                  labelPreview={content.subLabel}
                  ShowLineDivider={false}
                  append={content.icon}
                  showAppend={content.showAppend}
                  onPress={() => {
                    navigation.navigate(content.navigation);
                  }}
                  container={styles.buttonContainer}
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
  },
  title: {
    marginBottom: SIZES.gapLarge,
  },
  buttonContainer: {
    width: SIZES.BtnWidth / 1.02,
    paddingHorizontal: SIZES.gapSmall,
  },
});

export default PersonalInf;
