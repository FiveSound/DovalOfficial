import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';
import { useTheme } from '../../../../hooks';
import FlexContainer from '../../FlexContainer';
import Avatars from '../../Avatars';
import Typography from '../../Typography';
import { ArrowUp } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import LineDivider from '../../LineDivider';
import CartItem from '../CartItems';
import styles from './styles';
import { CLOUDFRONT } from '../../../../services';
import i18next from '../../../../Translate';
import { Pressable } from '../../../native';
import { Checkbox } from '../../Checkbox';

type CartItemType = {
  cartItemID: number;
  recipeID: number;
  name: string;
  description: string;
  formatprice: string;
  thumbnail: string;
  qty: number;
  businessID: number;
  business_name: string;
  cover: string;
  variants: number[];
};

type Props = {
  row: CartItemType[];
  refetch: () => void;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Accordion: React.FC<Props> = ({ row, refetch, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { Title } = useTheme();
  const business = row[0];

  const animation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animation]);

  const toggleAccordion = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const animatedRotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });


  return (
    <FlexContainer newStyle={styles.container}>
      <Pressable
        onPress={toggleAccordion}
        style={styles.header}
        accessibilityLabel={
          isOpen ? 'Cerrar detalles del negocio' : 'Abrir detalles del negocio'
        }
        accessibilityRole="button"
      >
        <View style={styles.subheader}>
          <Checkbox
            checked={value}
            onChange={onValueChange}
            containerStyle={styles.checkbox}
            isTouchable={false}
          />
          <Avatars source={`${CLOUDFRONT}${business.cover}`} size="medium" />
          <FlexContainer>
            <Typography variant="subtitle" newStyle={styles.business}>
              {business.business_name}
            </Typography>
            <Typography variant="SubDescription">
              {row.length}{' '}
              {row.length > 1 ? i18next.t('Products') : i18next.t('Product')}
            </Typography>
          </FlexContainer>
        </View>
        <Animated.View style={{ transform: [{ rotate: animatedRotate }] }}>
          <ArrowUp
            width={SIZES.icons}
            height={SIZES.icons}
            color={Title}
            accessibilityLabel="Contraer lista de productos"
          />
        </Animated.View>
      </Pressable>
      <LineDivider
        lineStyle={{
          marginBottom: SIZES.gapSmall,
          height: SIZES.gapSmall,
        }}
      />

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
          <View style={styles.dropdown}>
            {row.map(item => (
              <CartItem key={item.cartItemID} row={item}  refetch={refetch} />
            ))}
          </View>
        </View>
      )}

      {/* Contenido Animado */}
      {isMeasured && (
        <Animated.View
          style={[
            styles.dropdown,
            { height: animatedHeight, overflow: 'hidden' },
          ]}
        >
          <Animated.View style={{ opacity: animation }}>
            {row.map(item => (
              <CartItem key={item.cartItemID} row={item} refetch={refetch} />
            ))}
          </Animated.View>
        </Animated.View>
      )}
    </FlexContainer>
  );
};

export default memo(Accordion);
