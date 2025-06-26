import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Card, Title, Paragraph } from 'react-native-paper'; // Usando componentes do Paper para consistência
import { Ionicons } from '@expo/vector-icons';
import api from '../helpers/axios';
import { EquipmentGet } from '../components/interfaces/equipment';

export default function ConsultarEquipDetalhe() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [equipment, setEquipment] = useState<EquipmentGet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para formatar a data de forma mais legível
  function formatDate(dateString?: string): string {
    if (!dateString) return 'Não informado';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Data inválida';
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' // Garante que a data não mude por causa do fuso horário
    });
  }

  // Função para retornar a cor e o ícone correspondente ao status
  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'ativo':
        return { color: '#28a745', icon: 'checkmark-circle' as const };
      case 'inativo':
        return { color: '#dc3545', icon: 'close-circle' as const };
      case 'emprestado':
        return { color: '#ffc107', icon: 'time' as const };
      default:
        return { color: '#6c757d', icon: 'help-circle' as const };
    }
  };

  useEffect(() => {
    if (id && typeof id === 'string') {
      setIsLoading(true);
      api.get(`/equipment/${id}`)
        .then((response) => setEquipment(response.data))
        .catch(() => Alert.alert('Erro', 'Não foi possível carregar os detalhes do equipamento.'))
        .finally(() => setIsLoading(false));
    } else {
      Alert.alert('Erro', 'ID do equipamento não fornecido.');
      router.back();
    }
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF6F00" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!equipment) {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.errorText}>Equipamento não encontrado.</Text>
        <Button mode="outlined" onPress={() => router.back()}>Voltar</Button>
      </View>
    );
  }
  
  const statusInfo = getStatusInfo(equipment.status);

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <Card style={localStyles.card}>
        <Card.Content>
          <Title style={localStyles.title}>{equipment.description}</Title>
          
          <View style={localStyles.infoRow}>
            <Ionicons name="pricetag-outline" size={20} color="#555" />
            <Text style={localStyles.label}>Marca:</Text>
            <Text style={localStyles.value}>{equipment.marca}</Text>
          </View>
          
          <View style={localStyles.infoRow}>
            <Ionicons name={statusInfo.icon} size={20} color={statusInfo.color} />
            <Text style={localStyles.label}>Status:</Text>
            <Text style={[localStyles.value, { color: statusInfo.color, fontWeight: 'bold' }]}>
              {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
            </Text>
          </View>

          <View style={localStyles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#555" />
            <Text style={localStyles.label}>Data de Registro:</Text>
            <Text style={localStyles.value}>{formatDate(equipment.dataEntrada)}</Text>
          </View>

          <View style={localStyles.infoRow}>
            <Ionicons name="qr-code-outline" size={20} color="#555" />
            <Text style={localStyles.label}>QR Code:</Text>
            <Text style={localStyles.value}>{equipment.qrCodeData || 'Não definido'}</Text>
          </View>

        </Card.Content>
        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={localStyles.button}
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#6c757d',
    marginLeft: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#212529',
    marginLeft: 4,
  },
  button: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
  },
  errorText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#dc3545',
      marginBottom: 20,
  }
});
