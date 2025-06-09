import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
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
              // Aqui você pode adicionar a chamada à API para registrar a entrada
              console.log(`Entrada confirmada para o equipamento ${equipId}`);
              Alert.alert('Sucesso', 'Entrada confirmada com sucesso!');
              router.push('/home_pages/registrar_uso_equip');
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
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Entrada de Equipamento</Text>

        <Text style={localStyles.label}>ID do Equipamento:</Text>
        <Text style={localStyles.value}>{equipId}</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#007B83" style={localStyles.loading} />
        ) : (
          <View style={{ marginTop: 20 }}>
            <Button
              mode="contained"
              style={[localStyles.button, { backgroundColor: '#007B83' }]}
              labelStyle={{ color: '#fff' }}
              onPress={handleConfirm}
            >
              Confirmar Entrada
            </Button>
            <Button
              mode="contained"
              style={[localStyles.button, { backgroundColor: '#ccc' }]}
              labelStyle={{ color: '#222' }}
              onPress={() => router.back()}
            >
              Cancelar
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#111',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  loading: {
    marginTop: 20,
  },
});

