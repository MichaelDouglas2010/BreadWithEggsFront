import React from 'react';
import { View } from 'react-native';
import { CameraView, BarcodeScanningResult } from 'expo-camera';

interface QRCodeScannerProps {
  onQRCodeScanned: (result: BarcodeScanningResult) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onQRCodeScanned }) => {
  return (
    <CameraView
      style={{ width: '100%', height: 300 }}
      onBarcodeScanned={onQRCodeScanned}
      barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
    />
  );
};

export default QRCodeScanner;