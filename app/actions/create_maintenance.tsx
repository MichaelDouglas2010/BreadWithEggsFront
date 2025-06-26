import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../helpers/axios'; 
import { Button } from 'react-native-paper';
import { useAuth } from '../../context/auth';

interface CreateMaintenancePayload {
  equipmentId: string;
  description: string;
  cost: number;
  date: string;
  performedBy: string;
}

type LocalParams = {
  equipId: string;
  description: string;
  marca: string;
};

export default function CreateMaintenanceRecordPage() {
  const { user } = useAuth(); 
  const router = useRouter();
  const params = useLocalSearchParams<LocalParams>();

  const [serviceDescription, setServiceDescription] = useState('');
  const [cost, setCost] = useState('');
  const [performedBy, setPerformedBy] = useState(user?.name || ''); // Sugere o nome do utilizador logado
  const [maintenanceDate, setMaintenanceDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!serviceDescription.trim() || !cost.trim() || !performedBy.trim()) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
      return;
    }
    const costValue = parseFloat(cost.replace(',', '.'));
    if(isNaN(costValue)){
      Alert.alert('Atenção', 'O custo deve ser um número válido.');
      return;
    }

    setIsLoading(true);
    try {
      const payload: CreateMaintenancePayload = {
        equipmentId: params.equipId,
        description: serviceDescription.trim(),
        cost: costValue,
        date: new Date(maintenanceDate).toISOString(),
        performedBy: performedBy.trim(),
      };
      
      // Cria o registo de manutenção
      await api.post(`/maintenance`, payload);
      // Atualiza o status do equipamento para inativo (ou o status que você definir para "em manutenção")
      await api.patch(`/equipment/${params.equipId}/status`, { status: 'inativo' });

      Alert.alert('Sucesso!', 'Registo de manutenção criado com sucesso!');
      router.push('/home_pages/register_maintenance'); 

    } catch (error) {
      console.error('Erro ao criar manutenção:', JSON.stringify(error, null, 2));
      const errorMessage = (error as any).response?.data?.error || 'Não foi possível criar o registo.';
      Alert.alert('Erro na Solicitação', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={localStyles.container}>
        <View style={localStyles.card}>
          <Text style={localStyles.title}>Registrar Manutenção</Text>
          
          <Text style={localStyles.label}>Equipamento:</Text>
          <Text style={localStyles.value}>{params.description}</Text>

          <Text style={localStyles.label}>Marca:</Text>
          <Text style={localStyles.value}>{params.marca}</Text>

          <Text style={localStyles.label}>Descrição do Serviço Realizado:</Text>
          <TextInput
            style={localStyles.input}
            value={serviceDescription}
            onChangeText={setServiceDescription}
            placeholder="Ex: Troca de óleo e filtro"
            placeholderTextColor="#888"
          />

          <Text style={localStyles.label}>Custo (R$):</Text>
          <TextInput
            style={localStyles.input}
            value={cost}
            onChangeText={setCost}
            placeholder="Ex: 150.50"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />

          <Text style={localStyles.label}>Realizado por:</Text>
          <TextInput
            style={localStyles.input}
            value={performedBy}
            onChangeText={setPerformedBy}
            placeholder="Nome do responsável"
            placeholderTextColor="#888"
          />

          <Text style={localStyles.label}>Data da Manutenção:</Text>
           <TextInput
            style={localStyles.input}
            value={maintenanceDate}
            onChangeText={setMaintenanceDate}
            placeholder="AAAA-MM-DD"
            placeholderTextColor="#888"
          />

          <View style={localStyles.buttonContainer}>
            <Button
              mode="outlined"
              style={[localStyles.button, {borderColor: '#888'}]}
              onPress={() => router.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              style={[localStyles.button, { backgroundColor: '#ffc107' }]}
              labelStyle={{color: '#212529'}}
              onPress={handleConfirm}
              loading={isLoading}
              disabled={isLoading}
            >
              Confirmar
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#f4f4f4', padding: 16, justifyContent: 'center' },
    card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, color: '#555', marginTop: 12, fontWeight: '600', marginBottom: 4 },
    value: { fontSize: 18, color: '#000', marginBottom: 8, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
    input: { fontSize: 18, color: '#000', backgroundColor: '#ffffff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#ccc' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 12 },
    button: { flex: 1, justifyContent: 'center' },
});
