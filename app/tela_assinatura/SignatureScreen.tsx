import React, { useRef } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SignatureScreen() {
  const router = useRouter();
  const { returnTo } = useLocalSearchParams(); // Recebe a rota para onde retornar
  const signatureRef = useRef(null); // Referência para o componente de assinatura

  const handleOK = (signature: string) => {
    if (returnTo) {
      // Retorna para a tela anterior com a assinatura
      router.replace({
        pathname: returnTo,
        params: { signature },
      });
    } else {
      Alert.alert('Erro', 'Não foi possível retornar à tela anterior.');
    }
  };

  const handleClear = () => {
    // Limpa a assinatura
    signatureRef.current.clearSignature();
  };

  const handleCancel = () => {
    // Retorna para a tela anterior sem salvar
    router.back();
  };

  return (
    <View style={styles.container}>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        descriptionText="Assine aqui"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={styles.signatureWebStyle}
      />
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={() => signatureRef.current.readSignature()} />
        <Button title="Limpar" onPress={handleClear} color="#FF6F00" />
        <Button title="Voltar" onPress={handleCancel} color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  signatureWebStyle: `
    .m-signature-pad {
      box-shadow: none;
      border: none;
    }
    .m-signature-pad--body {
      border: 1px solid #ccc;
    }
    .m-signature-pad--footer {
      display: none;
    }
  `,
});