import { useRef } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Signature, { SignatureViewRef } from 'react-native-signature-canvas'; // TIPAGEM: Importando o tipo da Ref
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';

type SignatureScreenParams = {
  returnTo: string;
  retiradoPor: string;
  localUso: string;
  observacoes: string;
  equipId: string;
  description: string;
  marca: string;
};

export default function SignatureScreen() {
  const router = useRouter();
  
  // 1. ALTERADO: Pegamos TODOS os parâmetros que a tela anterior enviou.
  const params = useLocalSearchParams<SignatureScreenParams>();
  
  // TIPAGEM: Usando o tipo específico importado da biblioteca para a ref
  const signatureRef = useRef<SignatureViewRef>(null);

  // Esta função é chamada pela prop onOK do componente Signature
  const handleOK = (signature: string) => {
    // 'signature' é a string em base64 da imagem (ex: "data:image/png;base64,iVBORw0K...")

    const returnToPath = params.returnTo;

    if (returnToPath) {
      // 2. ALTERADO: Agora devolvemos TODOS os parâmetros originais, mais a nova assinatura.
      // O 'router.replace' substitui a tela atual (assinatura) pela tela anterior (saída),
      // evitando que o usuário possa "voltar" para a tela de assinatura com o botão de voltar do celular.
      router.replace({
        pathname: returnToPath,
        params: { 
          ...params, // Isso devolve todos os parâmetros que recebemos (equipId, retiradoPor, etc.)
          signature: signature, // E aqui adicionamos/sobrescrevemos com a nova assinatura
        },
      });
    } else {
      Alert.alert('Erro', 'Não foi possível determinar para qual tela retornar.');
    }
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleCancel = () => {
    // router.back() é perfeito para o botão de cancelar, pois ele descarta tudo e volta.
    router.back();
  };
  
  // Função que será chamada pelo nosso botão "Salvar" personalizado
  const handleSaveSignature = () => {
    signatureRef.current?.readSignature(); // Isso vai ler a assinatura e chamar a função onOK (handleOK)
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Assinatura Digital</Text>
        <Text style={styles.subtitle}>Por favor, assine no quadro abaixo:</Text>
        <View style={styles.signatureBox}>
          <Signature
            ref={signatureRef}
            onOK={handleOK}
            descriptionText=""
            clearText="Limpar"      // Mantido para acessibilidade
            confirmText="Salvar"  // Mantido para acessibilidade
            webStyle={signatureWebStyle} // Estilo para a visualização web
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={[styles.button, { borderColor: '#FF6F00'}]}
            labelStyle={{ color: '#FF6F00' }}
            onPress={handleClear}
            icon="eraser"
          >
            Limpar
          </Button>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: '#007B83' }]}
            onPress={handleSaveSignature} // Botão "Salvar" agora chama esta função
            icon="check"
          >
            Confirmar
          </Button>
        </View>
        <Button
            mode="text"
            style={{marginTop: 10}}
            onPress={handleCancel}
          >
            Cancelar e Voltar
          </Button>
      </View>
    </View>
  );
}

// O webStyle esconde os botões padrão da biblioteca, pois criamos os nossos próprios
const signatureWebStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    height: 100%;
  }
  .m-signature-pad--body {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: 100%;
  }
  .m-signature-pad--footer {
    display: none;
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  signatureBox: {
    width: '100%',
    height: 250, // Altura fixa para a área de assinatura
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribui os botões igualmente
  },
  button: {
    flex: 1, // Faz com que os botões dividam o espaço
    marginHorizontal: 8, // Espaçamento entre os botões
  },
});