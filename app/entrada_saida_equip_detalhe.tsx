import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importando a biblioteca
import styles from '../components/styles';
import api from '../helpers/axios';
import { EquipmentGet } from '../components/interfaces/equipment';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';

export default function EntradaSaidaEquipDetalhe() {
  const [equipment, setEquipment] = useState<EquipmentGet>();
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Estado para armazenar o status selecionado
  const { equipId } = useLocalSearchParams();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ativo':
        return 'green';
      case 'inativo':
        return 'red';
      case 'emprestado':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    api.get('/equipment/' + equipId).then((response) => {
      setEquipment(response.data);
      setSelectedStatus(response.data.status); // Inicializa o status selecionado com o status atual do equipamento
    });
  }, []);

  const handleStatusChange = async (status: string) => {
    setSelectedStatus(status);
  }

  const handleUpdate = async () => {
    if (!equipment) return

    try {
      await api.put(`/equipment/${equipment._id}`, {
        description: equipment.description,
        marca: equipment.marca,
        status: equipment.status,
        dataEntrada: equipment.dataEntrada,
        qrCodeData: equipment.qrCodeData
      })
      Alert.alert('Sucesso', 'Equipamento alterado com sucesso!')
      router.push('/entrada_saida_equip')
    } catch (e) {
      console.log("Erro ao atualizar equipamento: " + e)
      Alert.alert('Erro', 'Não foi possível alterar o equipamento.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>{equipment?.description}</Text>
      </View>
      <ScrollView style={[styles.consEquipMenu, { marginBottom: 10 }]}>
        <Text style={[localStyles.text, { marginTop: 20 }]}>Descrição: {equipment?.description}</Text>
        <Text style={localStyles.text}>Marca: {equipment?.marca}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={localStyles.text}>Status: </Text>
          <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>
            {equipment?.status.charAt(0).toUpperCase()}
            {equipment?.status.slice(1).toLowerCase()}
          </Text>
        </View>

        <Text style={[localStyles.text, { marginTop: 30 }]}>ALTERAR STATUS PARA:</Text>

        <RNPickerSelect
          onValueChange={(value) => handleStatusChange(value)}
          items={[
            { label: 'Ativo', value: 'ativo' },
            { label: 'Inativo', value: 'inativo' },
            { label: 'Emprestado', value: 'emprestado' },
            { label: 'Em Manutenção', value: 'em manutenção' },
          ]}
          value={selectedStatus} // Exibe o status selecionado
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione um status', value: null }}
        />

      </ScrollView>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button mode="contained" style={[styles.searchButton,]} onPress={() => router.push('/entrada_saida_equip')}>
          Voltar
        </Button>
        <Button mode="contained" style={[styles.searchButton, { marginLeft: 40 }]} onPress={handleUpdate}>
          Alterar
        </Button>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
});

// Estilo personalizado para o Picker
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
});
