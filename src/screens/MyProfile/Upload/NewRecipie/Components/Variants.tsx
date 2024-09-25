import {
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    TextInput,
    ScrollView,
  } from "react-native";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import {
    addSubVariantService,
    addVariantService,
    getVariantsByRecipeService,
    updateVariantService,
    removeSubVariantService,
    removeVariantService,
    updateSubVariantService,
  } from "../../../../../services/recipes";
  import { useState } from "react";
  import { useFormContext } from "react-hook-form";
  
  type Variant = {
    id: number;
    userID: string;
    title: string;
    limit_qty: number;
    required: boolean;
  };
  
  type SubVariant = {
    id: number;
    name: string;
    variantID: number;
    price: string;
  };
  
  type TypeData = {
    variants: Variant[];
    subvariants: SubVariant[];
    resume: String[];
  };
  
  type TypeVariant = {
    id?: number;
    title: string;
    limit_qty?: number;
    onPress: () => void;
    onRemove: (id: number) => void;
    subvariants: SubVariant[];
    required?: boolean;
    disabled?: boolean;
  };
  
  const Variant = ({
    id,
    title,
    limit_qty,
    onPress,
    onRemove,
    subvariants,
    required,
    disabled,
  }: TypeVariant) => {
    const [success, setSuccess] = useState(false);
    const [limitQty, setLimitQty] = useState(limit_qty ? limit_qty : 1);
    const [editRequired, setEditRequired] = useState(required);
  
    const { watch } = useFormContext();
    const values = watch();
    const queryClient = useQueryClient();
  
    const handleSuccess = () => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    };
  
    const mutationOnsave = useMutation({
      mutationFn: updateVariantService,
      onSuccess: (response) => {
        return queryClient.setQueryData(
          ["recipe-variants-component", values.id],
          ({ variants, resume, ...rest }: TypeData) => ({
            ...rest,
  
            // Actualizar variantes
            variants: variants.map((row) => {
              if (row.id === response.id) {
                return { ...row, required: response.required };
              }
              return row;
            }),
  
            // Resumen es solo para presentar en el componente "Details"
            resume: variants.map((row) => {
              if (row.id === response.id) {
                return { ...row, title: response.title };
              }
  
              return row;
            }),
          })
        );
      },
    });
  
    const onSaveSubVariant = async (body: object) => {
      const response = await updateSubVariantService(body);
      if (response.success) {
        handleSuccess();
      }
    };
  
    const mutationDelete = useMutation({
      mutationFn: removeSubVariantService,
      onSuccess: (response) => {
        return queryClient.setQueryData(
          ["recipe-variants-component", values.id],
          ({ subvariants, ...rest }: TypeData) => ({
            ...rest,
            subvariants: subvariants.filter((row) => row.id !== response.id),
          })
        );
      },
    });
  
    return (
      <View style={styles.variant}>
        {id && <Text onPress={() => onRemove(id)}>Eliminar</Text>}
        <View style={styles.variantHeader}>
          <TextInput
            placeholder="Variante"
            onChangeText={(txt) => {
              if (txt.length > 3) {
                mutationOnsave.mutate({
                  id,
                  title: txt,
                });
              }
            }}
            style={{ fontWeight: "bold", fontSize: 18 }}
            defaultValue={title}
            // value={title}
            returnKeyType="done"
            autoFocus
            readOnly={disabled}
          />
  
          {editRequired && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Text>Limite</Text>
              <Pressable
                onPress={() => {
                  // if (limitQty < subvariants.length) return;
                  // No añadir mas elementos
                  let newValue = limitQty + 1;
  
                  mutationOnsave.mutate({
                    id,
                    limit_qty: newValue,
                  });
  
                  setLimitQty(newValue);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#FF5500",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  +
                </Text>
              </Pressable>
  
              <TextInput
                readOnly
                defaultValue={`${limitQty}`}
                value={`${limitQty}`}
                maxLength={1}
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                keyboardType="number-pad"
              />
              <Pressable
                onPress={() => {
                  let newValue = limitQty - 1;
  
                  if (newValue < 1) return;
  
                  mutationOnsave.mutate({
                    id,
                    limit_qty: newValue,
                  });
  
                  setLimitQty(newValue);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#F17D43",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  -
                </Text>
              </Pressable>
            </View>
          )}
  
          <Pressable style={styles.switch}>
            <Text>Required</Text>
            <Switch
              onChange={(e) => {
                setEditRequired(e.nativeEvent.value);
                mutationOnsave.mutate({
                  id,
                  required: e.nativeEvent.value,
                  checked: true,
                });
              }}
              value={editRequired}
              disabled={disabled}
            />
          </Pressable>
        </View>
  
        {subvariants.map((row) => (
          <View
            key={row.id}
            style={styles.variantSubVariant}
          >
            <View>
              <TextInput
                placeholder="Ejemplo: Yucas, Papas"
                defaultValue={row.name}
                onChangeText={(txt) => {
                  onSaveSubVariant({
                    id: row.id,
                    name: txt,
                  });
                }}
                autoFocus
              />
              <TouchableOpacity onPress={() => mutationDelete.mutate(row.id)}>
                <Text style={{ color: "#FF5500" }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
              <Text>$</Text>
              <TextInput
                placeholder="Precio"
                defaultValue={row.price ? row.price : "0"}
                keyboardType="numeric"
                onChangeText={(txt) => {
                  onSaveSubVariant({
                    id: row.id,
                    price: txt,
                  });
                }}
              />
            </View>
          </View>
        ))}
  
        <TouchableOpacity
          style={styles.variantButton}
          onPress={onPress}
        >
          <Text style={styles.variantButtonText}>Add more</Text>
        </TouchableOpacity>
        {success && <Text>Guardado con exito!</Text>}
      </View>
    );
  };
  
  const Variants = () => {
    const { watch } = useFormContext();
    const values = watch();
  
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
  
    if (isError) return <Text>An ocurred error fetch!</Text>;
  
    if (isLoading || isFetching) return <ActivityIndicator />;
  
    if (data) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Side Dish</Text>
            <Text style={styles.subtitle}>
              Add variants to your recipe, and help your users understand what
              they want to serve it with.
            </Text>
  
            {data.variants.map((row: Variant) => (
              <Variant
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
  
            <Variant
              title="Variant"
              onPress={handleAddVariant}
              onRemove={() => {}}
              subvariants={[]}
              disabled
            />
          </View>
        </ScrollView>
      );
    }
  };
  
  export default Variants;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      alignItems: "center",
    },
    title: {
      marginBottom: 4,
      fontSize: 22,
      fontWeight: "bold",
    },
    subtitle: {
      marginBottom: 20,
    },
    variant: {
      marginBottom: 20,
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: "#DDD",
      borderRadius: 5,
    },
    variantHeader: {
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    variantSubVariant: {
      marginBottom: 10,
      padding: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    variantButton: {
      paddingHorizontal: 4,
      paddingVertical: 10,
      alignItems: "center",
      backgroundColor: "#C8C8C8",
    },
    variantButtonText: {
      fontWeight: "bold",
    },
    switch: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
  });