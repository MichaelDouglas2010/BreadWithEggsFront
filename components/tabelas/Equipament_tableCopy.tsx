import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { Link } from 'expo-router';

interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTableCopy: React.FC<EquipmentTableProps> = ({ equipments }) => {
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

  const renderItem = ({ item }: { item: EquipmentGet }) => (
    <Link
      href={{
        pathname: '/consultar_equip_detalhe',
        params: { equipId: String(item._id) },
      }}
      style={styles.row}
    >
      {/* Coluna Status */}
      <View style={styles.cellStatus}>
        <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
      </View>

      {/* Coluna Equipamento */}
      <View style={styles.cellInfo}>
        <Text style={styles.equipName} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.equipBrand} numberOfLines={1}>
          {item.marca}
        </Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho da tabela */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.cellStatus]}>Status</Text>
        <Text style={[styles.headerText, styles.cellInfo]}>Equipamento</Text>
      </View>

      {/* Lista de equipamentos */}
      <FlatList
        data={equipments}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#08475E',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 8,
    marginBottom: 6,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#0B5D77',
    borderRadius: 8,
    paddingVertical: 10, // Aumentado para melhorar a separação visual
    paddingHorizontal: 10,
  },
  cellStatus: {
    width: 60, // Largura fixa para a coluna de status
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellInfo: {
    width: 220,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  statusIcon: {
    fontSize: 24, // Aumentado para melhor proporção
  },
  equipName: {
    fontSize: 16, // Aumentado para melhorar a legibilidade
    color: 'white',
    fontWeight: 'bold',
  },
  equipBrand: {
    fontSize: 14, // Aumentado para melhor proporção
    color: '#ccc',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default EquipmentTableCopy;
