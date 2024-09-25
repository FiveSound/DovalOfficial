import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  uploadImageService,
  uploadMediaServiceV2,
} from "../../../../../services/upload";
import { useFormContext } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { addDraftService } from "../../../../../services/recipes";
import { Ilustrations } from "../../../../../constants";

const Media = () => {
  const { setValue, watch } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const { uri, key } = watch();

  const pickImage = async () => {
    setIsSubmitting(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      let file = result.assets[0];

      // Ensure fileName is set
      if (!file.fileName) {
        const uriParts = file.uri.split('/');
        file.fileName = uriParts[uriParts.length - 1];
      }

      const awsFile = await uploadMediaServiceV2({
        uri: file.uri,
        fileName: file.fileName,
        type: file.type,
      });

      const response = await addDraftService({
        cover: [{ key: awsFile.key }],
      });

      setValue("id", response.id);
      setValue("key", awsFile.key);
      setValue("uri", awsFile.thumbnail);
    }

    setIsSubmitting(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <Button
          title="Upload Media"
          onPress={() => pickImage()}
          // onPress={() => uploadMediaServiceV2()}
          disabled={isSubmitting || key ? true : false}
        />
        <Button
          title="Drafts"
          onPress={() => navigation.navigate("RecipeDrafts")}
          color="#000"
        />
        <Button
          title="Continue"
          onPress={() => navigation.navigate("RecipeDetails")}
          disabled={!key}
        />
      </View>
      <Image
        style={styles.image}
        source={uri ? { uri } : Ilustrations.EmptyMedia}
      />

      {isSubmitting && <ActivityIndicator />}
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  closeText: {
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: 300,
    height: 300,
    objectFit: "cover",
  },
});