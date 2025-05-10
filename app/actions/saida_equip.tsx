import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import api from '../../helpers/axios';
import { useAuth } from '../../context/auth';

export default function SaidaEquipamento() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const [retiradoPor, setRetiradoPor] = useState(params.retiradoPor?.toString() || '');
  const [localUso, setLocalUso] = useState(params.localUso?.toString() || '');
  const [observacoes, setObservacoes] = useState(params.observacoes?.toString() || '');
  const [assinatura, setAssinatura] = useState<string | undefined>(params.signature?.toString());
  const [dataHoraSaida, setDataHoraSaida] = useState('');

  // Configura o moment para português
  moment.locale('pt-br');

  useEffect(() => {
    // Atualiza data e hora quando a tela ganha foco
    const updateDateTime = () => {
      const now = moment().tz('America/Sao_Paulo');
      setDataHoraSaida(now.format('DD/MM/YYYY [às] HH:mm:ss'));
      console.log('Data e Hora da Saída atualizada:', dataHoraSaida); // Log da data e hora
    };

    updateDateTime();
    
    // Atualiza a assinatura se vier como parâmetro
    if (params.signature) {
      setAssinatura(params.signature.toString());
      console.log('Assinatura atualizada:', params.signature); // Log da assinatura
    }
  }, [params.signature]);

  const handleAbrirAssinatura = () => {
    console.log('Abrindo tela de assinatura com os seguintes parâmetros:', {
      equipId: params.equipId?.toString(),
      userId: user._id,
      description: params.description?.toString(),
      marca: params.marca?.toString(),
      retiradoPor,
      localUso,
      observacoes,
      dataHoraSaida,
    });
    navigation.navigate('signature/SignatureScreen', {
      equipId: params.equipId?.toString(),
      userId: user._id,
      description: params.description?.toString(),
      marca: params.marca?.toString(),
      retiradoPor,
      localUso,
      observacoes,
      dataHoraSaida, // Passa a data/hora para a tela de assinatura
    });
  };

  const handleSalvar = async () => {
    try {
      console.log('Iniciando o processo de salvamento dos dados...');
      
      const startTime = moment(dataHoraSaida, 'DD/MM/YYYY [às] HH:mm:ss')
        .tz('America/Sao_Paulo')
        .toISOString();
      console.log('Data e hora de início (startTime):', startTime);

      const endTime = new Date().toISOString();
      console.log('Data e hora de fim (endTime):', endTime);

      const totalHours = moment(endTime).diff(moment(startTime), 'hours', true);
      console.log('Total de horas de uso:', totalHours);

      const data = {
        equipmentId: params.equipId,
        description: params.description,
        marca: params.marca,
        userId: user._id,
        activity: localUso,
        startTime,
        endTime,
        totalHours,
        assinatura,
        retiradoPor,
        observacoes,
      };

      console.log('Dados para envio ao backend:', data);

      // Registra a saída
      await api.post('/usage/', data);
      console.log('Saída de equipamento registrada com sucesso!');

      // Atualiza o status do equipamento para "Emprestado"
      await api.patch(`/equipment/${params.equipId}/status`, {
        status: 'emprestado',
      });
      console.log('Status do equipamento atualizado para "Emprestado"');

      Alert.alert('Sucesso', 'Saída de equipamento registrada com sucesso!');
      router.push('/../home_pages/registrar_uso_equip');  
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Falha ao registrar a saída do equipamento.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Equipamento:</Text>
      <Text style={styles.value}>{params.description}</Text>

      <Text style={styles.label}>Marca:</Text>
      <Text style={styles.value}>{params.marca}</Text>

      <Text style={styles.label}>ID do Equipamento:</Text>
      <Text style={styles.value}>{params.equipId}</Text>

      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Data e Hora da Saída:</Text>
      <View style={styles.datetimeContainer}>
        <Text style={styles.datetimeText}>{dataHoraSaida || 'Carregando...'}</Text>
      </View>

      <Text style={styles.label}>Retirado por:</Text>
      <TextInput
        style={styles.input}
        value={retiradoPor}
        onChangeText={setRetiradoPor}
        placeholder="Nome completo do responsável"
      />

      <Text style={styles.label}>Local de uso:</Text>
      <TextInput
        style={styles.input}
        value={localUso}
        onChangeText={setLocalUso}
        placeholder="Onde o equipamento será utilizado"
      />

      <Text style={styles.label}>Observações:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={observacoes}
        onChangeText={setObservacoes}
        placeholder="Informações adicionais"
        multiline
        numberOfLines={3}
      />

      <View style={styles.signatureSection}>
        <Text style={styles.label}>Assinatura do Responsável:</Text>
        {assinatura?.startsWith('data:image') ? (
          <>
            <Image source={{ uri: assinatura }} style={styles.signatureImage} />
            <Text style={styles.signatureSaved}>✓ Assinatura capturada</Text>
          </>
        ) : (
          <Text style={styles.signaturePlaceholder}>Nenhuma assinatura registrada</Text>
        )}
        <Button 
          title={assinatura ? "Alterar Assinatura" : "Registrar Assinatura"} 
          onPress={handleAbrirAssinatura} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Confirmar Saída" 
          onPress={handleSalvar} 
          color="#2ecc71"
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
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#34495e',
  },
  value: {
    marginBottom: 15,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
  signatureSection: {
    marginTop: 20,
    marginBottom: 25,
  },
  signatureImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  signaturePlaceholder: {
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 6,
  },
  signatureSaved: {
    color: '#27ae60',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});
