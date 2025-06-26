import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import api from '../../helpers/axios';

// CORREÇÃO: A interface agora aceita a função 'onRefresh' para atualizar a lista após a exclusão.
interface EquipmentTableDeleteProps {
  equipments: EquipmentGet[];
  onRefresh: () => void;
}

const EquipmentTableDelete: React.FC<EquipmentTableDeleteProps> = ({ equipments, onRefresh }) => {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return '�';
      case 'emprestado': return '🟡';
      case 'inativo': return '🔴';
      default: return '⚪';
    }
  };

  // Função para lidar com o clique no botão de apagar
  const handleDeletePress = (item: EquipmentGet) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir permanentemente o equipamento "${item.description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            try {
              // Chama a API para apagar o equipamento
              await api.delete(`/equipment/${item._id}`);
              Alert.alert("Sucesso", "Equipamento excluído com sucesso.");
              // Chama a função onRefresh para atualizar a lista na tela anterior
              onRefresh();
            } catch (error) {
              console.error("Erro ao excluir equipamento:", error);
              const errorMessage = (error as any).response?.data?.error || "Não foi possível excluir o equipamento.";
              Alert.alert("Erro", errorMessage);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: EquipmentGet }) => (
    <View style={tableStyles.row}>
      <View style={tableStyles.cellStatus}>
        <Text style={tableStyles.statusIcon}>{getStatusIcon(item.status)}</Text>
      </View>
      <View style={tableStyles.cellInfo}>
        <Text style={tableStyles.equipName} numberOfLines={1}>{item.description}</Text>
        <Text style={tableStyles.equipBrand} numberOfLines={1}>{item.marca}</Text>
      </View>
      <View style={tableStyles.cellAction}>
        <TouchableOpacity
            style={[tableStyles.actionButton, { backgroundColor: '#dc3545' }]} // Cor vermelha para exclusão
            onPress={() => handleDeletePress(item)}
        >
            <Text style={tableStyles.actionText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={tableStyles.container}>
      <View style={tableStyles.headerRow}>
        <Text style={[tableStyles.headerText, tableStyles.cellStatus]}>Status</Text>
        <Text style={[tableStyles.headerText, tableStyles.cellInfo]}>Equipamento</Text>
        <Text style={[tableStyles.headerText, tableStyles.cellAction]}>Ação</Text>
      </View>
      <FlatList
        data={equipments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const tableStyles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', minWidth: 400 },
  headerRow: { flexDirection: 'row', backgroundColor: '#f8f9fa', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  headerText: { fontWeight: 'bold' },
  cellStatus: { width: 70, alignItems: 'center' },
  cellInfo: { flex: 1, paddingHorizontal: 5 },
  cellAction: { width: 100, alignItems: 'center' },
  statusIcon: { fontSize: 20 },
  equipName: { fontWeight: 'bold' },
  equipBrand: { color: '#6c757d' },
  actionButton: { padding: 8, borderRadius: 5, elevation: 1 },
  actionText: { fontSize: 22 }
});

export default EquipmentTableDelete;