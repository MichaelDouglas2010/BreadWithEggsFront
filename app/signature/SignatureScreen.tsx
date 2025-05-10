import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function SignatureScreen() {
  const signatureRef = useRef<{ clearSignature: () => void } | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Log para debug
  useEffect(() => {
    console.log('Parâmetros recebidos em SignatureScreen:', params);
  }, [params]);

  const handleOK = (signature: string) => {
    setIsLoading(true);
    
    // Captura explicitamente todos os parâmetros importantes
    const equipId = params.equipId?.toString();
    const description = params.description?.toString();
    const marca = params.marca?.toString();
    const retiradoPor = params.retiradoPor?.toString();
    const localUso = params.localUso?.toString();
    const observacoes = params.observacoes?.toString();
    
    console.log('Navegando de volta com equipId:', equipId);
    
    // Navega de volta para a tela de saída com todos os parâmetros explícitos
    router.push({
      pathname: '../actions/saida_equip',
      params: {
        equipId,
        description,
        marca,
        retiradoPor,
        localUso,
        observacoes,
        signature,
      },
    });
    setIsLoading(false);
  };

  const handleEmpty = () => {
    Alert.alert('Atenção', 'Por favor, faça sua assinatura antes de continuar.');
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleCancel = () => {
    router.back();
  };

  const style = `
    .m-signature-pad {
      width: 100%;
      height: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .m-signature-pad--footer {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .m-signature-pad--footer button {
      background-color: #007AFF;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
    }
    .m-signature-pad--footer button.clear {
      background-color: #FF3B30;
    }
    .m-signature-pad--footer button.cancel {
      background-color: #8E8E93;
    }
    @media (max-width: 480px) {
      .m-signature-pad {
        margin: 0;
        border-radius: 0;
      }
    }
  `;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <Signature
          ref={signatureRef}
          onOK={handleOK}
          onEmpty={handleEmpty}
          descriptionText="Assine na área abaixo"
          clearText="Limpar"
          confirmText="Salvar Assinatura"
          webStyle={style}
          autoClear={false}
          penColor="#000"
          backgroundColor="#FFFFFF"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});