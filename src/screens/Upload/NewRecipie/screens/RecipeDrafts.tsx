import { memo } from "react";
import { Text } from "react-native";
import Layout from "../components/Layout";

const RecipeDrafts = memo(() => {
  return (
    <Layout title="Hola Drafts" href="RecipeMedia">
      <Text>Hola Drafts</Text>
    </Layout>
  );
});

export default RecipeDrafts;
