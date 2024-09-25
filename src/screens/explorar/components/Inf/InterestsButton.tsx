import React from "react";
import { Buttons, FlexContainer } from "../../../../components/custom";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { useTheme } from "../../../../hooks";
import { EyeIcon, ViewOffSlashIcon } from "../../../../constants/IconsPro";

type Props = {
  Insterests?: boolean;
};

const InterestsButton = (props: Props) => {
  const { Insterests = false } = props;
  const { backgroundMaingrey , Description} = useTheme();

  return (
    Insterests && (
      <FlexContainer newStyle={styles.container}>
        <Buttons
          label="Im interested"
          orientationsIcons="Right"
          Icons={<EyeIcon color={Description} 
          width={SIZES.icons}
          height={SIZES.icons}/>
        }
          containerButtons={[
            styles.buttons,
            {
              backgroundColor: backgroundMaingrey,
            },
          ]}
          labelStyle={styles.label}
        />
        <Buttons
          label="Im not interested"
          orientationsIcons="Right"
          Icons={<ViewOffSlashIcon color={Description} 
          width={SIZES.icons}
          height={SIZES.icons}/>
        }
          containerButtons={StyleSheet.flatten([
            styles.buttons,
            {
              backgroundColor: backgroundMaingrey,
            },
          ])}
          labelStyle={styles.label}
        />
      </FlexContainer>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapSmall,
    marginVertical: SIZES.gapSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: "100%",
    height: SIZES.BtnHeight / 1.2,
    borderRadius: SIZES.radius,
  },
  label: {
    ...FONTS.semi14,
  },
});

export default InterestsButton;
