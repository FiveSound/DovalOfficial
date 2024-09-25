import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAPI, useRangeNearbyLocation, useTheme } from '../../hooks';
import { getDetailsBusinessIDService } from '../../services/business';
import { FlexContainer, LoadingScreen } from '../../components/custom';
import { responsiveFontSize, SIZES } from '../../constants/theme';
import { GetMenuBusiness, GetRecipiesBusiness, Layout, Overview, ProfileBusiness , SocialMedia, Tabs} from './Components';
import { CLOUDFRONT } from '../../services';

type RouteParams = {
    id: string;
}

const Business: React.FC = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const businessID = params.id
    console.log('businessID', businessID);
    const navigation = useNavigation<NavigationProp<any>>()
    const navigateToPermissionScreen = useCallback(() => {
        navigation.navigate("LocationPermissionScreen");
    }, []);
    const { currentLocation } = useRangeNearbyLocation(
        navigateToPermissionScreen
    );
    const [localCurrentLocation, setLocalCurrentLocation] = useState<object | null>(currentLocation)
    const { data, isLoading, refetch } = useAPI({
        queryKey: ["business-details-businessID", businessID],
        queryFn: () => getDetailsBusinessIDService(localCurrentLocation, businessID),
    });

    useEffect(() => {
        setLocalCurrentLocation(currentLocation);
    }, [currentLocation]);

    if (isLoading) {
        return <LoadingScreen label='Loading'/>
    }

    console.log('data', data);
    
    return (
        <Layout
            banner={`${CLOUDFRONT}${data?.banner}`}
            avatar={`${CLOUDFRONT}${data?.avatar}`}
        >
            <FlexContainer newStyle={styles.container}>
                <ProfileBusiness
                    business_name={data?.business_name}
                    Like={data?.like}
                    Rating={data?.rating}
                    SuccessOrders='99+ orders'
                    addressBusiness={data?.details}
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
                <Tabs
                    MenuComponent={<GetMenuBusiness businessID={businessID} />}
                    RecipeComponent={<GetRecipiesBusiness businessID={businessID} />}
                    OverviewComponent={<Overview data={data} />}
                />
            </FlexContainer>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: responsiveFontSize(28)
    },
    containerSOCIAL: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.gapSmall,
        marginVertical: SIZES.gapSmall
    }
})
export default Business;