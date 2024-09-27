import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAPI, useRangeNearbyLocation, useRefreshData, useTheme } from '../../hooks';
import { getDetailsBusinessIDService } from '../../services/business';
import { FlexContainer, LoadingScreen, Tabs } from '../../components/custom';
import { responsiveFontSize, SIZES } from '../../constants/theme';
import { GetMenuBusiness, GetRecipiesBusiness, Layout, Overview, ProfileBusiness , SocialMedia} from './Components';
import { CLOUDFRONT } from '../../services';
import { useNavigation } from '../../components/native';
import i18next from '../../Translate';

type RouteParams = {
    id: string;
}

const Business: React.FC = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const businessID = params.id
    const navigation = useNavigation()
    const navigateToPermissionScreen = useCallback(() => {navigation.navigate("LocationPermissionScreen");}, []);
    const { currentLocation } = useRangeNearbyLocation(navigateToPermissionScreen);
    const [localCurrentLocation, setLocalCurrentLocation] = useState<object | null>(currentLocation)
    const { data, isLoading, refetch } = useAPI({
        queryKey: ["business-details-businessID", businessID],
        queryFn: () => getDetailsBusinessIDService(localCurrentLocation, businessID),
    });
    const { isRefreshing, onRefresh } = useRefreshData([refetch])

    const tabs = [
        { key: 'Menu1', title: i18next.t('Menu'), content: <GetMenuBusiness businessID={businessID} /> },
        { key: 'Overview3', title: i18next.t('Overview'), content: <Overview data={data} />},
      ];
 

    useEffect(() => {
        setLocalCurrentLocation(currentLocation);
    }, [currentLocation]);

    if (isLoading) {
        return <LoadingScreen label={i18next.t('Loading')}/>
    }

    
    if(data){
    const { banner, avatar, business_name, like, rating, details } = data
        return (
            <Layout
                banner={`${CLOUDFRONT}${banner}`}
                avatar={`${CLOUDFRONT}${avatar}`}
                isRefreshing={isRefreshing}
                onRefresh={onRefresh}
            >
                <FlexContainer newStyle={styles.container}>
                    <ProfileBusiness
                        business_name={business_name}
                        Like={like}
                        Rating={rating}
                        SuccessOrders='99+ orders'
                        addressBusiness={details}
                    />
                    <FlexContainer newStyle={styles.containerSOCIAL}>
                        {data?.whatsapp !== null && (
                            <SocialMedia label="WhatsApp" SocialType="ws" color="#25D366" />
                        )}
                        {data?.website !== null && (
                            <SocialMedia label="Website" SocialType='website' color={'#25D366'} />
                        )}
    
                        {data?.website !== null && (
                            <SocialMedia label="Instagram" SocialType="instagram" color="#C13584" />
                        )}
    
                    </FlexContainer>
                    <View style={{ marginBottom: SIZES.gapMedium }} />
                    <Tabs tabs={tabs}/>
                </FlexContainer>
            </Layout>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: responsiveFontSize(28),

    },
    containerSOCIAL: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.gapSmall,
        marginVertical: SIZES.gapSmall,
        paddingHorizontal: SIZES.gapLarge
    }
})
export default Business;