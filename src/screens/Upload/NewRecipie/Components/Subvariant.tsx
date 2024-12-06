import { memo, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { StyleSheet, Platform, Modal, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, View, Switch, Text, TouchableOpacity } from "@/src/components/native";
import Pickers from "../Components/Pickers";
import { Delete03IconSharp } from "@/src/constants/IconsPro";
import { COLORS, FONTS, responsiveWidth, SIZES } from "@/src/constants/theme";
import { FlexContainer, InputLabel, Typography } from "@/src/components/custom";
import { useTheme } from "@/src/hooks";
import InputVariants from "./InputVariants";

type Props = {
  id: number;
  name: string;
  limit_qty: string;
  required: boolean;
  mutationAddSubVariant: UseMutationResult<any, Error, number, unknown>;
  mutationRemoveVariant: UseMutationResult<any, Error, number, unknown>;
  mutationRemoveSubVariant: UseMutationResult<any, Error, number, unknown>;
  mutationEditVariant: UseMutationResult<
    { id: number; name: string; value: string | boolean },
    Error,
    { id: number; name: string; value: string | boolean },
    unknown
  >;
  mutationEditSubVariant: UseMutationResult<
    { id: number; name: string; value: string | boolean },
    Error,
    { id: number; name: string; value: string | boolean },
    unknown
  >;
};

const Subvariant = memo((props: Props) => {
  const placeholder = "Ej: Papas, Salsas...";
  const { Title, backgroundMaingrey, TransBack } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.limit_qty);

  const handlePickerChange = (value: string) => {
    setSelectedValue(value);
    props.mutationEditSubVariant.mutate({ id: props.id, name: "limit_qty", value: value });
    setModalVisible(false);
  };

  return (
    <FlexContainer newStyle={styles.subvariant}>
      <FlexContainer variant='row' newStyle={styles.container}>
        <FlexContainer variant='column' newStyle={[styles.price, { backgroundColor: backgroundMaingrey }]}>
          <Typography variant="H4title">Precio</Typography>
          <TextInput
            placeholder="Price"
            defaultValue="0"
            keyboardType="numeric"
            style={{ ...FONTS.semi14, color: Title }}
            onChangeText={(txt) => props.mutationEditSubVariant.mutate({ id: props.id, name: "price", value: txt })}
          />
        </FlexContainer>
        <InputVariants
          placeholder={placeholder}
          onChangeText={(txt: any) => props.mutationEditSubVariant.mutate({ id: props.id, name: "name", value: txt })}
          orientation="Up"
          containerStyle={styles.containerInputs}
          inputStyle={styles.containerInputs}
        />
        <TouchableOpacity
          onPress={() => props.mutationRemoveSubVariant.mutate(props.id)}
          disabled={props.mutationRemoveSubVariant.isPending}
        >
          <Delete03IconSharp width={SIZES.icons} height={SIZES.icons} color={COLORS.error} />
        </TouchableOpacity>
      </FlexContainer>

      <FlexContainer variant="row" newStyle={styles.required}>
        <Typography variant="H4title">Requerido</Typography>
        <Switch
          onValueChange={(value) => {
            props.mutationEditSubVariant.mutate({ id: props.id, name: "required", value: value });
          }}
          value={props.required}
        />

       {
        props.required && (
          <View style={{ flexDirection: 'row', marginHorizontal: SIZES.padding, alignItems: 'center', gap: SIZES.gapMedium }}>
          <Typography variant="H4title">Límites:</Typography>
          {Platform.OS === "ios" ? (
            <>
              <TouchableOpacity
                style={[styles.pickerButton, { borderColor: COLORS.success, backgroundColor: COLORS.backSuccess }]}
                onPress={() => setModalVisible(true)}
              >
                <Typography variant="H4title" newStyle={{ color: COLORS.dark }}>
                  {selectedValue ? `Limit: ${selectedValue}` : "Selecciona un límite"}
                </Typography>
              </TouchableOpacity>

              <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={[styles.modalBackground, {backgroundColor: TransBack}]}>
                    <View style={styles.modalContainer}>
                      <Pickers
                        onChange={handlePickerChange}
                        defaultValue="1"
                        value={selectedValue}
                        list={[
                          { label: "1", value: "1" },
                          { label: "2", value: "2" },
                          { label: "3", value: "3" },
                          { label: "4", value: "4" },
                          { label: "5", value: "5" },
                          { label: "6", value: "6" },
                          { label: "7", value: "7" },
                          { label: "8", value: "8" },
                          { label: "9", value: "9" },
                          { label: "10", value: "10" },
                        ]}
                        label={selectedValue ? `Limit: ${selectedValue}` : "0"}
                      />
                      <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </>
          ) : (
            <Pickers
              onChange={(value: string) => {
                props.mutationEditSubVariant.mutate({ id: props.id, name: "limit_qty", value: value });
              }}
              defaultValue="1"
              value={props.limit_qty}
              list={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
              ]}
              label={props.limit_qty ? `Limit: ${props.limit_qty}` : "0"}
              
            />
          )}
        </View>
        )
       }
      </FlexContainer>
    </FlexContainer>
  );
});

export default Subvariant;

const styles = StyleSheet.create({
  subvariant: {
    marginBottom: SIZES.gapLarge,
    gap: SIZES.gapMedium,
  },
  input_subtitle: {
    maxWidth: responsiveWidth(200),
    borderBottomWidth: SIZES.borderWidth
  },
  price: {
    gap: SIZES.gapSmall,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    padding: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapLarge
  },
  required: {
    gap: SIZES.gapMedium,
    alignItems: 'center'
  },
  name: {
    gap: SIZES.gapLarge,
    justifyContent: 'space-between',
    width: '100%'
  },
  container: {
    gap: SIZES.gapMedium,
    alignItems: 'center'
  },
  containerInputs: {
    width: '74%'
  },
  pickerButton: {
    padding: SIZES.gapSmall,
    borderWidth: SIZES.borderWidth,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerLabel: {
    ...FONTS.semi16
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    padding: SIZES.gapLarge,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    alignItems: 'center'
  },
});
