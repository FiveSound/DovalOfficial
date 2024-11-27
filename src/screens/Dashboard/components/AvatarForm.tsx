import { useState } from "react";
import { Image, StyleSheet} from "react-native";
import * as ImagePicker from "expo-image-picker";import { uploadImageService, uploadMediaServiceV2 } from "@/src/services/upload";
import { TouchableOpacity, View } from "@/src/components/native";
import { IsLoading } from "@/src/components/custom";
import { CLOUDFRONT } from "@/src/services";
import { PencilEdit02Icon } from "@/src/constants/IconsPro";
import { SIZES } from "@/src/constants/theme";
import { useTheme } from "@/src/hooks";
;

type Props = {
  source: string;
  onSubmit: (key: string) => Promise<any>;
};

const AvatarForm = ({ source, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState(source);
  const { Title } = useTheme();
  const handleImagePick = async () => {
    try {
      setIsLoading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        let file = result.assets[0];
        const awsFile = await uploadMediaServiceV2({
          uri: file.uri,
          fileName: file.fileName,
          type: file.type,
        });

        await onSubmit(awsFile.key);

        setDefaultValue(awsFile.key);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleImagePick} disabled={isLoading}>
      <Image style={styles.avatar} source={{ uri: `${CLOUDFRONT}${defaultValue}` }} />
      <View style={styles.button}>
        {!isLoading && <PencilEdit02Icon width={SIZES.icons} height={SIZES.icons} color={Title}/>}
        {isLoading && <IsLoading />}
      </View>
    </TouchableOpacity>
  );
};

export default AvatarForm;

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: "cover",
  },
  button: {
    marginTop: -20,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#337aff",
  },
});
