import React, { ReactNode } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import useTheme from '../../../hooks/useTheme';
import { ArrowLeft, ShoppingBag01IconStroke } from '../../../constants/IconsPro';
import { useCart } from '../../../context/CartContext';
import useCustomNavigation from '../../../context/useCustomNavigation';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { Container, FlexContainer, Typography } from '../../../components/custom';
import { RefreshControl, useNavigation, View } from '../../../components/native';
import BannerBusiness from './BannerBusiness';

type Props = {
    children: ReactNode;
    banner: string;
    avatar: string;
    isRefreshing: boolean;
    onRefresh: () => void;
}

const Layout = (props: Props) => {
    const { children, banner, avatar, isRefreshing, onRefresh } = props;

    return (
        <Container 
        useSafeArea={false}
        style={{
            paddingHorizontal: 0
        }}>
            <BusinessHeader />
            <ScrollView
                 refreshControl={<RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                 />}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                contentContainerStyle={{
                    alignItems: "center",
                    width: SIZES.width,
                    backgroundColor: 'transparent',
                    paddingBottom: responsiveFontSize(100),
                }}
            >
                <BannerBusiness
                    banner={banner}
                    avatar={avatar}
                />
                {children}
            </ScrollView>
        </Container>
    )
}


const BusinessHeader = () => {
const navigation = useNavigation()
const { cart } = useCart()
    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity
            onPress={() => navigation.goBack()}
             style={[styles.buttons, {  backgroundColor: COLORS.dark,}]}>
                <ArrowLeft
                    width={SIZES.icons}
                    height={SIZES.icons}
                />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')}
            style={styles.buttons2}>
                <View style={{
                    backgroundColor: COLORS.dark,
                    borderRadius: SIZES.padding,
                    padding: SIZES.gapSmall / 2,
                }}>
                    <ShoppingBag01IconStroke
                        width={SIZES.icons}
                        height={SIZES.icons} />
                </View>
                <FlexContainer newStyle={{
                    backgroundColor: COLORS.error,
                    padding: SIZES.gapSmall / 2,
                    borderRadius: SIZES.gapLarge
                }}>
                <Typography variant='subtitle'
                newStyle={{
                    color: COLORS.dark
                }}>{cart?.length || 0}</Typography>
                </FlexContainer>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.BtnWidth,
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.gapLarge,
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    buttons: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: SIZES.padding,
        padding: SIZES.gapMedium / 1.6,
        borderWidth: SIZES.borderWidth,
        borderColor: "rgba(255, 255, 255, 0.3)"
    },
    buttons2: {
        backgroundColor: COLORS.TranspDark,
        borderRadius: SIZES.padding,
        padding: SIZES.gapSmall / 1.6,
        borderWidth: SIZES.borderWidth,
        borderColor: "rgba(255, 255, 255, 0.3)",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SIZES.gapMedium / 2
    }
})
export default Layout