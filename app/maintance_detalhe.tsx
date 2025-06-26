import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../helpers/axios';
import { EquipmentGet } from '../components/interfaces/equipment';
import { Button } from 'react-native-paper';

// Interface para os dados de um registo de manutenção
interface MaintenanceRecord {
  _id: string;
  equipmentId: string;
  description: string;
  cost: number;
  date: string;
  performedBy: string;
}

export default function MaintenanceDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const equipId = params.equipId as string;

  // Usa os parâmetros passados para exibir imediatamente, melhorando a experiência do utilizador
  const initialDescription = params.description as string;
  const initialMarca = params.marca as string;

  const [maintenanceList, setMaintenanceList] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Funções para formatação
  const formatDate = (dateString: string) => {
      if(!dateString) return 'Data não informada';
      return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }
  const formatCost = (cost: number) => {
      if(cost === null || typeof cost === 'undefined') return 'N/A';
      return `R$ ${cost.toFixed(2).replace('.', ',')}`;
  }

  useEffect(() => {
    if (equipId) {
      setIsLoading(true);
      api.get(`/maintenance/eqp/${equipId}`) // Rota para buscar manutenções pelo ID do equipamento
        .then(response => {
          setMaintenanceList(response.data);
        }).catch(error => {
          console.error("Erro ao carregar detalhes de manutenção:", error);
        }).finally(() => setIsLoading(false));
    }
  }, [equipId]);

  const totalCost = maintenanceList.reduce((sum, item) => sum + (item.cost || 0), 0);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ffc107" style={{ flex: 1 }} />;
  }

  return (
    <View style={detailsStyles.container}>
      <View style={detailsStyles.headerBox}>
        <Text style={detailsStyles.headerTitle}>{initialDescription}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={detailsStyles.infoCard}>
            <Text style={detailsStyles.label}>Marca:</Text>
            <Text style={detailsStyles.value}>{initialMarca}</Text>
            <Text style={detailsStyles.label}>Custo Total de Manutenção:</Text>
            <Text style={[detailsStyles.value, {color: '#d32f2f', fontWeight: 'bold'}]}>{formatCost(totalCost)}</Text>
        </View>
        
        <Text style={detailsStyles.sectionTitle}>Histórico de Manutenção</Text>
        {maintenanceList.length > 0 ? maintenanceList.map(item => (
          <View key={item._id} style={detailsStyles.usageCard}>
            <Text style={detailsStyles.usageLabel}>Serviço: <Text style={detailsStyles.usageValue}>{item.description}</Text></Text>
            <Text style={detailsStyles.usageLabel}>Executado por: <Text style={detailsStyles.usageValue}>{item.performedBy}</Text></Text>
            <Text style={detailsStyles.usageLabel}>Data: <Text style={detailsStyles.usageValue}>{formatDate(item.date)}</Text></Text>
            <Text style={detailsStyles.usageLabel}>Custo: <Text style={detailsStyles.usageValue}>{formatCost(item.cost)}</Text></Text>
          </View>
        )) : <Text style={detailsStyles.noHistoryText}>Nenhum histórico de manutenção para este equipamento.</Text>}
      </ScrollView>

      <View style={{ padding: 16, backgroundColor: '#F5F7FA' }}>
        <Button mode="outlined" style={detailsStyles.backButton} onPress={() => router.back()}>Voltar</Button>
      </View>
    </View>
  );
}

const detailsStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    headerBox: { backgroundColor: '#ffc107', paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center', elevation: 4 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#212529' },
    infoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
    label: { fontSize: 16, fontWeight: '600', color: '#495057' },
    value: { fontSize: 16, marginBottom: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#dee2e6' },
    usageCard: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 12, elevation: 1 },
    usageLabel: { fontWeight: 'bold' },
    usageValue: { fontWeight: 'normal' },
    noHistoryText: { textAlign: 'center', color: '#6c757d', marginTop: 20 },
    backButton: { borderColor: '#6c757d', borderRadius: 8 }
});
