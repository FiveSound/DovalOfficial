import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  ReactNode,
} from 'react';
import { Dimensions, StyleSheet, View, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackDrop from './BackDrop';
import { COLORS, responsiveFontSize } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';

type Props = {
  snapPoints?: string[];
  children?: ReactNode;
  backgroundColor: string;
  backDropColor?: string;
  onClose?: () => void;
  showBackdrop?: boolean;
  LineColor?: string;
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
  expandTo: (index: number) => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({ snapPoints = [], children, backgroundColor, backDropColor, onClose , showBackdrop = true, LineColor}: Props, ref) => {
    const { BackgroundMain, Title } = useTheme();
    const inset = useSafeAreaInsets();
    const { height } = Dimensions.get('screen');
    const percentages = snapPoints.map(point => parseFloat(point.replace('%', '')) / 100);
    const closeHeight = height;
    const openHeight = height - height;
    const openHeights = percentages.map(percentage => height - height * percentage);
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeights[0], {
        duration: 300,
      });
    }, [openHeights, topAnimation]);

    const expandTo = useCallback((index: number) => {
      'worklet';
      topAnimation.value = withTiming(openHeights[index], {
        duration: 300,
      });
    }, [openHeights, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight, {
        duration: 300,
      }, (isFinished) => {
        if (isFinished && onClose) {
          runOnJS(onClose)();
        }
      });
    }, [closeHeight, topAnimation, onClose]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
        expandTo,
      }),
      [expand, close, expandTo],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const findClosestSnapPoint = (value: number) => {
      'worklet';
      let closest = openHeights[0];
      let minDistance = Math.abs(value - openHeights[0]);
      for (let i = 1; i < openHeights.length; i++) {
        const distance = Math.abs(value - openHeights[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closest = openHeights[i];
        }
      }
      return closest;
    };

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        topAnimation.value = context.value + event.translationY;
      })
      .onEnd(() => {
        const threshold = height * 0.8;
        if (topAnimation.value > threshold) {
          close();
        } else {
          const closestSnapPoint = findClosestSnapPoint(topAnimation.value);
          topAnimation.value = withTiming(closestSnapPoint, {
            duration: 300,
          });
        }
      });

    return (
      <>
       {showBackdrop &&
        <BackDrop
        topAnimation={topAnimation}
        backDropColor={backDropColor}
        closeHeight={closeHeight}
        openHeight={openHeight}
        close={close}
      />}
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: backgroundColor,
                paddingBottom: inset.bottom,
              },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={[styles.line, {
                backgroundColor: LineColor || COLORS.dark
              }]} />
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 101
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: responsiveFontSize(20),
    borderTopRightRadius: responsiveFontSize(20),
    zIndex: 100
  },
  lineContainer: {
    marginVertical: responsiveFontSize(10),
    alignItems: 'center',
  },
  line: {
    width: responsiveFontSize(50),
    height: responsiveFontSize(4),
    borderRadius: responsiveFontSize(20),
  },
});