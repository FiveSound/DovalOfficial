import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
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
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.height / 10 }}
      >
        {row.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
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
              {item.content.map((content) => (
                <ButtonAcces
                  key={content.id}
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
          </View>
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
  itemContainer: {
    marginBottom: SIZES.gapLarge, // Opcional: Añade espacio entre elementos
  },
  subContainer: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    paddingHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapMedium,
  },
  title: {
    marginBottom: SIZES.gapSmall,
    ...FONTS.semi16,
  },
  buttonContainer: {
    width: SIZES.BtnWidth / 1.02,
    paddingHorizontal: SIZES.gapSmall,
  },
  labelStyle: {
    ...FONTS.text16,
  },
});

export default PersonalInf;