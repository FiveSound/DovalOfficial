import { useEffect, useState } from "react";
import {  RouteProp, useRoute } from "@react-navigation/native";
import { getProfileUserByUsernameService } from "../../services/accounts";
import { useAuth } from "../../context/AuthContext";
import { useAPI, useTheme } from "../../hooks";
import { LoadingScreen, Typography } from "../../components/custom";
import { useNavigation } from "../../components/native";
import { AvatarProfile, Follows, Inf, LayoutProfile, TabsMyProfile } from "../MyProfile/Components";
import { MyMenu, MyPosts, MySaves, MyShares, CtoUserProfile } from "./Components";
import i18next from "../../Translate";

interface RouteParams {
    username: string;
    businessID: string;
}

type Props = {
};

const UserProfile = (props: Props) => {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const { username, businessID } = route.params;
    const { user, currentLocation } = useAuth();
    const navigation = useNavigation()
    const [refreshing, setRefreshing] = useState(false);

    const { data, isError, isLoading, isFetching, isRefetching, refetch } =
        useAPI({
            queryKey: ["getProfileUserByUsernameService", username],
            queryFn: getProfileUserByUsernameService,
        });
        
    useEffect(() => {
        if (refreshing) {
            refetch();
            setRefreshing(false);
        }
    }, [refreshing]);

    if (isLoading || isFetching || isRefetching) {
        return <LoadingScreen />;
    }

    if (isError) {
        console.error("Error fetching data:", { isError });
        return (
          <LayoutProfile
            data={null}
            isRefreshing={isRefetching}
            onRefresh={refetch}
          >
            <Typography variant="H4title">{i18next.t("Error fetching data")}</Typography>
          </LayoutProfile>
        );
      }

    return (
        <LayoutProfile
            data={data}
            isRefreshing={refreshing}
            onRefresh={refetch}
        >
            <AvatarProfile data={data} refetch={refetch} />
            <Inf data={data} />
            <CtoUserProfile data={data} />
            <Follows
                data={data}
            onPressFollowing={() =>
              navigation.navigate("Followers", {
                initialIndex: 1,
                username: data.username,
              })
            }
            onPressFollowers={() =>
              navigation.navigate("Followers", {
                initialIndex: 0,
                username: data.username,
              })
            }
            />
            <TabsMyProfile
                MyPosts={<MyPosts username={username} currentLocation={currentLocation} />}
                Myshares={<MyShares username={username} />}
                MySaves={<MySaves username={username} />}
                MyMenu={<MyMenu businessID={businessID} />}
            />
        </LayoutProfile>
    );
};

export default UserProfile;