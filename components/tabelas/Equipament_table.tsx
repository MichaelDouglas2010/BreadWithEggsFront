import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import { EquipmentGet } from '../interfaces/equipment';
import { Link } from '@react-navigation/native';

interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'green';
      case 'inativo':
        return 'red';
      case 'emprestado':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <FlatList
            data={equipments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <Link to={`/equipment/${item._id}`} style={styles.row}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
                </View>
                <Text style={styles.cell}>{item.description}</Text>
                <Text style={styles.cell}>{item.marca}</Text>
              </Link>
            )}
            ListHeaderComponent={
              <View style={styles.row}>
                <Text style={styles.headerCell}>Status</Text>
                <Text style={styles.headerCell}>Descrição</Text>
                <Text style={styles.headerCell}>Marca</Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#104861',
    color: 'white',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default EquipmentTable;
