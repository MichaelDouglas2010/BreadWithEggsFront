import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Para salvar no armazenamento
import * as Permissions from 'expo-permissions'; // Para permissões de armazenamento

interface CameraData {
  uri: string;
}

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // Alterna entre câmera normal e scanner de QR Code
  const cameraRef = useRef<CameraView>(null);

  // Converte a imagem para Base64
  const convertImageToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
    });
  };

  // Salva a imagem capturada no armazenamento
  const saveImageToAsyncStorage = async (base64Image: string) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      console.error('Permissão de armazenamento negada');
      return;
    }

    const filename = `${Date.now()}.png`;
    const directory = FileSystem.documentDirectory;
    const path = `${directory}/${filename}`;

    try {
      await FileSystem.writeAsStringAsync(path, base64Image, { encoding: FileSystem.EncodingType.Base64 });
      console.log('Imagem salva em:', path);
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Captura a imagem e salva
  const takePicture = async () => {
    setIsLoading(true);

    if (!cameraRef.current) return;

    const options = { quality: 1, skipProcessing: true };
    const data: CameraData | CameraCapturedPicture | null | undefined = await cameraRef.current?.takePictureAsync(options);

    if (data) {
      const base64Image = await convertImageToBase64(data.uri);
      await saveImageToAsyncStorage(base64Image);
    } else {
      console.error('Captura de imagem cancelada');
    }

    setIsLoading(false);
  };

  // Função para escanear QR Code
  const scanQRCode = (result: BarcodeScanningResult) => {
    if (result.data) {
      alert(`QR Code escaneado: ${result.data}`);
      setIsScanning(false); // Volta para modo câmera normal após leitura
    }
  };

  // Alterna a câmera entre frontal e traseira
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Alterna entre modo normal e scanner de QR Code
  function toggleScannerMode() {
    setIsScanning(!isScanning);
  }

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barCodeTypes: ['qr'] }}
        onBarcodeScanned={isScanning ? scanQRCode : undefined} // Ativa o scanner apenas quando necessário
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Inverter Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleScannerMode}>
            <Text style={styles.text}>{isScanning ? 'Modo Foto' : 'Modo QR Code'}</Text>
          </TouchableOpacity>
          {!isScanning && (
            <TouchableOpacity style={styles.button} onPress={takePicture} disabled={isLoading}>
              <Text style={styles.text}>Capturar Foto</Text>
            </TouchableOpacity>
          )}
          {isLoading && <Text>Capturando...</Text>}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
