import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { useRouter } from 'expo-router';
import tableStyles from '../styles/tableStyles'; // Importando o estilo centralizado

interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo':
        return '🟢';
      case 'emprestado':
        return '🟡';
      case 'inativo':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const renderActionButton = (item: EquipmentGet) => {
    let icon = '';
    let color = '';
    let onPress = () => {};

    if (item.status === 'ativo') {
      icon = '➡';
      color = '#FF6F00';
      onPress = () => router.push({ pathname: '/actions/saida_equip', params: { equipId: item._id.toString() } });
    } else if (item.status === 'emprestado') {
      icon = '⬅';
      color = '#32cd32';
      onPress = () => router.push({ pathname: '/actions/entrada_equip', params: { equipId: item._id.toString() } });
    } else if (item.status === 'inativo') {
      icon = '🚫';
      color = '#808080';
      return (
        <View style={[tableStyles.actionButton, { backgroundColor: color }]}>
          <Text style={tableStyles.actionText}>{icon}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity style={[tableStyles.actionButton, { backgroundColor: color }]} onPress={onPress}>
        <Text style={tableStyles.actionText}>{icon}</Text>
      </TouchableOpacity>
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
        {renderActionButton(item)}
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
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={tableStyles.listContent}
      />
    </View>
  );
};

export default EquipmentTable;