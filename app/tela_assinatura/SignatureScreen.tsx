import React, { useRef } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';

export default function SignatureScreen() {
  const router = useRouter();
  const { returnTo } = useLocalSearchParams();
  const signatureRef = useRef<any>(null);

  const handleOK = (signature: string) => {
    if (returnTo) {
      router.replace({
        pathname: Array.isArray(returnTo) ? returnTo[0] : returnTo,
        params: { signature },
      });
    } else {
      Alert.alert('Erro', 'Não foi possível retornar à tela anterior.');
    }
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Assinatura</Text>
        <Text style={styles.subtitle}>Por favor, assine no quadro abaixo:</Text>
        <View style={styles.signatureBox}>
          <Signature
            ref={signatureRef}
            onOK={handleOK}
            descriptionText=""
            clearText=""
            confirmText=""
            webStyle={signatureWebStyle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: '#007B83' }]}
            labelStyle={{ color: '#fff' }}
            onPress={() => signatureRef.current.readSignature()}
          >
            Salvar
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={{ color: '#FF6F00' }}
            onPress={handleClear}
          >
            Limpar
          </Button>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: '#ccc' }]}
            labelStyle={{ color: '#222' }}
            onPress={handleCancel}
          >
            Voltar
          </Button>
        </View>
      </View>
    </View>
  );
}

const signatureWebStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
  }
  .m-signature-pad--body {
    border: 1px solid #ccc;
    border-radius: 8px;
    min-height: 200px;
  }
  .m-signature-pad--footer {
    display: none;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  signatureBox: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    minHeight: 220,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
  },
});