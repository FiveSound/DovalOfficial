import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing, useColorScheme } from 'react-native';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { useTheme } from '../../../../hooks';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import { CheckmarkCircle02Icon } from '../../../../constants/IconsPro';

interface Step {
  id: number;
  title: string;
  timeEstimated: string;
  message: string;
}

interface OrderProgressProps {
  steps: Step[];
  currentStep: number;
  showHero: boolean;
  messageOptional?: string;
  rider_waiting?: boolean;
  status?: string;
  creation_time?: string;
  estimated_time?: string;
}

const OrderProgress: React.FC<OrderProgressProps> = ({
  steps,
  currentStep,
  showHero = true,
  messageOptional,
  rider_waiting,
  status,
  creation_time,
  estimated_time,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const { backgroundMaingrey, backSuccess, Description } = useTheme();
  const theme = useColorScheme();

  const activeStep = steps.find(step => step.id === currentStep);

  useEffect(() => {
    if (currentStep < steps.length) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(progressAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [currentStep, progressAnim, steps.length]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
 console.log(currentStep, 'currentStep')
  if (!activeStep) {
    return null;
  }

  return (
    <FlexContainer newStyle={styles.container}>
      {status === 'COMPLETED' && currentStep === 3 ? (
        <FlexContainer
          key={activeStep.id}
          newStyle={[
            styles.activeStepContainer,
            {
              backgroundColor: backSuccess,
              borderColor: theme === 'dark' ? COLORS.success : COLORS.success,
            },
          ]}
        >
          <CheckmarkCircle02Icon
            color={COLORS.success}
            width={SIZES.icons * 3}
            height={SIZES.icons * 3}
          />
        </FlexContainer>
      ) : (
        showHero && (
          <FlexContainer
            key={activeStep.id}
            newStyle={[
              styles.activeStepContainer,
              {
                backgroundColor: backSuccess,
                borderColor: theme === 'dark' ? COLORS.success : COLORS.success,
              },
            ]}
          >
            <Typography variant="subtitle" newStyle={styles.title}>
              {rider_waiting ? messageOptional : i18next.t(activeStep.title)}
            </Typography>
            <Typography variant="title" newStyle={styles.description}>
              {creation_time} - {estimated_time}
            </Typography>
          </FlexContainer>
        )
      )}
      {!showHero && (
        <FlexContainer
          key={activeStep.id}
          newStyle={[
            styles.activeStepContainer,
            {
              backgroundColor: backSuccess,
              borderColor: theme === 'dark' ? COLORS.success : COLORS.success,
            },
          ]}
        >
          <Typography variant="title" newStyle={styles.descriptionNoHero}>
            {i18next.t(activeStep.title)} || {activeStep.timeEstimated}
          </Typography>
        </FlexContainer>
      )}

      {/* Barra de progreso animada */}
      <FlexContainer newStyle={styles.progressBarContainer}>
        {steps.map((_, index) => (
          <FlexContainer
            key={index}
            newStyle={[
              styles.progressSegment,
              {
                backgroundColor: backgroundMaingrey,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width:
                    index === 0
                      ? '100%'
                      : currentStep > index
                        ? '100%'
                        : currentStep === index
                          ? '100%'
                          : currentStep + 1 === index &&
                              currentStep < steps.length - 1
                            ? status === 'COMPLETED'
                              ? '100%'
                              : progressWidth
                            : '0%',
                },
              ]}
            />
          </FlexContainer>
        ))}
      </FlexContainer>
      {/* <Typography
        variant="SubDescription"
        newStyle={[
          styles.latestArrival,
          {
            color: status === 'COMPLETED' ? COLORS.success : Description,
          },
        ]}
      >
        {status === 'COMPLETED'
          ? i18next.t('Gracias por su order, ha sido completada')
          : i18next.t(activeStep.message)}
      </Typography> */}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    width: SIZES.width,
    gap: SIZES.gapMedium,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeStepContainer: {
    padding: SIZES.gapLarge,
    width: '98%',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  activeStepContainerNoHero: {
    padding: SIZES.gapSmall,
    width: '98%',
    alignItems: 'center',
  },
  title: {
    ...FONTS.semi18,
    marginBottom: SIZES.gapSmall,
    textAlign: 'center',
  },
  description: {
    ...FONTS.heading24,
    textAlign: 'center',
  },
  descriptionNoHero: {
    ...FONTS.semi18,
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SIZES.radius * 1.4,
    marginVertical: SIZES.radius,
    width: '98%',
  },
  progressSegment: {
    flex: 1,
    marginHorizontal: SIZES.radius / 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
  },
  latestArrival: {
    ...FONTS.text14,
    textAlign: 'center',
    width: '90%',
  },
});

export default OrderProgress;
