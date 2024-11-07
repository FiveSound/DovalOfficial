import { memo } from "react";
import { StyleSheet } from "react-native";
import FlexContainer from "../../../FlexContainer";
import { MenuVertical } from "../Reactions";
import Typography from "../../../Typography";
import { COLORS, SIZES } from "../../../../../constants/theme";
import { useAppSelector } from "../../../../../redux";
import { RootState } from "../../../../../redux/store";
import { useNavigation } from "../../../../native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    item: any;
    showInf: boolean;
};

const Inf = memo(({ item, showInf = true }: Props) => {
    const { user } = useAppSelector((state:RootState) => state.auth)
    const { description, id, username, businessID } = item;
    const MyProfile = user?.username === username ? true : false;
    const navigation = useNavigation();
    const handleNavigation = () => {
  
      if (MyProfile) {
        navigation.navigate('MyProfile');
      } else {
        navigation.navigate('UserProfile', {
          username: username,
          businessID: businessID,
        });
      }
    };
    return (
        showInf && (
            <FlexContainer  style={styles.rows}>
                <TouchableOpacity onPress={handleNavigation}>
                    <FlexContainer variant="row">
                        <Typography variant='H4title' newStyle={styles.title} numberOfLines={1}  >{username}</Typography>
                    </FlexContainer>
                    <Typography numberOfLines={2} variant='SubDescription' newStyle={styles.title}>
                        {description}
                    </Typography>
                </TouchableOpacity>
                <MenuVertical postID={id} />
            </FlexContainer>
        )
    )
});

const styles = StyleSheet.create({
    rows: {
        justifyContent: "space-between",
        // alignItems: "center",
        width: "100%",
        flexDirection: 'row'
    },
    title: {
        marginTop: SIZES.gapSmall,
        width: SIZES.width / 2.6
    },

});

export default Inf;
