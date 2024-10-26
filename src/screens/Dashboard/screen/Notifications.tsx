import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import FormBanner from "../components/FormBanner";
import { notificationsService, notificationsUpdateService } from "../../../services/business";
import { useAuth } from "../../../context/AuthContext";

const fields = [
  {
    type: "checkbox",
    name: "email",
    placeholder: "Notification by Email",
  },
  {
    type: "checkbox",
    name: "sms",
    placeholder: "Notification by SMS",
  },
  {
    type: "checkbox",
    name: "app",
    placeholder: " Notification by App",
  },
];

const Notifications = () => {
  const { user } = useAuth();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notifications-screen", user?.userID],
    queryFn: notificationsService,
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (data) {
    return (
      <View style={styles.container}>
        <FormBanner />
{/* 
        <Br />

        <Form
          id="dashboard-notifications-form"
          title="Preferencias de Notificación"
          defaultValues={data}
          onSubmit={notificationsUpdateService}
          fields={fields}
          onSuccessMessage="Updated with success!"
          textButton="Save chages"
        /> */}
      </View>
    );
  }
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
});