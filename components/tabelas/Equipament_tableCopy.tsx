import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import { EquipmentGet } from '../interfaces/equipment';
import { Link } from '@react-navigation/native';

interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTable2: React.FC<EquipmentTableProps> = ({ equipments }) => {
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
        <FlatList
          data={equipments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <Link to={`/equipment/${item._id}`} style={styles.row}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
              </View>
              <View style={styles.cell2}>
                <Text style={styles.cell}>{item.description}</Text>
              </View>
              <View >
                <Text style={styles.cell}>{item.marca}</Text>
              </View>
            </Link>
          )}

          contentContainerStyle={styles.listContent}
        />
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
    alignItems: 'center',
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
    color: 'white',
    padding: 5,
  },
  cell2: {
    color: 'white',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    
    
  },
  listContent: {
    paddingBottom: 0,
  },
});

export default EquipmentTable2;
