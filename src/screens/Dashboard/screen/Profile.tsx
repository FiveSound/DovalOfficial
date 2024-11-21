// File: Profile.tsx
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  Image,
} from 'react-native';
import { Buttons } from '../../../components/custom';
import BLEPrinter, { BLEDevice } from '../../../../BLEPrinter';

const BLEPrinterEmitter = BLEPrinter.getEmitter();

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [deviceList, setDeviceList] = useState<BLEDevice[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMAC, setSelectedMAC] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false); // Nuevo estado para manejar la conexión

  useEffect(() => {
    const initialize = async () => {
      try {
        const message = await BLEPrinter.initPrinter();
        console.log('initPrinter:', message);

        // Verificar si ya hay una impresora conectada
        const connectedDevice = await BLEPrinter.getConnectedDevice();
        console.log('connectedDevice:', connectedDevice);
        if (connectedDevice) {
          setSelectedMAC(connectedDevice.inner_mac_address);
          Alert.alert(
            'Conectado',
            `Ya estás conectado a ${connectedDevice.device_name}.`,
          );

          // Mostrar el modal para ingresar datos si es necesario
          setModalVisible(true);
        }
      } catch (error) {
        console.error('Error al inicializar la impresora:', error);
        Alert.alert('Error', 'Fallo al inicializar la impresora.');
      }
    };

    initialize();

    // Escuchar eventos de desconexión
    const disconnectListener = BLEPrinterEmitter?.addListener(
      'onDisconnected',
      () => {
        console.warn('La impresora ha sido desconectada.');
        Alert.alert('Desconexión', 'La impresora ha sido desconectada.');
        setSelectedMAC(null);
      },
    );

    return () => {
      disconnectListener?.remove();
    };
  }, []);

  const scanForPrinters = async () => {
    setLoading(true);

    try {
      const devices = await BLEPrinter.getDeviceList();
      console.log('Dispositivos encontrados:', devices);
      setDeviceList(devices);

      if (devices.length === 0) {
        Alert.alert('No Encontrado', 'No se encontraron impresoras BLE.');
      }
    } catch (error) {
      console.error('Error al escanear impresoras:', error);
      Alert.alert('Error', 'Error al escanear impresoras BLE.');
    } finally {
      setLoading(false);
    }
  };

  const selectPrinter = async (macAddress: string) => {
    setSelectedMAC(macAddress);
    Alert.alert('Seleccionado', `Impresora seleccionada: ${macAddress}`);

    setConnecting(true);
    try {
      const message = await BLEPrinter.connectPrinter(macAddress);
      console.log('connectPrinter:', message);

      Alert.alert('Conectado', 'Conexión exitosa con la impresora.');
    } catch (error: any) {
      console.error('ERROR al conectar impresora:', error);
      Alert.alert(
        'Error',
        error.message || 'Fallo al conectar con la impresora.',
      );
      setSelectedMAC(null);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectPrinter = async () => {
    try {
      await BLEPrinter.disconnectPrinter();
      Alert.alert('Desconectado', 'Impresora desconectada exitosamente.');
      setSelectedMAC(null);
    } catch (error: any) {
      console.error('ERROR al desconectar:', error);
      Alert.alert(
        'Error',
        error.message || 'Fallo al desconectar la impresora.',
      );
    }
  };

  const sendPrintData = async () => {
    if (!selectedMAC) {
      Alert.alert('Error', 'No hay una impresora seleccionada.');
      return;
    }

    const printTextContent = 'Hola Andres';

    try {
      await BLEPrinter.printText(printTextContent, selectedMAC);
      Alert.alert(
        'Impresión Exitosa',
        'El texto ha sido enviado para imprimir.',
      );
    } catch (error: any) {
      console.error('ERROR al enviar datos de impresión:', error);
      Alert.alert(
        'Error',
        error.message || 'Fallo al enviar datos de impresión.',
      );
    }
  };

  /**
   * Función para seleccionar una imagen y enviarla a imprimir
   * Puedes implementar un selector de imágenes según tus necesidades
   */
  const selectAndPrintImage = async () => {
    // Implementación opcional: por ejemplo, usar react-native-image-picker para seleccionar una imagen
    // Luego, convertir la imagen a base64 y enviarla a imprimir
    Alert.alert(
      'Funcionalidad',
      'Función de imprimir imagen aún no implementada.',
    );
  };

  /**
   * Función para manejar la impresión de una imagen seleccionada
   * Puedes integrarla con un selector de imágenes
   */
  const handlePrintImage = async (base64Image: string) => {
    if (!selectedMAC) {
      Alert.alert('Error', 'No hay una impresora seleccionada.');
      return;
    }

    const serviceUUID = 'YOUR_SERVICE_UUID'; // Reemplaza con tu Service UUID
    const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID'; // Reemplaza con tu Characteristic UUID
    const imageWidth = 300; // Ajusta según tus necesidades

    try {
      const message = await BLEPrinter.printImage(
        base64Image,
        serviceUUID,
        characteristicUUID,
        imageWidth,
      );
      console.log('printImage:', message);
      Alert.alert(
        'Impresión Exitosa',
        'La imagen ha sido enviada para imprimir.',
      );
    } catch (error: any) {
      console.error('ERROR al imprimir imagen:', error);
      Alert.alert('Error', error.message || 'Fallo al imprimir la imagen.');
    }
  };

  const renderPrinter = ({ item }: { item: BLEDevice }) => {
    return (
      <TouchableOpacity
        style={[
          styles.printerItem,
          selectedMAC === item.inner_mac_address && styles.selectedPrinter,
        ]}
        onPress={() => selectPrinter(item.inner_mac_address)}
        disabled={connecting} // Deshabilitar la selección mientras se conecta
      >
        <Text style={styles.printerText}>Nombre: {item.device_name}</Text>
        <Text style={styles.printerText}>MAC: {item.inner_mac_address}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Impresoras Disponibles</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={deviceList}
        renderItem={renderPrinter}
        keyExtractor={item => item.inner_mac_address}
        contentContainerStyle={styles.list}
        extraData={selectedMAC}
      />
      <Buttons label="Escanear" onPress={scanForPrinters} loading={loading} />
      {selectedMAC && (
        <>
          <TouchableOpacity
            style={[styles.printButton, styles.enabledButton]}
            onPress={sendPrintData}
          >
            <Text style={styles.printButtonText}>Imprimir "Hola Andres"</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.disconnectButton]}
            onPress={disconnectPrinter}
            disabled={connecting} // Opcional: deshabilitar si está conectando
          >
            <Text style={styles.printButtonText}>Desconectar Impresora</Text>
          </TouchableOpacity>
          {/* Botón para seleccionar e imprimir una imagen */}
          <TouchableOpacity
            style={[
              styles.printButton,
              styles.enabledButton,
              { backgroundColor: '#FF9500' }, // Color diferente para distinguir
            ]}
            onPress={selectAndPrintImage}
          >
            <Text style={styles.printButtonText}>Imprimir Imagen</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Modal para ingresar detalles adicionales o mostrar información */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Detalles Adicionales (Opcional)</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Vista previa de la imagen seleccionada (opcional) */}
      {imagePreview && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.imagePreviewTitle}>
            Vista Previa de la Imagen:
          </Text>
          <Image
            source={{ uri: imagePreview }}
            style={styles.imagePreview}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  list: {
    flexGrow: 0,
  },
  printerItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 6,
  },
  selectedPrinter: {
    backgroundColor: '#d0f0c0',
  },
  printerText: {
    fontSize: 16,
  },
  printButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#28a745', // Verde para botones de acción
  },
  printButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  disconnectButton: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#FF3B30', // Rojo para botones de acción negativa
    borderRadius: 6,
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  deviceDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 6,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsScroll: {
    maxHeight: 200,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
    flexWrap: 'wrap',
  },
  serviceSection: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 14,
    marginBottom: 5,
  },
  characteristicSection: {
    marginLeft: 10,
    marginBottom: 5,
  },
  characteristicText: {
    fontSize: 14,
  },
  imagePreviewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imagePreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default Profile;
