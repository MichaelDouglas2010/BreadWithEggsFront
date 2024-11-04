import { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../components/styles';
import api from '../helpers/axios';
import EquipmentTable from '../components/tabelas/Equipament_table';
import axios from 'axios';
import { EquipmentGet } from '../components/interfaces/equipment';

export default function ConsultarEquip() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<EquipmentGet[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let response: { data: EquipmentGet[] };
      if (searchQuery) {
        response = await api.get(`/equipment?search=${searchQuery}`);
        if (response.data.length > 0) {
          setFilter(response.data);
          setErrorMessage('');
        } else {
          setFilter([]);
          setErrorMessage('Equipamento inexistente');
        }
      } else {
        response = await api.get('/equipment');
        setFilter(response.data);
        setErrorMessage('');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response);
        setErrorMessage(`Erro: ${error.response.data.message || 'Erro ao buscar equipamentos'}`);
      } else {
        console.error('Erro na busca: ', error);
        setErrorMessage('Erro ao buscar equipamentos');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Insira a descrição ou ID do equipamento"
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityLabel="Campo de busca de equipamento"
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button icon="magnify" mode="contained" style={styles.searchButton} onPress={handleSearch} accessibilityLabel="Botão para buscar equipamento">
          Buscar
        </Button>
      )}
      {errorMessage ? <Text style={[styles.errorText, { color: 'red' }]}>{errorMessage}</Text> : null}
      {filter.length > 0 && <EquipmentTable equipments={filter} navigation={undefined} />}
    </View>
  );
}
