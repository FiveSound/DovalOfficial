import { InputLabel, IsLoading, Typography } from "@/src/components/custom";
import { View, TouchableOpacity, Text } from "@/src/components/native";
import { COLORS, responsiveFontSize, SIZES } from "@/src/constants/theme";
import Checkbox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet} from "react-native";


type Props = {
  id: string;
  title?: string;
  onSubmit: (data: any) => Promise<any>;
  defaultValues: any;
  fields: any[];
  onSuccessMessage: string;
  textButton: string;
};

const Form = (props: Props) => {
  const {
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isSubmitting, isDirty, errors, isSubmitSuccessful },
  } = useForm({ defaultValues: props.defaultValues });

  const onSubmit = async (data: any) => {
    const { success, errors, ...rest } = await props.onSubmit(data);

    if (!success) {
      errors?.map(({ name, message }) => setError(name, { message }));
      return;
    }

    reset(rest);
  };

  return (
    <View id={props.id} style={styles.container}>
      {props.title && <Text style={styles.title}>{props.title}</Text>}

      {props.fields.map((field) => (
        <View key={field.name} style={[styles.field]}>
          {(field.type === "number" || field.type === "text" || field.type === "readonly") && (
            <>
              <Text style={styles.label}>{field.placeholder}</Text>
              <Controller
                control={control}
                rules={{ required: field.required }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputLabel
                    testID={`testID-input-${field.name}`}
                    placeholder={field.placeholder}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={field.type === "number" ? "numeric" : "default"}
                    maxLength={field.maxLength || 50}
                    editable={field.type !== "readonly"}
                    ContainerInput={styles.container}
                  />
                )}
                name={field.name}
              />
            </>
          )}

          {field.type == "checkbox" && (
            <View style={styles.checkbox}>
              <Controller
                control={control}
                rules={{ required: field.required }}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    testID={`testID-checkbox-${field.name}`}
                    value={value}
                    onValueChange={onChange}
                    color={value ? "#4630EB" : undefined}
                  />
                )}
                name={field.name}
              />
              <Text style={styles.label}>{field.placeholder}</Text>
            </View>
          )}

          {errors[field.name] && (
            <Text style={styles.textError}>{errors[field.name]?.message?.toString() || "Field required *"}</Text>
          )}
        </View>
      ))}

      {isSubmitSuccessful && <Text style={styles.textSuccess}>{props.onSuccessMessage}</Text>}
      <TouchableOpacity
        testID="testID-button"
        onPress={handleSubmit(onSubmit)}
        style={[styles.submit, { opacity: isSubmitting || !isDirty ? 0.6 : 1 }]}
        disabled={isSubmitting || !isDirty}
        accessible={true}
      >
        <Typography variant='H4title' newStyle={styles.submitText}>{props.textButton}</Typography>
        {isSubmitting && <IsLoading color='dark' />}
      </TouchableOpacity>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    minWidth: responsiveFontSize(380),
    maxWidth: responsiveFontSize(380),
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  field: {
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    gap: 10,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    paddingHorizontal: SIZES.gapLarge,
    paddingVertical: SIZES.gapSmall,
    borderWidth: SIZES.borderWidth,
    borderRadius: SIZES.radius,
  },
  submit: {
    marginTop: SIZES.gapMedium,
    minWidth: responsiveFontSize(360),
    maxWidth: responsiveFontSize(360),
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.gapMedium,
    justifyContent: "center",
    padding: SIZES.gapMedium,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  submitText: {
    textAlign: "center",
    color: COLORS.dark,
  
  },
  textError: {
    marginTop: SIZES.gapSmall,
    color: COLORS.error,
    fontWeight: "bold",
  },
  textSuccess: {
    marginTop: SIZES.gapSmall,
    color: COLORS.success,
    fontWeight: "bold",
  },
});
