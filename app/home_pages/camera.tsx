import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as MediaLibrary from 'expo-media-library'; // NOVO: Importa o MediaLibrary para permissões e para salvar na galeria
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  
  // Permissão da Câmera
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  // Permissão da Galeria de Mídia
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Captura a imagem e salva na galeria
  const takeAndSavePicture = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (!cameraRef.current) {
      setIsLoading(false);
      return;
    }
    
    try {
      const picture = await cameraRef.current.takePictureAsync();
      
      if (!picture) {
        console.log("Falha ao capturar a foto.");
        setIsLoading(false);
        return;
      }

      // CORRIGIDO: Pede permissão para a galeria usando o novo hook
      if (!mediaLibraryPermission?.granted) {
        const { status } = await requestMediaLibraryPermission();
        if (status !== 'granted') {
          alert('Precisamos de permissão para salvar a foto na sua galeria.');
          setIsLoading(false);
          return;
        }
      }
      
      // Salva a foto na galeria do usuário
      await MediaLibrary.createAssetAsync(picture.uri);
      alert('Foto salva na galeria!');

    } catch (error) {
      console.error('Erro ao tirar ou salvar a foto:', error);
      alert('Ocorreu um erro ao processar a foto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o QR Code escaneado
  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (scanningResult.data) {
      // Para o scanner para não ficar alertando sem parar
      setIsScanning(false); 
      alert(`QR Code escaneado: ${scanningResult.data}`);
    }
  };

  // Alterna a câmera entre frontal e traseira
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Alterna entre o modo câmera e o modo scanner
  function toggleScannerMode() {
    setIsScanning(!isScanning);
  }

  // Verifica permissão da câmera
  if (!cameraPermission) {
    return <View />; // Tela de carregamento enquanto a permissão é verificada
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
        <Button onPress={requestCameraPermission} title="Conceder Permissão" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing} // NOVO: Prop para controlar a câmera (frontal/traseira)
        // CORRIGIDO: Ativa o scanner condicionalmente
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Define os tipos de código para ler
        }}
      >
        <View style={styles.buttonContainer}>
          {/* Botão de Inverter Câmera */}
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </TouchableOpacity>

          {/* Botão de Tirar Foto (só aparece se não estiver escaneando) */}
          {!isScanning && (
            <TouchableOpacity 
              style={[styles.iconButton, styles.captureButton]} 
              onPress={takeAndSavePicture} 
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" /> : <Ionicons name="camera" size={40} color="white" />}
            </TouchableOpacity>
          )}

          {/* Botão de Alternar Modo Scanner */}
          <TouchableOpacity style={styles.iconButton} onPress={toggleScannerMode}>
            <Ionicons name={isScanning ? "stop-circle-outline" : "qr-code-outline"} size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  captureButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    padding: 20,
  },
});