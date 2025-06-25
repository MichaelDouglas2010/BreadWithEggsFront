import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface ColumnConfig {
  key: string;
  label: string;
  width?: number;
  render?: (item: any) => React.ReactNode;
}

interface GenericTableProps {
  data: any[];
  columns: ColumnConfig[];
  onRowPress?: (item: any) => void;
  linkTo?: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ data, columns, onRowPress, linkTo }) => {
  const renderRow = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onRowPress && onRowPress(item)}
    >
      {columns.map((column) => (
        <View key={column.key} style={[styles.cell, { width: column.width || 100 }]}>
          {column.render ? column.render(item) : <Text style={styles.text}>{item[column.key]}</Text>}
        </View>
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        {columns.map((column) => (
          <Text key={column.key} style={[styles.headerText, { width: column.width || 100 }]}>
            {column.label}
          </Text>
        ))}
      </View>

      {/* Data Rows */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
    paddingBottom: 8,
    marginBottom: 6,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    color: '#2C3E50',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default GenericTable;