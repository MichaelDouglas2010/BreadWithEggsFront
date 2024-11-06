import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { Link } from 'expo-router';

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
            <Link
              href={{
                pathname: '/consultar_equip_detalhe', 
                params: { equipId: String(item._id) }
              }}
              style={styles.row}
            >
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
              </View>
              <View style={styles.descriptionCell}>
                <Text style={styles.text}>{item.description}</Text>
              </View>
              <View style={styles.brandCell}>
                <Text style={styles.text}>{item.marca}</Text>
              </View>
            </Link>
          )}
          ListHeaderComponent={
            <View style={styles.row}>
              <Text style={styles.headerCellStatus}>Status</Text>
              <Text style={styles.headerCellDescription}>Descrição</Text>
              <Text style={styles.headerCellBrand}>Marca</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'White',
  },
  headerCellStatus: {
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#104861',
    color: 'white',
    borderRightWidth: 1,
    borderRightColor: 'White',
  },
  headerCellDescription: {
    width: 150,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#104861',
    color: 'white',
    borderRightWidth: 1,
    borderRightColor: 'White',
  },
  headerCellBrand: {
    width: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#104861',
    color: 'white',
    borderRightWidth: 1,
    borderRightColor: 'White',
  },
  statusContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  descriptionCell: {
    width: 150,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: 'White',
  },
  brandCell: {
    width: 80,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: 'White',
  },
  text: {
    textAlign: 'center',
    color: 'White',
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
