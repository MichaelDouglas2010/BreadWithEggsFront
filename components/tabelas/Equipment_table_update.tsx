import React from 'react';
import { Text } from 'react-native';
import GenericTable from './GenericTable';
import { EquipmentGet } from '../interfaces/equipment';
import { router } from 'expo-router';

interface EquipmentTableProps {
  equipments: EquipmentGet[];
}

const EquipmentTableUpdate: React.FC<EquipmentTableProps> = ({ equipments }) => {
  const columns = [
    {
      key: 'status',
      label: 'Status',
      width: 70,
      render: (item: EquipmentGet) => {
        const statusColors: Record<string, string> = {
          ativo: '🟢',
          inativo: '🔴',
          emprestado: '🟡',
        };
        return <Text>{statusColors[item.status] || '⚪'}</Text>;
      },
    },
    {
      key: 'description',
      label: 'Descrição',
      width: 150,
      render: (item: EquipmentGet) => (
        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: '#2C3E50' }}>
          {item.description}
        </Text>
      ),
    },
    {
      key: 'marca',
      label: 'Marca',
      width: 100,
      render: (item: EquipmentGet) => (
        <Text numberOfLines={1} style={{ color: '#546E7A' }}>
          {item.marca}
        </Text>
      ),
    },
  ];

  const handleRowPress = (item: EquipmentGet) => {
    router.push(`/alterar_equip_detalhe?id=${item._id}`)
  };

  return <GenericTable data={equipments} columns={columns} onRowPress={handleRowPress} />;
};

export default EquipmentTableUpdate;