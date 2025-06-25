import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../../helpers/axios'; // Importando sua instância do Axios

// Define os tipos dos parâmetros que esta tela espera receber da tabela
type LocalParams = {
  equipId: string;
  description: string;
  marca: string;
};

export default function EntradaEquip() {
  const router = useRouter();
  const params = useLocalSearchParams<LocalParams>(); 
  const [isLoading, setIsLoading] = useState(false);

  const equipId = Array.isArray(params.equipId) ? params.equipId[0] : params.equipId;
  const description = Array.isArray(params.description) ? params.description[0] : params.description;
  const marca = Array.isArray(params.marca) ? params.marca[0] : params.marca;


  const processReturn = async () => {
    // Validação para garantir que temos o ID do equipamento
    if (!equipId) {
      Alert.alert('Erro', 'ID do equipamento não encontrado. Tente novamente.');
      return;
    }
    
    setIsLoading(true);
    try {
      await api.put(`/usage/return/${equipId}`);

      await api.patch(`/equipment/${equipId}/status`, { status: 'ativo' });
      
      Alert.alert('Sucesso!', 'Entrada de equipamento confirmada e status atualizado!');
      
      router.push('/home_pages/registrar_uso_equip'); 

    } catch (error) {
      console.error('Erro ao registrar entrada:', JSON.stringify(error, null, 2));
      const errorMessage = (error as any).response?.data?.error || 'Não foi possível confirmar a entrada.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Função que mostra o alerta de confirmação para o usuário
  const handleConfirm = () => {
    Alert.alert(
      'Confirmar Entrada',
      `Deseja confirmar a devolução do equipamento "${description || 'Equipamento'}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: processReturn, // Chama a função que executa as chamadas à API
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Registrar Entrada de Equipamento</Text>

        {/* Exibindo os dados completos do equipamento usando as variáveis seguras */}
        <Text style={localStyles.label}>ID do Equipamento:</Text>
        <Text style={localStyles.value}>{equipId || 'Carregando...'}</Text>
        
        <Text style={localStyles.label}>Tipo do equipamento:</Text>
        <Text style={localStyles.value}>{description || 'Carregando...'}</Text>

        <Text style={localStyles.label}>Marca:</Text>
        <Text style={localStyles.value}>{marca || 'Carregando...'}</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#007B83" style={localStyles.loading} />
        ) : (
          <View style={localStyles.buttonContainer}>
            <Button
              mode="outlined"
              style={[localStyles.button, {borderColor: '#888'}]}
              labelStyle={{ color: '#333' }}
              onPress={() => router.back()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              style={[localStyles.button, { backgroundColor: '#32cd32' }]} 
              icon="arrow-left-bold-outline"
              onPress={handleConfirm}
              loading={isLoading}
              disabled={isLoading}
            >
              Confirmar Entrada
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Estilos consistentes e melhorados
const localStyles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#f4f4f4', 
    padding: 16, 
    justifyContent: 'center' 
  },
  card: { 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    padding: 20, 
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  label: { 
    fontSize: 16, 
    color: '#555', 
    marginTop: 12, 
    fontWeight: '600', 
    marginBottom: 4, 
  },
  value: { 
    fontSize: 18, 
    color: '#000', 
    marginBottom: 8, 
    backgroundColor: '#f0f0f0', 
    padding: 12, 
    borderRadius: 8, 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24, 
    gap: 12,
  },
  button: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  loading: { 
    marginTop: 20, 
  },
});
