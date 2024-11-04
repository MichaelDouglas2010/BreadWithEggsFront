import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { EquipmentGet } from '../interfaces/equipment'; // Importa a interface EquipmentGet

const EquipmentDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<EquipmentGet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`sua_api/equipments/${id}`);
        const data: EquipmentGet = await response.json();
        setEquipment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!equipment) {
    return <Text>Equipamento não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Equipamento</Text>
      <Text>ID: {String(equipment._id)}</Text>
      <Text>Descrição: {equipment.description}</Text>
      <Text>Marca: {equipment.marca}</Text>
      <Text>Status: {equipment.status}</Text>
      <Text>Data de Entrada: {new Date(equipment.dataEntrada).toLocaleDateString()}</Text>
      {/* Adicione mais detalhes conforme necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default EquipmentDetailScreen;
function useParams<T>(): { id: any; } {
  throw new Error('Function not implemented.');
}

