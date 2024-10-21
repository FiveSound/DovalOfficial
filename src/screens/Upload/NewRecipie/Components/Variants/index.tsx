import React from "react";
import {useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addSubVariantService,
    addVariantService,
    getVariantsByRecipeService,
    removeVariantService,
  } from "../../../../../services/recipes";
  import { useFormContext } from "react-hook-form";
import { Container, Hero, IsLoading, LoadingScreen, Typography } from "../../../../../components/custom";
import { styles } from "./styles";
import VariantComponent from "./Variant";
import { SubVariant, TypeData, Variant } from "./types";
import {  ScrollView, View } from "../../../../../components/native";
  
  
  
  const Variants = () => {
    const { watch } = useFormContext();
    const values = watch();
    const VariantsSide = watch("sidedish") || [];
  
    const { data, isLoading, isFetching, isError } = useQuery({
      queryKey: ["recipe-variants-component", values.id],
      queryFn: getVariantsByRecipeService,
    });
  
    const queryClient = useQueryClient();
  
    const handleAddVariant = async () => {
      const response = await addVariantService(values.id);
      queryClient.setQueryData(
        ["recipe-variants-component", values.id],
        ({ variants, ...rest }: TypeData) => ({
          ...rest,
          variants: [...variants, response.item],
          resume: [...variants, response.item],
        })
      );
    };
  
    const handleAddSubVariant = async (id: number) => {
      const response = await addSubVariantService(id);
      console.log({ item: response.item });
  
      queryClient.setQueryData(
        ["recipe-variants-component", values.id],
        (oldData: any) => ({
          ...oldData,
          subvariants: [...oldData.subvariants, response.item],
        })
      );
    };
  
    const handleRemoveVariant = async (id: number) => {
      const response = await removeVariantService(id);
      if (response.success) {
        queryClient.setQueryData(
          ["recipe-variants-component", values.id],
          ({ variants, ...rest }: TypeData) => ({
            ...rest,
            variants: variants.filter((row) => row.id !== response.id),
            resume: variants.filter((row) => row.id !== response.id),
          })
        );
      }
    };
  
    if (isError) return <Typography variant='H4title'>An ocurred error fetch!</Typography>;
  
    if (isLoading || isFetching) return <LoadingScreen />;
  
    if (data) {
      return (
        <Container 
        label='Side Dish Everyone'
        showBack={true}
        showHeader={true}
        >
        <ScrollView>
          <View style={styles.container}>
            <Hero 
            label="Side Dish"
            sublabel="Add variants to your recipe, and help your users understand what they want to serve it with."
            />
  
            {data.variants.map((row: Variant) => (
              <VariantComponent
                key={row.title}
                id={row.id}
                title={row.title}
                limit_qty={row.limit_qty}
                onPress={() => handleAddSubVariant(row.id)}
                onRemove={(id) => handleRemoveVariant(id)}
                subvariants={data.subvariants.filter(
                  (item: SubVariant) => item.variantID === row.id
                )}
                required={Boolean(row.required)}
              />
            ))}
  
            <VariantComponent
              title="Title variant"
              onPress={handleAddVariant}
              onRemove={() => {}}
              subvariants={[]}
              disabled
            />
          </View>
        </ScrollView>
        </Container>
      );
    }
  };
  
  export default Variants;
  