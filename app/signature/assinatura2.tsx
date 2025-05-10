import React, { useRef, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const SignatureComponent = () => {
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef();

  // Função para limpar a assinatura
  const clearSignature = () => {
    signatureRef.current.clearSignature();
  };

  // Função para obter a assinatura
  const handleSignature = (signature) => {
    setSignature(signature);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assine abaixo:</Text>
      <SignatureScreen
        ref={signatureRef}
        onOK={handleSignature} // Quando o usuário terminar a assinatura
        onEmpty={() => console.log("Campo vazio")}
        descriptionText="Assine aqui"
        clearText="Limpar"
        confirmText="Confirmar"
        webStyle={`.m-signature-pad--footer { display: none; margin: 0px; padding: 0px;}`}
      />
      {signature ? (
        <View style={styles.signatureContainer}>
          <Text>Assinatura capturada:</Text>
          <Text>{signature}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>Nenhuma assinatura capturada</Text>
      )}
      <Button title="Limpar Assinatura" onPress={clearSignature} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signatureContainer: {
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SignatureComponent;
