import { StyleSheet, Text, View } from 'react-native';
import FormBanner from '../components/FormBanner';
import { supportService } from '../../../services/business';
import { useAuth } from '../../../context/AuthContext';

const fields = [
  {
    type: 'readonly',
    name: 'name',
    placeholder: 'Nombre *',
    required: true,
  },
  {
    type: 'readonly',
    name: 'email',
    placeholder: 'Email *',
    required: true,
  },
  {
    type: 'text',
    name: 'message',
    placeholder: 'Mensaje',
    required: true,
  },
];

const Support = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <FormBanner />

      {/* <Form
        id="dashboard-support-form"
        title="Soporte / Ayuda"
        defaultValues={{
          name: user?.name,
          email: user?.email,
        }}
        onSubmit={supportService}
        fields={fields}
        onSuccessMessage="Message sended with success!"
        textButton="Send message"
      /> */}

      <View style={styles.footer}>
        <Text style={styles.label}>¿Cómo agregar un nuevo plato?</Text>
        <Text style={styles.label}>¿Cómo gestionar las promociones?</Text>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
