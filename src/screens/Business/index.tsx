import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useAPI, useRangeNearbyLocation, useRefreshData } from '../../hooks';
import { getDetailsBusinessIDService } from '../../services/business';
import { Container, LoadingScreen, Tabs } from '../../components/custom';
import { GetMenuBusiness, Overview, ProfileBusiness } from './Components';
import { useNavigation } from '../../components/native';
import i18next from '../../Translate';
import BannerBusiness from './Components/BannerBusiness';

type RouteParams = {
    id: string;
}

const Business: React.FC = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const businessID = params.id
    const navigation = useNavigation()
    const navigateToPermissionScreen = useCallback(() => { navigation.navigate("LocationPermissionScreen"); }, []);
    const { currentLocation } = useRangeNearbyLocation(navigateToPermissionScreen);
    const [localCurrentLocation, setLocalCurrentLocation] = useState<object | null>(currentLocation)
    const { data, isLoading, refetch } = useAPI({
        queryKey: ["business-details-businessID", businessID],
        queryFn: () => getDetailsBusinessIDService(localCurrentLocation, businessID),
    });
    const { isRefreshing, onRefresh } = useRefreshData([refetch])
    console.log(data)
    const tabs = [
        { key: 'Menu1', title: i18next.t('Menu'), content: <GetMenuBusiness businessID={businessID} /> },
        { key: 'Overview3', title: i18next.t('Overview'), content: <Overview data={data} /> },
    ];


    useEffect(() => {
        setLocalCurrentLocation(currentLocation);
    }, [currentLocation]);

    if (isLoading) {
        return <LoadingScreen label={i18next.t('Loading')} />
    }


    if (data) {
        const { banner, avatar, business_name } = data
        return (
            <Container
                label={business_name}
                useSafeArea={true}
                showBack={true}
                showHeader={true}
                style={{paddingHorizontal: 0}}
            >  
                 <BannerBusiness banner={banner} avatar={avatar} />
                 <ProfileBusiness data={data} />
                <Tabs tabs={tabs} />
            </Container>
        )
    }

}

export default Business;