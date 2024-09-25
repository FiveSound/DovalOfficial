import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { COLORS, responsiveFontSize, SIZES } from '../../../../../constants/theme';

interface PropsPromotion {
    index: number;
    item: any;
    scrollX: Animated.Value;
}

const RenderItem = ({ item, index, scrollX }: PropsPromotion) => {
    const inputRange = [
        (index - 1) * SIZES.BtnWidth,
        index * SIZES.BtnWidth,
        (index + 1) * SIZES.BtnWidth,
    ];

    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1, 0.8], // Increased the scale difference for more noticeable animation
        extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5], // Increased the opacity difference for more noticeable animation
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            key={index}
            style={[styles.touchableOpacity, { transform: [{ scale }], opacity }]}
        >
            <FlexContainer>
                <Typography variant='subtitle' newStyle={styles.title}>{item.label}</Typography>
                <Typography variant='subtitle' newStyle={styles.title}>{item.subLabel}</Typography>
                <TouchableOpacity 
                    style={styles.innerTouchableOpacity}
                >
                    <Typography variant='subtitle' newStyle={styles.labelAction}>{item.labelAction}</Typography>
                </TouchableOpacity>
            </FlexContainer>
         
            <Image 
                source={item.cover}
                style={styles.image}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        width: SIZES.BtnWidth,
        height: responsiveFontSize(130),
        borderRadius: SIZES.gapMedium,
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.gapSmall,
        flexDirection: 'row',
        padding: SIZES.gapMedium,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    innerTouchableOpacity: {
        paddingHorizontal: SIZES.gapMedium,
        paddingVertical: SIZES.gapSmall,
        backgroundColor: COLORS.light,
        borderRadius: SIZES.radius,
        width: 'auto',
        alignItems: 'center'
    },
    image: {
        width: responsiveFontSize(110),
        height: responsiveFontSize(110)
    },
    title: {
        color: COLORS.light
    },
    labelAction: {
        color: COLORS.dark
    }
});

export default RenderItem;