import React from "react";
import { StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import FlexContainer from "../../FlexContainer";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";
import { Pressable, View, Image } from "../../../native";

type Props = {
    mediaSource: string;
    onPressImg: () => void;
    isSelected: boolean;
    mediaType: string;
    duration: string | undefined;
    CountSelect: number | undefined;
    mediaKey: string;
};

const CardGallery = React.memo(({mediaKey, mediaSource, mediaType, onPressImg, isSelected, duration, CountSelect }: Props) => {
    return (
        <Pressable 
        key={mediaKey}
        onPress={onPressImg} 
        style={styles.container}>
            <FlexContainer
                newStyle={isSelected ? styles.selectedContainer : styles.unselectedContainer}
            >
                {isSelected ?
                    <Typography 
                    variant='H4title'
                    newStyle={styles.selectedText}
                    >{CountSelect}</Typography>
                    : <View />
                }
            </FlexContainer>
            {mediaType === 'video' ? (
                <Video
                    source={{ uri: mediaSource }}
                    style={styles.media}
                    isLooping={false}
                    useNativeControls={false}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isMuted={true}
                />
            ) : (
                <Image
                    placeholderSource={mediaSource}
                    style={styles.media}
                    priority='high'
                    cachePolicy='memory-disk'
                    contentFit='cover'
                />
            )}
            <FlexContainer
                newStyle={styles.durationContainer}>
                <Typography
                    variant='H4title'>
                    {duration}
                </Typography>
            </FlexContainer>
        </Pressable>
    );
});

export default CardGallery;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width / 3 - 3,
        height: SIZES.width / 2 - 2,
        margin: responsiveFontSize(1),
    },
    media: {
        width: SIZES.width / 3 - 3,
        height: SIZES.width / 2 - 2,
    },
    selectedContainer: {
        position: "absolute",
        zIndex: 2,
        right: responsiveFontSize(4),
        top: responsiveFontSize(4),
        backgroundColor: COLORS.success,
        borderWidth: SIZES.borderWidth / 2,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: responsiveFontSize(180),
        padding: 0,
        width: responsiveFontSize(22),
        height: responsiveFontSize(22),
        alignItems: 'center',
        justifyContent: 'center'
    },
    unselectedContainer: {
        position: "absolute",
        zIndex: 2,
        right: responsiveFontSize(4),
        top: responsiveFontSize(4),
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: SIZES.borderWidth / 2,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderRadius: responsiveFontSize(180),
        padding: SIZES.gapLarge / 1.2,
        width: responsiveFontSize(22),
        height: responsiveFontSize(22),
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedText: {
        color: COLORS.dark,
    },
    durationContainer: {
        position: 'absolute',
        bottom: responsiveFontSize(4),
        right: responsiveFontSize(4),
        zIndex: 200,
        backgroundColor: 'transparent'
    }
});