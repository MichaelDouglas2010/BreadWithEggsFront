import { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/auth';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../../../helpers/axios';

export default function CadastrarEquip() {
  const { user } = useAuth();
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [marca, setMarca] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateQRCodeData = () => {
    return Math.random().toString(36).substr(2, 12);
  };

  const handleRegister = async () => {
    if (!description.trim() || !marca.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/equipment', {
        description,
        marca,
        status: 'ativo',
        dataEntrada: new Date(),
        qrCodeData: generateQRCodeData(),
      });
      Alert.alert('Sucesso', 'Equipamento cadastrado com sucesso!');
      setDescription('');
      setMarca('');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cadastrar equipamento!');
      console.log('Erro ao cadastrar equipamento: ' + e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Cadastrar Equipamento</Text>
        <Text style={localStyles.label}>Tipo de Equipamento</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Insira a descrição do equipamento"
          placeholderTextColor="#CCCCCC"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={localStyles.label}>Marca</Text>
        <TextInput
          style={localStyles.input}
          placeholder="Insira a marca do equipamento"
          placeholderTextColor="#CCCCCC"
          value={marca}
          onChangeText={setMarca}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#ccc' }]}
            labelStyle={{ color: '#222' }}
            onPress={() => router.push('/home_pages/gerenciar_equip')}
            disabled={isLoading}
          >
            Voltar
          </Button>
          <Button
            mode="contained"
            style={[localStyles.button, { backgroundColor: '#007B83' }]}
            labelStyle={{ color: '#fff' }}
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
          >
            Cadastrar
          </Button>
        </View>
        {isLoading && (
          <ActivityIndicator size="large" color="#007B83" style={{ marginTop: 20 }} />
        )}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    color: '#111',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
  },
});