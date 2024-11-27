import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { editProfileService, getProfileEditService, updateCoverProfileService } from "../../../services/business";
import { useAppSelector } from "@/src/redux";
import { RootState } from "@/src/redux/store";
import AvatarForm from "../components/AvatarForm";
import Form from "../components/Form";
import { FlexContainer } from "@/src/components/custom";
import { useTheme } from "@/src/hooks";
import i18next from "@/src/Translate";

const fields = [
  {
    type: "text",
    name: "business_name",
    placeholder: "Business Name *",
    required: true,
  },
  {
    type: "readonly",
    name: "email",
    placeholder: "Email",
  },
  // {
  //   type: "text",
  //   name: "nit",
  //   placeholder: "NIT *",
  //   required: true,
  // },
  {
    type: "number",
    name: "phone",
    placeholder: "Phone Number *",
    required: true,
  },
  // {
  //   type: "text",
  //   name: "details",
  //   placeholder: "Direccion *",
  //   required: true,
  // },
];

const Profile = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)
  const { BackgroundMain } = useTheme();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["profile-dashboard-screen", user?.userID],
    queryFn: getProfileEditService,
  });

  const queryClient = useQueryClient();

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (data) {
    return (
      <FlexContainer newStyle={[styles.container, { backgroundColor: BackgroundMain }]}>
        <AvatarForm
          source={data.cover}
          onSubmit={async (pathKey: any) => {
            await updateCoverProfileService(pathKey);

            queryClient.setQueryData(["header-dashboard-component"], (oldData: object) => ({
              ...oldData,
              cover: pathKey,
            }));
          }}
        />
        <Form
          id="dashboard-support"
          defaultValues={data}
          onSubmit={async (values) => {
            const response = await editProfileService(values);
            queryClient.setQueryData(["header-dashboard-component"], (oldData: object) => ({
              ...oldData,
              business_name: values.business_name,
            }));

            return response;
          }}
          fields={fields}
          onSuccessMessage={i18next.t("profile.successMessage")}
          textButton={i18next.t("Save changes")}
        />
      </FlexContainer>
    );
  }
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
