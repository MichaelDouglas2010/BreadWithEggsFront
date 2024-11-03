import { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../components/styles';
import api from '../helpers/axios';
import { EquipmentGet } from '../components/interfaces/equipment';

export default function ConsultarEquip() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<EquipmentGet[]>([]); // Inicialmente vazio
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

  const handleSearch = async () => {
    try {
      let response;

      if (searchQuery) {
        // Busca por descrição ou ID
        response = await api.get(`/equipment?search=${searchQuery}`);
        
        // Verifica se a resposta tem equipamentos
        if (response.data.length > 0) {
          setFilter(response.data); // Armazena os equipamentos encontrados
          setErrorMessage(''); // Limpa a mensagem de erro
        } else {
          setFilter([]); // Limpa o filtro se não houver equipamentos
          setErrorMessage('Equipamento inexistente'); // Define a mensagem de erro
        }
      } else {
        // Se a busca estiver vazia, mostra todos os equipamentos
        response = await api.get('/equipment');
        setFilter(response.data);
        setErrorMessage(''); // Limpa a mensagem de erro
      }
    } catch (error) {
      console.log("Erro na busca: ", error);
      setErrorMessage('Erro ao buscar equipamentos'); // Define a mensagem de erro em caso de falha
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>  Entrada e Saida</Text>
      </View>

      {/* Barra de Pesquisa */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Insira a descrição ou ID do equipamento"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button icon="magnify" mode="contained" style={styles.searchButton} onPress={handleSearch}>
          Buscar
        </Button>
      </View>

      {/* Mensagem de erro, se houver */}
      {errorMessage ? (
        <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
      ) : null}

      {/* Mostra os equipamentos apenas após clicar no botão de busca */}
      <ScrollView style={styles.consEquipMenu}>
        <View style={{ marginBottom: 5 }} />
        {filter.map((equip) => (
          <Button
            key={equip._id.toString()}
            mode="contained"
            style={styles.homeButton}
            onPress={() => console.log(`Apertou ${equip.description}`)}
          >
            {equip.description} - {equip.marca} - {equip.status}
          </Button>
        ))}
      </ScrollView>
    </View>
  );
}
