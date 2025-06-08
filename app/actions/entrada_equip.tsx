import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EntradaEquip() {
  const router = useRouter();
  const { equipId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    Alert.alert(
      'Confirmar Entrada',
      `Deseja confirmar a entrada do equipamento com ID: ${equipId}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setIsLoading(true);
            try {
              console.log(`Entrada confirmada para o equipamento ${equipId}`);
              Alert.alert('Sucesso', 'Entrada confirmada com sucesso!');
              router.push('/consultar_equip');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível confirmar a entrada.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrada de Equipamento</Text>
      <Text style={styles.text}>ID do Equipamento: {equipId}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loading} />
      ) : (
        <>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleConfirm}
          >
            Confirmar Entrada
          </Button>
          <Button
            mode="outlined"
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            Cancelar
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08475E',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007B83',
    marginBottom: 10,
  },
  cancelButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  loading: {
    marginTop: 20,
  },
});