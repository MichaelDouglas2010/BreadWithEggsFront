import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import styles from '../components/styles'; // Estilo geral
import api from '../helpers/axios';
import { Equipment } from '../components/interfaces/equipment'; // Ajustei para a interface correta
import { router, useLocalSearchParams } from 'expo-router';
import { UsageRecordGet } from '../components/interfaces/usage-record';
import { Button } from 'react-native-paper';

export default function RelatorioDetalhe() {
  
  /**
   * CORREÇÃO: A função agora aceita string, null ou undefined.
   * Ela retorna 'Em uso' se a data for nula, tratando o erro.
   */
  function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return 'Em uso';
    const date = new Date(dateString);

    // Validação para garantir que a data é válida
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  }

  /**
   * NOVO: Função para formatar a duração do uso.
   * Mostra em minutos se for menos de 1 hora.
   */
  function formatDuration(hours: number): string {
    if (hours === null || typeof hours === 'undefined') return 'N/A';
    
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes} min`;
    }
    
    return `${hours.toFixed(1)} h`;
  }

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [list, setList] = useState<UsageRecordGet[]>([]);
  const { equipId } = useLocalSearchParams();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ativo':
        return '#388e3c'; // Verde
      case 'inativo':
        return '#d32f2f'; // Vermelho
      case 'emprestado':
        return '#fbc02d'; // Amarelo
      default:
        return '#757575'; // Cinza
    }
  };

  useEffect(() => {
    if (equipId) {
      api.get('/equipment/' + equipId).then((response) => {
        setEquipment(response.data);
      });
      api.get('/usage/all/' + equipId).then((response) => {
        setList(response.data);
      });
    }
  }, [equipId]);

  useEffect(() => {
    if (list.length > 0) {
      const userPromises = list.map((record) =>
        record.userId ? api.get('/user/' + record.userId).then((response) => response.data.name) : Promise.resolve('N/A')
      );
      Promise.all(userPromises).then((userNames) => {
        setUsers(userNames);
      });
    }
  }, [list]);

  const totalUsageHours = list.reduce((accumulator, currentValue) => accumulator + (currentValue.totalHours || 0), 0);

  if (!equipment) {
    return <ActivityIndicator size="large" color="#007B83" style={{flex: 1}}/>;
  }
  
  return (
    <View style={localStyles.container}>
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerTitle} numberOfLines={1}>{equipment?.description}</Text>
      </View>
      <ScrollView style={localStyles.scrollArea} contentContainerStyle={{ padding: 16 }}>
        <View style={localStyles.infoCard}>
          <Text style={localStyles.label}>Marca:</Text>
          <Text style={localStyles.value}>{equipment?.marca}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={localStyles.label}>Status: </Text>
            <Text style={[localStyles.value, { color: getStatusColor(equipment?.status), fontWeight: 'bold' }]}>
              {equipment?.status?.charAt(0).toUpperCase()}{equipment?.status?.slice(1).toLowerCase()}
            </Text>
          </View>
          <Text style={localStyles.label}>Data de Registro:</Text>
          <Text style={localStyles.value}>{formatDate(equipment.dataEntrada)}</Text>
          <Text style={localStyles.label}>QrCode:</Text>
          <Text style={localStyles.value}>{equipment?.qrCodeData || 'Não definido'}</Text>
          <Text style={[localStyles.label, { marginTop: 15 }]}>
            Tempo total de uso: <Text style={localStyles.value}>{formatDuration(totalUsageHours)}</Text>
          </Text>
        </View>
        <Text style={[localStyles.sectionTitle, { marginTop: 24 }]}>Histórico de Uso</Text>
        {list.length > 0 ? list.map((us, index) => (
          <View key={index} style={localStyles.usageCard}>
            <Text style={localStyles.usageLabel}>Atividade: <Text style={localStyles.usageValue}>{us.activity}</Text></Text>
            <Text style={localStyles.usageLabel}>Utilizador: <Text style={localStyles.usageValue}>{users[index] || 'Carregando...'}</Text></Text>
            <Text style={localStyles.usageLabel}>Horário de Início: <Text style={localStyles.usageValue}>{formatDate(us.startTime)}</Text></Text>
            <Text style={localStyles.usageLabel}>Horário de Devolução: <Text style={localStyles.usageValue}>{formatDate(us.endTime)}</Text></Text>
            <Text style={localStyles.usageLabel}>Tempo de Uso: <Text style={localStyles.usageValue}>{formatDuration(us.totalHours)}</Text></Text>
          </View>
        )) : <Text style={localStyles.noHistoryText}>Nenhum histórico de uso para este equipamento.</Text>}
      </ScrollView>
      <View style={{ padding: 16 }}>
        <Button
          mode="contained"
          style={styles.searchButton}
          onPress={() => router.push('/home_pages/relatorio')}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerBox: {
    backgroundColor: '#E3EAF2',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
  },
  scrollArea: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#111',
    marginBottom: 8,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 2,
  },
  usageCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#007B83',
  },
  usageLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  usageValue: {
    fontWeight: '400',
    color: '#111',
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});
