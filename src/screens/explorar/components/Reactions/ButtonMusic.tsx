import React, { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import useAPI from "../../../../hooks/useAPI";
import { getSongByIDService } from "../../../../services/songs";
import { Audio } from "expo-av";
import { CLOUDFRONT } from "../../../../services";
import { Avatars } from "../../../../components/custom";
import styles from "./styles";

type Props = {
  postID: number;
  AvatarArtist: string;
  username: string;
  songID: number;
  isFocused: boolean;
};

type RootStackParamList = {
  Music: {
    songID: number;
  };
};

const ButtonMusic: React.FC<Props> = React.memo(
  ({ username, songID, isFocused, AvatarArtist }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { data, isLoading, isFetching } = useAPI({
      queryKey: [`get-Song-By-ID-Service${songID}`],
      queryFn: () => getSongByIDService(songID),
    });

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const UriSongs =
      data && data.length > 0 ? `${CLOUDFRONT}${data[0]?.keyURL}` : "";
    const UriCover =
      data && data.length > 0 ? `${CLOUDFRONT}${data[0]?.cover}` : "";

    useEffect(() => {
      const loadSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: UriSongs },
          { shouldPlay: isFocused }
        );
        setSound(newSound);
      };

      if (isFocused && data) {
        loadSound();
      }

      return () => {
        sound?.unloadAsync();
      };
    }, [isFocused, data]);

    useEffect(() => {
      if (isFocused) {
        sound?.playAsync();
      } else {
        sound?.pauseAsync();
      }
    }, [isFocused, sound]);

    if (data?.length !== 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            navigation.navigate("Music", { songID });
          }}
          style={styles.container}>
          <Avatars
            onPressAvatar={() => navigation.navigate("Music", { songID })}
            source={AvatarArtist}
            size='small'
            ShowStatus={false}
          />
        </TouchableOpacity>
      );
    }
  }
);

export default ButtonMusic;
