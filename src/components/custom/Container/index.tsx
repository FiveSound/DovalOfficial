import React, { ReactNode } from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { SIZES } from '../../../constants/theme'
import { SafeAreaView, View } from '../../native'
import { Skip, TwoIconsLabel } from '../Bar'
import { useTheme } from '../../../hooks'
import FooterButtons from '../Buttons/FooterButtons'
import { FooterCart } from './FooterCart'
import LineDivider from '../LineDivider'
import FlexContainer from '../FlexContainer'

type Props = {
  useSafeArea?: boolean,
  style?: ViewStyle,
  children: React.ReactNode;
  label?: string;
  showBack?: boolean;
  onPress?: () => void;
  showHeader?: boolean;
  showTwoIconsLabel?: boolean;
  showSkip?: boolean;
  showFooter?: boolean;
  labels?: string;
  onPressButtons?: () => void;
  loading?: boolean;
  disabled?: boolean;
  containerButtons?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  Icons?: ReactNode;
  orientationsIcons?: "Left" | "Right";
  variant?: "primary" | "secondary" | "disabled";
  showFooterCart?: boolean;
  FooterPress?: () => void;
  ProductsLength?: number;
  showLineDivider?: boolean;
  onPressSkip?: () => void;
  labelAdd?: string;
  TotalPrice?: string;
  Load?: boolean;
  add?: () => void;
  remove?: () => void;
  qty?: number;
}

const Container = ({ useSafeArea = true, style, children, label, showBack, onPress, showHeader = false, showTwoIconsLabel = true, showSkip = false,
  showFooter = false,
  labels,
  onPressButtons,
  loading,
  disabled,
  containerButtons,
  labelStyle,
  Icons,
  orientationsIcons,
  variant,
  showFooterCart = false,
  FooterPress,
  ProductsLength,
  showLineDivider = false,
  labelAdd,
  TotalPrice,
  Load = false,
  onPressSkip,
  add,
  remove,
  qty
}: Props) => {
  const Component = useSafeArea ? SafeAreaView : View;
  const { BackgroundMain } = useTheme()
  return (
    <Component style={[styles.container, style]}>
      {showHeader && (
        <>
          {showTwoIconsLabel && <TwoIconsLabel label={label} showBack={showBack} onPress={onPress} />}
          {showSkip && <Skip label={label} onPress={onPressSkip} />}
        </>
      )}
      {showLineDivider && <LineDivider />}
      {children}
      {showFooter &&
        <FooterButtons
          label={labels}
          loading={loading}
          disabled={disabled}
          containerButtons={containerButtons}
          labelStyle={labelStyle}
          Icons={Icons}
          orientationsIcons={orientationsIcons}
          variant={disabled ? 'disabled' : 'primary'}
          onPress={onPressButtons}
        />
      }
      {showFooterCart &&
        <>
          <LineDivider />
          <FooterCart
            FooterPress={FooterPress}
            ProductsLength={ProductsLength}
            labelAdd={labelAdd}
            TotalPrice={TotalPrice}
            loading={Load}
            add={add}
            remove={remove}
            qty={qty}
          />

        </>
      }
    </Component>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.gapLarge * 2,
    width: SIZES.width,
  }
})
export default Container