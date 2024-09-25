import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useTheme } from '../../../../../../hooks';
import { View, Image, FlatList } from '../../../../../../components/native';
import { SIZES } from '../../../../../../constants/theme';
import { Dots, LineDivider } from '../../../../../../components/custom';

interface MediaItem {
    uri: string;
    type: 'photo' | 'video';
    id: string;
    extension?: string;
}

interface VideoPreviewProps {
    data: string;
    ShowDivider?: boolean;
    ShowDot?: boolean;
}

const Covers = React.memo(({ data, ShowDivider = false, ShowDot = true, }: VideoPreviewProps) => {
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
    const { borderInput } = useTheme()
    const flatListRef = useRef(null);
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentVisibleIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <>
            <View style={styles.main}>
                <Image
                    contentFit='cover'
                    style={[styles.media, { borderColor: borderInput }]}
                    source={{ uri: data }}
                />
            </View>
            {ShowDivider &&
                <LineDivider />
            }
        </>
    );
});

const styles = StyleSheet.create({
    main: {
        width: SIZES.width,
        height: SIZES.height / 2.3,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    container: {
        width: SIZES.width,
        marginVertical: SIZES.gapMedium,
        alignItems: 'center',
        justifyContent: 'center'
    },
    media: {
        width: SIZES.width / 1.8,
        height: SIZES.height / 2.4,
        borderRadius: SIZES.radiusExtra,
        borderWidth: SIZES.borderWidth / 2
    },
});

export default Covers;