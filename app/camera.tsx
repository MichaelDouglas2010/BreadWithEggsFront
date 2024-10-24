import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system'; // For saving to device storage
import * as Permissions from 'expo-permissions'; // For requesting storage permission


interface CameraData {
  uri: string;
  // ... other properties if needed
}

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Function to convert captured image to base64
  const convertImageToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
    });
  };

  // Function to save captured image to device storage
  const saveImageToAsyncStorage = async (base64Image: string) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      console.error('Storage permission not granted');
      return;
    }

    const filename = `${Date.now()}.png`; // Generate unique filename
    const directory = FileSystem.documentDirectory;
    const path = `${directory}/${filename}`;

    try {
      await FileSystem.writeAsStringAsync(path, base64Image, { encoding: FileSystem.EncodingType.Base64 });
      console.log('Image saved to device storage:', path);
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      setIsLoading(false); // Set loading indicator to false after saving
    }
  };

  // Function to capture picture and save it
  const takePicture = async () => {
    setIsLoading(true); // Set loading indicator to true before capture

    const cameraRef = useRef<CameraView>(null);

    const options = { quality: 1, skipProcessing: true }; // Capture options
    const data: CameraData | CameraCapturedPicture  | null | undefined = await cameraRef.current?.takePictureAsync(options);

    let base64Image: string | undefined;

    if (data) {
      base64Image = await convertImageToBase64(data.uri); // Convert to base64
    } else {
      console.error('Image capture canceled');
    }

    if (base64Image) {
      await saveImageToAsyncStorage(base64Image);
    }
  };

  // Handle camera permissions
  if (!permission) {
    return <View />; // Permissions still loading
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to toggle camera facing
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
            <Button title="Capture Photo" disabled={isLoading} onPress={takePicture} />
            {isLoading && <Text>Capturing...</Text>}
          </TouchableOpacity>  
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
