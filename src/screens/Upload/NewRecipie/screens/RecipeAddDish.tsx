import { memo } from "react";
import { Alert, Text } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useFormContext } from "react-hook-form";
import { ActivityIndicator, ScrollView, useNavigation, View } from "@/src/components/native";
import Layout from "../Components/Layout";
import { Buttons, Container, Hero, IsLoading, LineDivider, LoadingScreen } from "@/src/components/custom";
import Variant from "../Components/Variant";

import {
  addSubVariantService,
  addVariantService,
  publishRecipeService,
  getVariantsByRecipeService,
  removeSubVariantService,
  removeVariantService,
} from "@/src/services/recipes";
import i18next from "@/src/Translate";
import { SIZES } from "@/src/constants/theme";

type VariantType = {
  id: number;
  userID: string;
  recipeID: number;
  title: string;
  required: boolean;
  limit_qty: number;
};

type SubVariantType = {
  id: number;
  variantID: number;
  name: string;
  price: string;
  limit_qty?: number;
  required?: boolean;
};

type Payload = {
  variants: VariantType[];
  subvariants: SubVariantType[];
};

const QUERY_KEY = "recipe-variants-component";

const Variants = memo(() => {
  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext();
  const navigation = useNavigation();
  const values = watch();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getVariantsByRecipeService(values.id),
    enabled: values.id ? true : false,
  });

  const queryClient = useQueryClient();

  const mutationAddVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (id: number) => await addVariantService(id),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY], ({ variants, ...rest }: { variants: VariantType[] }) => ({
        ...rest,
        variants: [...variants, data.item],
      }));
    },
  });

  const mutationRemoveVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (id: number) => await removeVariantService(id),
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY_KEY], ({ variants, subvariants }: Payload) => ({
        variants: variants.filter((row) => row.id !== response.id),
        subvariants: subvariants.filter((row) => row.variantID !== response.id),
      }));
    },
  });

  const mutationAddSubVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (id: number) => await addSubVariantService(id),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY], (oldData: { subvariants: SubVariantType[] }) => ({
        ...oldData,
        subvariants: [...oldData.subvariants, data.item],
      }));
    },
  });

  const mutationRemoveSubVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (id: number) => await removeSubVariantService(id),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY], ({ subvariants, ...oldData }: { subvariants: SubVariantType[] }) => ({
        ...oldData,
        subvariants: subvariants.filter((row) => row.id !== data.id),
      }));
    },
  });

  const mutationEditVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { id: number; name: string; value: string | boolean }) => params,
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY_KEY], (oldData: Payload) => {
        return {
          ...oldData,
          variants: oldData.variants.map((row) => {
            if (row.id === response.id) {
              return { ...row, [response.name]: response.value };
            }

            return row;
          }),
        };
      });
    },
  });

  const mutationEditSubVariant = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { id: number; name: string; value: string | boolean }) => params,
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY_KEY], (oldData: Payload) => {
        return {
          ...oldData,
          subvariants: oldData.subvariants.map((row) => {
            if (row.id === response.id) {
              return { ...row, [response.name]: response.value };
            }

            return row;
          }),
        };
      });
    },
  });

  if (isLoading || isFetching) return <LoadingScreen label={i18next.t("Loading")} />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <Container showBack={true} showHeader={true} label={i18next.t("Agregar adicionales")}>
        <ScrollView>
          <Hero label="Agregar adicionales a tus recetas" sublabel="los adicionales son opciones que puedes agregar a tus recetas para que los clientes puedan elegir entre ellas." />

          {data.variants.map((row: VariantType) => (
            <Variant
              key={row.id.toString()}
              id={row.id}
              title={row.title}
              recipeID={row.recipeID}
              subvariants={data.subvariants.filter((col: SubVariantType) => col.variantID === row.id)}
              mutationAddSubVariant={mutationAddSubVariant}
              mutationRemoveVariant={mutationRemoveVariant}
              mutationRemoveSubVariant={mutationRemoveSubVariant}
              mutationEditVariant={mutationEditVariant}
              mutationEditSubVariant={mutationEditSubVariant}
            />
          ))}

          {mutationAddVariant.isPending && <IsLoading />}
          {mutationRemoveSubVariant.isPending && <IsLoading />}
          {mutationAddSubVariant.isPending && <IsLoading />}
          {mutationRemoveVariant.isPending && <IsLoading />}
          {isSubmitting && <IsLoading />}

          <View
            style={{
              marginTop: SIZES.gapMedium,
              alignItems: "center",
              gap: SIZES.gapMedium,
            }}
          >
            <Buttons
              variant='primary'
              label={i18next.t("Agregar adicionales +")}
              onPress={() => mutationAddVariant.mutate(values.id)}
              disabled={mutationAddVariant.isPending}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
});

export default Variants;
