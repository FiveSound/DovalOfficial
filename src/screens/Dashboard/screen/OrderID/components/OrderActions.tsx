import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { COLORS, responsiveFontSize } from '../../../../../constants/theme';

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
    gap: responsiveFontSize(10),
  },
  button: {
    width: responsiveFontSize(170),
    padding: responsiveFontSize(10),
    borderWidth: responsiveFontSize(2),
    borderRadius: responsiveFontSize(5),
  },
  acceptButton: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: '#F41F52',
    borderColor: '#F41F52',
  },
  textButton: {
    textAlign: 'center',
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
  },
  acceptText: {
    color: COLORS.dark,
  },
  rejectText: {
    color: '#FFF',
  },
});

export default OrderActions;