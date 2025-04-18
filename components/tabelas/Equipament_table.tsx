import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { EquipmentGet } from '../interfaces/equipment';
import { useRouter } from 'expo-router';

// Props do componente: recebe um array de equipamentos
interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const router = useRouter();

  // Retorna um ícone baseado no status do equipamento
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

  // Define o botão de ação baseado no status do equipamento
  const renderActionButton = (item: EquipmentGet) => {
    let icon = '';
    let color = '';
    let onPress = () => {};

    // Equipamento disponível: vai para tela de saída
    if (item.status === 'ativo') {
      icon = '➡';
      color = '#1e90ff';
      onPress = () => router.push({ pathname: '/actions/saida_equip', params: { equipId: item._id } });

    // Equipamento emprestado: vai para tela de entrada
    } else if (item.status === 'emprestado') {
      icon = '⬅';
      color = '#32cd32';
      onPress = () => router.push({ pathname: '/actions/entrada_equip', params: { equipId: item._id } });

    // Equipamento inativo: botão bloqueado
    } else if (item.status === 'inativo') {
      icon = '🚫';
      color = '#808080';
      return (
        <View style={[styles.actionButton, { backgroundColor: color }]}>
          <Text style={styles.actionText}>{icon}</Text>
        </View>
      );
    }

    // Retorna botão de ação clicável
    return (
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
        <Text style={styles.actionText}>{icon}</Text>
      </TouchableOpacity>
    );
  };

  // Renderiza cada linha da lista de equipamentos
  const renderItem = ({ item }: { item: EquipmentGet }) => (
    <View style={styles.row}>
      {/* Coluna Status */}
      <View style={styles.cellStatus}>
        <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
      </View>

      {/* Coluna Equipamento */}
      <View style={styles.cellInfo}>
        <Text style={styles.equipName} numberOfLines={1}>{item.description}</Text>
        <Text style={styles.equipBrand} numberOfLines={1}>{item.marca}</Text>
      </View>

      {/* Coluna Ação */}
      <View style={styles.cellAction}>
        {renderActionButton(item)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho da tabela */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.cellStatus]}>Status</Text>
        <Text style={[styles.headerText, styles.cellInfo]}>Equipamento</Text>
        <Text style={[styles.headerText, styles.cellAction]}>Ação</Text>
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

// Estilos da interface
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
    paddingVertical: 10,
  },
  // Coluna de status com largura fixa
  cellStatus: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Coluna central com nome e marca (usa flex para ocupar o restante)
  cellInfo: {
    width: 200,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  // Coluna de ação com botão
  cellAction: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
  },
  equipName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  equipBrand: {
    fontSize: 12,
    color: '#ccc',
  },
  // Botão da ação (entrada/saída/inativo)
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 20,
    color: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default EquipmentTable;