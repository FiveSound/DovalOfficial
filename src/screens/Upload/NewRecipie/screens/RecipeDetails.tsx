import { memo } from "react";
import { useFormContext } from "react-hook-form";
import Layout from "../Components/Layout";
import { Covers } from "../Components/Utils";
import { InputLabel } from "../../../../components/custom";
import { SIZES } from "@/src/constants/theme";
import MoreDetails from "../Components/MoreDetails";

const RecipeDetails = memo(() => {
  const { setValue, watch } = useFormContext();
  const values = watch();

  return (
    <Layout title="" href="RecipeAddDish" disabled={values.name.length === 0 || values.price.length === 0}>
      <Covers data={values.keys} ShowDivider={false} />

      <InputLabel
        label="Recipe Name"
        placeholder="Delicious Recipe Name"
        value={values.name}
        onChangeText={(txt) => {
          setValue("name", txt);
        }}
      />

      <InputLabel
        label="Price $"
        placeholder="Price $"
        value={values.price}
        onChangeText={(txt) => {
          setValue("price", txt);
        }}
      />

      <InputLabel
        placeholder="Describe your recipe and help your customers understand your recipe"
        value={values.description}
        onChangeText={(txt) => {
          setValue("description", txt);
        }}
        labelStyle={{ height: SIZES.height / 14 }}
        inputStyle={{ height: SIZES.height / 14 }}
      />

      <MoreDetails />

      {/* <Button /> */}
    </Layout>
  );
});

export default RecipeDetails;
