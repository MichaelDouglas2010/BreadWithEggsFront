import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { useRouter } from 'expo-router';

interface EquipmentTableMaintenanceProps {
  equipments: EquipmentGet[];
}

const EquipmentTableMaintenance: React.FC<EquipmentTableMaintenanceProps> = ({ equipments }) => {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ativo': return '🟢';
      case 'emprestado': return '🟡';
      case 'inativo': return '🔴';
      default: return '⚪';
    }
  };

  const handleRowPress = (item: EquipmentGet) => {
    router.push({
        pathname: '/maintance_detalhe',
        params: { 
            equipId: item._id,
            description: item.description,
            marca: item.marca
        }
    });
  };
  
  return (
    <View style={tableStyles.container}>
      <View style={tableStyles.headerRow}>
        <Text style={[tableStyles.headerText, {width: 70}]}>Status</Text>
        <Text style={[tableStyles.headerText, {flex: 1}]}>Equipamento</Text>
        <Text style={[tableStyles.headerText, {width: 100, textAlign: 'center'}]}>Ação</Text>
      </View>

      <FlatList
        data={equipments}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleRowPress(item)} style={tableStyles.row}>
                <Text style={[tableStyles.cell, {width: 70, textAlign: 'center'}]}>{getStatusIcon(item.status)}</Text>
                <View style={[tableStyles.cell, {flex: 1, paddingHorizontal: 5}]}>
                    <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.description}</Text>
                    <Text numberOfLines={1}>{item.marca}</Text>
                </View>
                <View style={[tableStyles.cell, {width: 100, alignItems: 'center'}]}>
                    <Text style={{fontSize: 24}}>🔧</Text>
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

const tableStyles = StyleSheet.create({
    container: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', elevation: 1 },
    headerRow: { flexDirection: 'row', backgroundColor: '#f8f9fa', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
    row: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
    headerText: { fontWeight: 'bold' },
    cell: { justifyContent: 'center' }
});

export default EquipmentTableMaintenance;
