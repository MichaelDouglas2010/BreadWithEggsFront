import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../../helpers/axios';
import { EquipmentGet } from '../../components/interfaces/equipment';
import EquipmentTableRelatorio from '../../components/tabelas/Equipment_table_relatorio';

export default function RelatorioEquip() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [equipments, setEquipments] = useState<EquipmentGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = searchQuery.trim() ? `/equipment?search=${searchQuery.trim()}` : '/equipment';
      const response = await api.get(endpoint);

      if (response.data && response.data.length > 0) {
        setEquipments(response.data);
      } else {
        setEquipments([]);
        setErrorMessage(searchQuery.trim() ? 'Equipamento inexistente.' : 'Nenhum equipamento cadastrado.');
      }
    } catch (error) {
      console.error('Erro na busca: ', error);
      setErrorMessage('Falha ao buscar equipamentos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={localStyles.container}
    >
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerTitle}>Consultar Relatório</Text>
      </View>

      <View style={localStyles.searchCard}>
        <Text style={localStyles.inputLabel}>Descrição ou ID</Text>
        <TextInput
          style={localStyles.searchInput}
          placeholder="Digite aqui para buscar..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <Button
          mode="contained"
          style={localStyles.button}
          labelStyle={localStyles.buttonLabel}
          onPress={handleSearch}
          loading={isLoading}
          disabled={isLoading}
        >
          Buscar
        </Button>
      </View>
        
      <View style={localStyles.resultsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007B83" style={{flex: 1, justifyContent: 'center'}} />
        ) : equipments.length > 0 ? (
          <EquipmentTableRelatorio equipments={equipments} />
        ) : (
          <Text style={localStyles.errorText}>{errorMessage}</Text>
        )}
      </View>

      <View style={localStyles.footer}>
          <Button
            mode="outlined"
            style={localStyles.backButton}
            labelStyle={localStyles.backButtonLabel}
            onPress={() => router.push('/home')}
          >
            Voltar
          </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    paddingVertical: 24,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fafafa'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  searchCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500'
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    backgroundColor: '#007B83' // Cor temática para relatório
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#616161'
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  backButton: {
    borderRadius: 10,
    paddingVertical: 8,
    borderColor: '#ccc'
  },
  backButtonLabel: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#333'
  }
});
