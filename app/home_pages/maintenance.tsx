import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl
} from 'react-native';
import { FlatList as GestureFlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../../helpers/axios';
import { EquipmentGet } from '../../components/interfaces/equipment';
// Verifique se o nome do componente da tabela está correto
import EquipmentTableMaintenance from '../../components/tabelas/Equipment_maintenance'; 

export default function MaintenanceListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [equipments, setEquipments] = useState<EquipmentGet[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<EquipmentGet[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchEquipments = () => {
    // Só mostra o loading inicial na primeira vez, não no refresh
    !isRefreshing && setIsLoading(true);
    setErrorMessage('');
    api.get('/equipment')
      .then(response => {
        setEquipments(response.data);
        setFilteredEquipments(response.data); // Inicialmente, a lista filtrada é a lista completa
        if (response.data.length === 0) {
          setErrorMessage('Nenhum equipamento encontrado.');
        }
      })
      .catch(error => {
        console.error("Erro ao buscar equipamentos:", error);
        setErrorMessage('Falha ao carregar equipamentos. Tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchEquipments();
  }, []);
  
  // A busca agora é feita localmente na lista já carregada
  const handleSearch = () => {
    if (!searchQuery.trim()) {
        setFilteredEquipments(equipments); // Se a busca for vazia, mostra todos
        setErrorMessage('');
        return;
    }
    const filtered = equipments.filter(equip => 
        (equip.description?.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (equip.marca?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredEquipments(filtered);
    if(filtered.length === 0) {
        setErrorMessage('Nenhum equipamento corresponde à busca.');
    } else {
        setErrorMessage('');
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setSearchQuery(''); // Limpa a busca ao refrescar
    fetchEquipments();
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={pageStyles.container}
    >
      <View style={pageStyles.headerBox}>
        <Text style={pageStyles.headerTitle}>Relatório de Manutenções</Text>
      </View>

      <View style={pageStyles.searchCard}>
        <Text style={pageStyles.inputLabel}>Buscar Equipamento</Text>
        <TextInput
          style={pageStyles.searchInput}
          placeholder="Filtrar por descrição ou marca..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#ffc107" style={{ marginTop: 50 }} />
      ) : (
        <GestureFlatList
            style={pageStyles.listStyle}
            contentContainerStyle={pageStyles.listContentContainer}
            data={[{ key: 'table' }]} // Usamos um item falso para renderizar a tabela dentro da FlatList
            renderItem={() => <EquipmentTableMaintenance equipments={filteredEquipments} />}
            keyExtractor={item => item.key}
            ListEmptyComponent={<Text style={pageStyles.errorText}>{errorMessage}</Text>}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#ffc107']}/>
            }
        />
      )}
      
      <View style={pageStyles.footer}>
        <Button mode="outlined" style={pageStyles.backButton} onPress={() => router.push('/home')}>
          Voltar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const pageStyles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#f8f9fa' 
    },
    headerBox: { 
      backgroundColor: '#ffc107', 
      paddingTop: 40, 
      paddingBottom: 24, 
      paddingHorizontal: 16, 
      alignItems: 'center', 
      elevation: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#e9ecef',
    },
    headerTitle: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      color: '#212529' 
    },
    searchCard: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8
    },
    inputLabel: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 8,
        fontWeight: '500'
    },
    searchInput: { 
      backgroundColor: '#fff', 
      paddingVertical: 12,
      paddingHorizontal: 16, 
      borderRadius: 8, 
      borderWidth: 1, 
      borderColor: '#dee2e6', 
      marginBottom: 10, 
      fontSize: 16 
    },
    listStyle: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#6c757d',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#e9ecef',
        backgroundColor: '#fff'
    },
    backButton: { 
      borderColor: '#6c757d', 
      borderRadius: 8,
      paddingVertical: 4
    }
});
