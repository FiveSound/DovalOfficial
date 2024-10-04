import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariantService, updateSubVariantService, removeSubVariantService } from "../../../../../../services/recipes";
import { TypeData, TypeVariant } from "./types";
import { styles } from "./styles";
import { TouchableOpacity, View, Text, TextInput, Switch, Pressable } from "../../../../../../components/native";
import { Buttons, Checkbox, FlexContainer, LineDivider, Perks, Typography } from "../../../../../../components/custom";
import { useTheme } from "../../../../../../hooks";
import { SIZES } from "../../../../../../constants/theme";

const Variant = React.memo((props: TypeVariant) => {
  const {
    id,
    title,
    limit_qty,
    onPress,
    onRemove,
    subvariants,
    required,
    disabled,
  } = props;
  const [success, setSuccess] = useState(false);
  const [limitQty, setLimitQty] = useState(limit_qty ? limit_qty : 1);
  const [editRequired, setEditRequired] = useState(required);
  const { backgroundMaingrey } = useTheme();
  const [showAddMore, setShowAddMore] = useState(false);



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

  const onSaveSubVariant = useCallback(async (body: object) => {
    const response = await updateSubVariantService(body);
    if (response.success) {
      handleSuccess();
    }
  }, []);

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
    <>
      <FlexContainer newStyle={[styles.variant, { backgroundColor: backgroundMaingrey }]}>
        {id && <Typography newStyle={styles.texteDelete} variant='H4title' onPress={() => onRemove(id)}>Delete</Typography>}
        <LineDivider />
        <FlexContainer newStyle={styles.variantHeader}>
          <TextInput
            placeholder="Add Name variant"
            onChangeText={(txt) => {
              if (txt.length > 3) {
                mutationOnsave.mutate({
                  id,
                  title: txt,
                });
              }
            }}
            style={styles.inputVariant}
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
                backgroundColor: "red",
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
                backgroundColor: "red",
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
            <Typography variant='H4title'>Select if required</Typography>
            <Checkbox
              label={editRequired ? 'Yes' : 'No'}
              checked={editRequired}
              isTouchable={false}
              onChange={() => {
                setEditRequired(!editRequired);
                mutationOnsave.mutate({
                  id,
                  required: !editRequired,
                  checked: true,
                });
              }}
              containerStyle={{
                width: SIZES.BtnWidth
              }}
            />
          </Pressable>
        </FlexContainer>
        <LineDivider />

        {subvariants.map((row) => (
          <FlexContainer
            key={row.id}
            newStyle={styles.variantSubVariant}
          >
            <FlexContainer newStyle={styles.variantSubVariantName}>
              <TouchableOpacity onPress={() => mutationDelete.mutate(row.id)}>
                <Typography variant='H4title' style={styles.texteDelete}>Eliminar</Typography>
              </TouchableOpacity>
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
                style={styles.inputVariantInput}
              />

            </FlexContainer>
            <FlexContainer newStyle={styles.variantSubVariantPrice}>
              <Typography variant='H4title'>$</Typography>
              <TextInput
                placeholder="Price"
                defaultValue={row.price ? row.price : "0"}
                keyboardType="numeric"
                onChangeText={(txt) => {
                  onSaveSubVariant({
                    id: row.id,
                    price: txt,
                  });
                }}
                style={styles.inputVariantInput}
              />
            </FlexContainer>
          </FlexContainer>
        ))}

        <Buttons label="Add more variants" onPress={onPress} />
        {success && <Perks label="Guardado con exito!" status='success' />}
      </FlexContainer>
      <LineDivider variant='secondary' lineStyle={styles.lineDivider} />
    </>
  );
});

export default Variant;