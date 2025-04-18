import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DetalhesEquip() {
  const router = useRouter();
  const { equipId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Equipamento</Text>
      <Text style={styles.text}>ID do Equipamento: {equipId}</Text>
      <Button
        title="Registrar Entrada"
        onPress={() => router.push({ pathname: '/entrada_equip', params: { equipId } })}
      />
      <Button
        title="Registrar Saída"
        onPress={() => router.push({ pathname: '/saida_equip', params: { equipId } })}
      />
      <Button title="Voltar" onPress={() => router.back()} />
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