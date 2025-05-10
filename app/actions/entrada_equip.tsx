import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import api from '../../helpers/axios';
import axios from 'axios'; // necessário para usar axios.isAxiosError

export default function EntradaEquipamento() {
  const params = useLocalSearchParams();

  const [dataHoraDevolucao, setDataHoraDevolucao] = useState('');
  const [description, setDescription] = useState('');
  const [marca, setMarca] = useState('');
  const [observacoesRetorno, setObservacoesRetorno] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  moment.locale('pt-br');

  useEffect(() => {
    const now = moment().tz('America/Sao_Paulo');
    setDataHoraDevolucao(now.format('DD/MM/YYYY [às] HH:mm:ss'));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const equipmentResponse = await api.get(`/equipment/${params.equipId}`);
        const equipamento = equipmentResponse.data;

        setDescription(equipamento.description || 'Descrição não encontrada');
        setMarca(equipamento.marca || 'Marca não encontrada');

        if (equipamento.status !== 'emprestado') {
          Alert.alert(
            'Atenção',
            'Este equipamento não consta como emprestado no sistema. Talvez ele já tenha sido devolvido.'
          );
        }

        setIsLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Erro ao buscar dados (axios):', error.response?.data || error.message);
        } else {
          console.error('Erro desconhecido ao buscar dados:', error);
        }

        setIsLoading(false);
        Alert.alert(
          'Erro',
          'Não foi possível obter os dados necessários. Tente novamente mais tarde.'
        );
      }
    };

    if (params.equipId) {
      fetchData();
    }
  }, [params.equipId]);

  const handleConfirmarDevolucao = async () => {
    setIsSubmitting(true);

    try {
      const endTimeISO = moment(dataHoraDevolucao, 'DD/MM/YYYY [às] HH:mm:ss').toISOString();

      const data = {
        endTime: endTimeISO,
      };

      console.log('=== DEBUG DEVOLUÇÃO ===');
      console.log('Equip ID:', params.equipId);
      console.log('DataHoraDevolucao (ISO):', endTimeISO);
      console.log('Observações:', observacoesRetorno);
      console.log('Payload enviado:', data);
      console.log('Rota chamada:', `/usage/return/${params.equipId}`);

      const response = await api.put(`/usage/return/${params.equipId}`, data);
      console.log('Devolução registrada com sucesso:', response.data);

      await api.patch(`/equipment/${params.equipId}/status`, {
        status: 'ativo',
      });

      Alert.alert('Sucesso', 'Entrada de equipamento registrada com sucesso!');
      router.push('/home_pages/registrar_uso_equip');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao devolver equipamento (axios):', error.response?.data || error.message);

        if (error.response) {
          console.log('Resposta do servidor:', error.response.data);
          console.log('Status do erro:', error.response.status);
          console.log('Headers:', error.response.headers);
        } else if (error.request) {
          console.log('Requisição feita, mas sem resposta:', error.request);
        }
      } else {
        console.log('Erro desconhecido ao devolver equipamento:', error);
      }

      Alert.alert('Erro', 'Falha ao registrar a devolução do equipamento.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Devolução de Equipamento</Text>

      <Text style={styles.label}>Equipamento:</Text>
      <Text style={styles.value}>{description}</Text>

      <Text style={styles.label}>Marca:</Text>
      <Text style={styles.value}>{marca}</Text>

      <Text style={styles.label}>ID do Equipamento:</Text>
      <Text style={styles.value}>{params.equipId}</Text>

      <Text style={styles.label}>Data e Hora da Devolução:</Text>
      <View style={styles.datetimeContainer}>
        <Text style={styles.datetimeText}>{dataHoraDevolucao}</Text>
      </View>

      <Text style={styles.label}>Observações sobre a devolução:</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        onChangeText={setObservacoesRetorno}
        value={observacoesRetorno}
        placeholder="Registre aqui observações sobre o estado do equipamento devolvido..."
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Confirmar Devolução"
          onPress={handleConfirmarDevolucao}
          color="#3498db"
          disabled={isSubmitting || !observacoesRetorno.trim()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cancelar"
          onPress={() => router.push('/home_pages/registrar_uso_equip')}
          color="#e74c3c"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#34495e',
  },
  value: {
    marginBottom: 15,
    color: '#2c3e50',
  },
  datetimeContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#ecf0f1',
  },
  datetimeText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});
