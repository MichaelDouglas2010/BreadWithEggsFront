import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/auth';
import styles from '../components/styles';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import api from '../helpers/axios';

export default function CadastrarEquip() {
  const { user } = useAuth();
  const [description, setDescription] = useState(''); // Descrição do equipamento
  const [marca, setMarca] = useState(''); // Marca do equipamento

  const generateQRCodeData = () => {
    return Math.random().toString(36).substr(2, 12);
  };

  const handleRegister = async () => {
    try {
      const response = await api.post('/equipment', {
        description,
        marca,
        status: 'ativo',
        dataEntrada: new Date(),
        qrCodeData: generateQRCodeData()
      });
      //console.log('Equipamento cadastrado com sucesso:', response.data);
      Alert.alert('Sucesso', 'Equipamento cadastrado com sucesso!')
      setDescription('');
      setMarca('');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao cadastrar equipamento!')
      console.log("Erro ao cadastrar equipamento: " + e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Cadastrar Equipamento</Text>
      </View>

      {/* Formulário de Cadastro */}
      <ScrollView style={[styles.consEquipMenu]}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Descrição</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a descrição do equipamento"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Marca</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a marca do equipamento"
            value={marca}
            onChangeText={setMarca}
          />
        </View>

        {/* Centralizar Botões */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Button 
            mode="contained" 
            style={[styles.searchButton, { width: 150, height: 50 }]} 
            onPress={handleRegister}
          >
            Cadastrar
          </Button>

          <Button 
            mode="contained" 
            style={[styles.searchButton, { width: 150, height: 50, marginTop: 10 }]} 
            onPress={() => router.push('/selec_equip')}
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
