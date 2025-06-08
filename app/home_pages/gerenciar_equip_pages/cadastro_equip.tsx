import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/auth';
import styles from '../../../components/styles';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../../../helpers/axios';
import React from 'react';

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
      const response = await api.post('/equipment', {
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
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Cadastrar Equipamento</Text>
      </View>

      <ScrollView style={[styles.consEquipMenu]}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a descrição do equipamento"
            placeholderTextColor="#CCCCCC"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.inputLabel}>Marca</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a marca do equipamento"
            placeholderTextColor="#CCCCCC"
            value={marca}
            onChangeText={setMarca}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <>
              <Button
                mode="contained"
                style={[styles.searchButton, { width: 150, height: 50 }]}
                onPress={handleRegister}
              >
                Cadastrar
              </Button>
              <Button mode="contained" style={[styles.searchButton, { width: 150, height: 50 }]} onPress={() => router.push('/home_pages/gerenciar_equip')}> 
                Voltar
              </Button>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}