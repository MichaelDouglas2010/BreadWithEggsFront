import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SaidaEquip() {
  const router = useRouter();
  const { equipId } = useLocalSearchParams();

  const handleConfirm = () => {
    console.log(`Saída confirmada para o equipamento ${equipId}`);
    router.push('/consultar_equip');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saída de Equipamento</Text>
      <Text style={styles.text}>ID do Equipamento: {equipId}</Text>
      <Button title="Confirmar Saída" onPress={handleConfirm} />
      <Button title="Cancelar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08475E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
});