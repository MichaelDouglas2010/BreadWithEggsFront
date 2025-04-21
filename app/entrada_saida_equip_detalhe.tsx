import { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../components/styles';
import { Button } from 'react-native-paper';
import api from '../helpers/axios';
import { EquipmentGet } from '../components/interfaces/equipment';
import EquipmentTable from '../components/tabelas/Equipament_table';
import { router } from 'expo-router';

export default function EntradaSaidaEquip() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filter, setFilter] = useState<EquipmentGet[]>([]); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let response;
      if (searchQuery) {
        response = await api.get(`/equipment?search=${searchQuery}`);
        if (response.data.length > 0) {
          setFilter(response.data);
          setErrorMessage('');
        } else {
          setFilter([]);
          setErrorMessage('Nenhum equipamento encontrado.');
        }
      } else {
        response = await api.get('/equipment');
        setFilter(response.data);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar equipamentos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título da página */}
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Entrada e Saída de Equipamentos</Text>
      </View>

      {/* Barra de Pesquisa */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, color: 'white', marginBottom: 5 }}>Descrição</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Insira a descrição ou ID do equipamento"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          mode="contained"
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={!searchQuery.trim() && !isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </View>

      {/* Feedback de erro */}
      {errorMessage ? (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      {/* Lista de equipamentos ou indicador de carregamento */}
      <ScrollView horizontal style={[styles.consEquipMenu, { marginBottom: 10 }]}>
        {isLoading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#1e90ff" />
          </View>
        ) : (
          <EquipmentTable equipments={filter} />
        )}
      </ScrollView>

      {/* Botão Voltar */}
      <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/home')}>
        Voltar
      </Button>
    </View>
  );
}