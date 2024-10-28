import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface OrderActionsProps {
  onAccept: () => void;
  onReject: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ onAccept, onReject }) => {
  return (
    <View style={styles.group}>
      <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
        <Text style={[styles.textButton, styles.acceptText]}>Aceptar orden</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
        <Text style={[styles.textButton, styles.rejectText]}>Rechazar orden</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 170,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  acceptButton: {
    borderColor: '#4ADE80',
  },
  rejectButton: {
    backgroundColor: '#F41F52',
    borderColor: '#F41F52',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptText: {
    color: '#4ADE80',
  },
  rejectText: {
    color: '#FFF',
  },
});

export default OrderActions;