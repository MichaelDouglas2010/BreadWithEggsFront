import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { useRouter } from 'expo-router';
import api from '../../helpers/axios';

// CORREÇÃO: A interface agora aceita as propriedades 'onRefresh' e 'setIsLoading'
// que são enviadas pelo componente pai (a página de listagem).
interface EquipmentTableMaintenanceProps {
  equipments: EquipmentGet[];
  onRefresh: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const EquipmentTableForMaintenance: React.FC<EquipmentTableMaintenanceProps> = ({ equipments, onRefresh, setIsLoading }) => {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return '🟢';
      case 'emprestado': return '🟡';
      case 'inativo': return '🔴'; 
      default: return '⚪';
    }
  };

  // Ação para INICIAR uma manutenção (navega para o formulário)
  const handleStartMaintenance = (item: EquipmentGet) => {
    router.push({
      pathname: '/actions/create_maintenance',
      params: { 
        equipId: item._id,
        description: item.description,
        marca: item.marca,
      },
    });
  };

  // Ação para CONCLUIR uma manutenção (retorna o equipamento para produção)
  const handleFinishMaintenance = (item: EquipmentGet) => {
    Alert.alert(
      'Concluir Manutenção',
      `Deseja retornar o equipamento "${item.description}" para o status "Ativo"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setIsLoading(true); // Ativa o indicador de "a carregar" na página pai
            try {
              await api.patch(`/equipment/${item._id}/status`, { status: 'ativo' });
              Alert.alert('Sucesso', 'Equipamento retornou à produção.');
              onRefresh(); // Chama a função onRefresh para atualizar a lista
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível retornar o equipamento para produção.');
            } finally {
              setIsLoading(false); // Garante que o indicador é desativado
            }
          },
        },
      ]
    );
  };

  const renderActionButton = (item: EquipmentGet) => {
    let icon = '';
    let color = '';
    let onPress = () => {};
    let disabled = false;

    // Ação depende do status do equipamento
    if (item.status === 'ativo') {
      icon = '🔧'; // Iniciar manutenção
      color = '#ffc107'; // Amarelo
      onPress = () => handleStartMaintenance(item);
    } else if (item.status === 'inativo') { 
      icon = '✅'; // Concluir manutenção
      color = '#28a745'; // Verde
      onPress = () => handleFinishMaintenance(item);
    } else {
        icon = '🚫'; // Emprestado
        color = '#e0e0e0';
        disabled = true;
    }

    return (
      <TouchableOpacity
        style={[tableStyles.actionButton, { backgroundColor: color }]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={tableStyles.actionText}>{icon}</Text>
      </TouchableOpacity>
    );
  };

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
        renderItem={({item}) => (
            <View style={tableStyles.row}>
                <View style={tableStyles.cellStatus}>
                    <Text style={tableStyles.statusIcon}>{getStatusIcon(item.status)}</Text>
                </View>
                <View style={tableStyles.cellInfo}>
                    <Text numberOfLines={1} style={tableStyles.equipName}>{item.description}</Text>
                    <Text numberOfLines={1} style={tableStyles.equipBrand}>{item.marca}</Text>
                </View>
                <View style={tableStyles.cellAction}>
                    {renderActionButton(item)}
                </View>
            </View>
        )}
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
  equipName: { fontWeight: 'bold', color: '#2C3E50', fontSize: 16 },
  equipBrand: { color: '#6c757d' },
  actionButton: { padding: 8, borderRadius: 5, elevation: 1 },
  actionText: { fontSize: 22 }
});

export default EquipmentTableForMaintenance;
