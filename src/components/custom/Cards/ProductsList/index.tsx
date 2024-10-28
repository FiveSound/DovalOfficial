import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { useTheme } from '../../../../hooks';
import { StaticCheckbox } from '../../Checkbox';
import { TouchableOpacity } from '../../../native';
import Perks from '../../Perks';
import i18next from '../../../../Translate';
import Icons from '../../Icons';
import { ArrowDown } from '../../../../constants/IconsPro';

interface TypeSubVariant {
  id: number;
  variantID: number;
  name: string;
  price: string;
  defaultSelected: boolean;
}

interface Props {
  option: TypeSubVariant[];
  title: string;
  required: number;
  onPress?: (id: number) => void;
  value: number[];
  limites: { [key: number]: boolean };
  variantID: number;
  limit_qty: number;
}

const OptionList: React.FC<Props> = React.memo(
  ({
    option,
    title,
    required,
    onPress,
    value,
    limites,
    variantID,
    limit_qty,
  }) => {
    const { backgroundMaingrey, Title } = useTheme();
    const [expanded, setExpanded] = useState<boolean>(true);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const animation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
    const [isMeasured, setIsMeasured] = useState<boolean>(false);

    useEffect(() => {
      if (isMeasured) {
        Animated.timing(animation, {
          toValue: expanded ? 1 : 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    }, [expanded, animation, isMeasured]);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    const animatedHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight],
    });

    const animatedRotate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <FlexContainer
        newStyle={[
          styles.container,
          {
            backgroundColor: backgroundMaingrey,
          },
        ]}
      >
        <FlexContainer newStyle={styles.containerTitle}>
          <Typography variant="subtitle" newStyle={styles.title}>
            {title}
          </Typography>
          <FlexContainer variant="row">
            {required === 1 && (
              <Perks
                Reverse={false}
                status={!limites[variantID] ? 'error' : 'success'}
                label={
                  !limites[variantID]
                    ? ` ${i18next.t('Required')} ${limit_qty}`
                    : i18next.t('completed')
                }
              />
            )}
            <Icons
              onPress={toggleExpand}
              appendIcons={
                <Animated.View
                  style={{ transform: [{ rotate: animatedRotate }] }}
                >
                  <ArrowDown
                    color={Title}
                    width={SIZES.icons}
                    height={SIZES.icons}
                  />
                </Animated.View>
              }
            />
          </FlexContainer>
        </FlexContainer>

        {/* Vista de Medición Oculta */}
        {!isMeasured && (
          <View
            style={styles.hiddenContainer}
            onLayout={event => {
              const height = event.nativeEvent.layout.height;
              setContentHeight(height);
              setIsMeasured(true);
            }}
          >
            <FlexContainer>
              {option.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  onPress={() => onPress && onPress(item.id)}
                >
                  <Typography variant="H4title" newStyle={styles.itemName}>
                    {item.name}
                  </Typography>
                  <FlexContainer
                    newStyle={styles.containerPrices}
                    variant="row"
                  >
                    <Typography variant="H4title" newStyle={styles.itemName}>
                      {parseFloat(item.price) > 0 ? `+$${item.price}` : 'Free'}
                    </Typography>
                    <StaticCheckbox
                      checked={value.includes(item.id)}
                      showLabel={false}
                    />
                  </FlexContainer>
                </TouchableOpacity>
              ))}
            </FlexContainer>
          </View>
        )}

        {/* Contenido Animado */}
        {isMeasured && (
          <Animated.View
            style={[
              styles.optionsContainer,
              { height: animatedHeight, overflow: 'hidden' },
            ]}
          >
            <Animated.View style={{ opacity: animation }}>
              <FlexContainer>
                {option.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.item}
                    onPress={() => onPress && onPress(item.id)}
                  >
                    <Typography variant="H4title" newStyle={styles.itemName}>
                      {item.name}
                    </Typography>
                    <FlexContainer
                      newStyle={styles.containerPrices}
                      variant="row"
                    >
                      <Typography variant="H4title" newStyle={styles.itemName}>
                        {parseFloat(item.price) > 0
                          ? `+$${item.price}`
                          : 'Free'}
                      </Typography>
                      <StaticCheckbox
                        checked={value.includes(item.id)}
                        showLabel={false}
                      />
                    </FlexContainer>
                  </TouchableOpacity>
                ))}
              </FlexContainer>
            </Animated.View>
          </Animated.View>
        )}
      </FlexContainer>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.base,
    padding: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...FONTS.semi16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.gapSmall,
    gap: SIZES.gapMedium,
  },
  containerPrices: {
    alignItems: 'center',
  },
  itemName: {
    ...FONTS.semi14,
    marginRight: SIZES.gapLarge,
  },
  label: {
    width: 'auto',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: SIZES.base,
  },
  hiddenContainer: {
    position: 'absolute',
    top: -1000, // Colocado fuera de la pantalla
    left: 0,
    right: 0,
    opacity: 0,
  },
});

export default OptionList;
