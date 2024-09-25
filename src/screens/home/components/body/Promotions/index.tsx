import React, { useRef } from 'react';
import { FlatList, StyleSheet, Animated } from 'react-native';
import { View } from '../../../../../components/native';
import { COLORS, responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { IsLoading } from '../../../../../components/custom';
import RenderItem from './RenderItem';

type Props = {
    data: any;
    IsLoading: boolean
}

const Promotions = (props: Props) => {
    const { data, IsLoading: Loading } = props;
    const scrollX = useRef(new Animated.Value(0)).current;

    if (Loading) {
        return (
            <IsLoading />
        )
    } 

    return (
        <View style={styles.view}>
            <Animated.FlatList
                data={data}
                horizontal
                decelerationRate="fast"
                snapToInterval={SIZES.BtnWidth}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `${item}`}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: responsiveFontSize(140),
        width: SIZES.width,
        alignItems: 'center'
    }
});

export default Promotions;