import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl
} from 'react-native';
import { FlatList as GestureFlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../../helpers/axios';
import { EquipmentGet } from '../../components/interfaces/equipment';
import QRCodeScanner from '../../components/sensor/QRCodeScanner';
// Verifique se o caminho para a sua tabela de manutenção está correto
import EquipmentTableMaintenance from '../../components/tabelas/Equipment_maintenance'; 

export default function MaintenanceListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [equipments, setEquipments] = useState<EquipmentGet[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleSearch = useCallback(async () => {
    if (!isRefreshing) setIsLoading(true);
    setErrorMessage('');
    try {
      // A busca agora é sempre feita na API para ter os dados mais atualizados
      const endpoint = searchQuery.trim() ? `/equipment?search=${searchQuery.trim()}` : '/equipment';
      const response = await api.get(endpoint);
      
      if (response.data && response.data.length > 0) {
        setEquipments(response.data);
      } else {
        setEquipments([]);
        setErrorMessage(searchQuery.trim() ? 'Nenhum equipamento corresponde à busca.' : 'Nenhum equipamento encontrado.');
      }
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
      setErrorMessage('Falha ao carregar equipamentos. Tente novamente.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, isRefreshing]);

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = () => {
    // Função dedicada para o carregamento inicial e o refresh
    setSearchQuery(''); // Limpa a busca
    handleSearch();
  };
  
  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    if (result.data) {
      setSearchQuery(result.data);
      setIsScanning(false);
      // Inicia a busca automaticamente após ler o QR Code
      handleSearch(); 
    }
  };

  const handleQRCodeButtonPress = async () => {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'A permissão da câmera é necessária para escanear QR Code.');
      return;
    }
    setIsScanning(true);
  };
  
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchEquipments();
  }, []);

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[pageStyles.searchInput, { flex: 1 }]}
              placeholder="Digite a descrição ou ID..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleQRCodeButtonPress}>
              <Ionicons name="qr-code-outline" size={30} color="#ffc107" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        </View>
        <Button 
            mode="contained" 
            style={pageStyles.searchButton}
            labelStyle={{ color: '#212529', fontWeight: 'bold' }} // Estilo do texto do botão
            onPress={handleSearch}
            loading={isLoading && !isRefreshing}
            disabled={isLoading}
        >
            Buscar
        </Button>
      </View>

       {isScanning && (
          <View style={pageStyles.scannerContainer}>
            <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />
            <Button mode="outlined" style={{ marginTop: 10 }} onPress={() => setIsScanning(false)}>
              Fechar Câmera
            </Button>
          </View>
        )}

      {isLoading && !isRefreshing ? (
        <ActivityIndicator size="large" color="#ffc107" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <GestureFlatList
          style={pageStyles.listStyle}
          contentContainerStyle={pageStyles.listContentContainer}
          data={equipments.length > 0 ? [{ key: 'table' }] : []}
          renderItem={() => <EquipmentTableMaintenance equipments={equipments} />}
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
      fontSize: 16 
    },
    searchButton: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 4,
        backgroundColor: '#ffc107', // Fundo amarelo
    },
    scannerContainer: {
        margin: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee'
    },
    listStyle: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexGrow: 1,
    },
    errorText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
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
    borderRadius: 10,
    paddingVertical: 8,
    borderColor: '#ccc'
  }
});
