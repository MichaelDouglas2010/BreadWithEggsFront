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
  RefreshControl,
  ScrollView
} from 'react-native';
import { FlatList as GestureFlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../../../helpers/axios';
import { EquipmentGet } from '../../../components/interfaces/equipment';
import QRCodeScanner from '../../../components/sensor/QRCodeScanner';
// Verifique se o caminho para a sua tabela de exclusão está correto
import EquipmentTableDelete from '../../../components/tabelas/Equipment_table_delete';

export default function ExcluirEquip() {
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
      setIsRefreshing(false);
    }
  }, [searchQuery, isRefreshing]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    if (result.data) {
      setSearchQuery(result.data);
      setIsScanning(false);
      handleSearch();
    }
  };
  
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setSearchQuery('');
    handleSearch();
  }, []);

  const handleQRCodeButtonPress = async () => {
    const { status } = await requestPermission();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'A permissão da câmera é necessária para escanear QR Code.');
      return;
    }
    setIsScanning(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={localStyles.container}
    >
        <View style={localStyles.headerBox}>
          <Text style={localStyles.headerTitle}>Excluir Equipamento</Text>
        </View>

        <View style={localStyles.searchCard}>
          <Text style={localStyles.inputLabel}>Descrição ou ID</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[localStyles.searchInput, { flex: 1 }]}
                placeholder="Digite para buscar..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity onPress={handleQRCodeButtonPress}>
                <Ionicons name="qr-code-outline" size={30} color="#dc3545" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            style={localStyles.button}
            labelStyle={localStyles.buttonLabel}
            onPress={handleSearch}
            loading={isLoading && !isRefreshing}
          >
            Buscar
          </Button>
        </View>

        {isScanning && (
          <View style={localStyles.scannerContainer}>
            <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />
            <Button mode="outlined" style={{ marginTop: 10 }} onPress={() => setIsScanning(false)}>
              Fechar Câmera
            </Button>
          </View>
        )}
        
        {/* Utilizando a estrutura de GestureFlatList */}
        <View style={localStyles.resultsContainer}>
          {isLoading && !isRefreshing? (
            <ActivityIndicator size="large" color="#dc3545" style={{flex: 1, justifyContent: 'center'}} />
          ) : (
            <GestureFlatList
              data={equipments.length > 0 ? [{ key: 'table-wrapper' }] : []}
              keyExtractor={item => item.key}
              renderItem={() => (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16}}>
                  <EquipmentTableDelete 
                    equipments={equipments} 
                    onRefresh={onRefresh} 
                  />
                </ScrollView>
              )}
              ListEmptyComponent={<Text style={localStyles.errorText}>{errorMessage}</Text>}
              refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#dc3545']}/>
              }
            />
          )}
        </View>

        <View style={localStyles.footer}>
            <Button
              mode="outlined"
              style={localStyles.backButton}
              labelStyle={localStyles.backButtonLabel}
              onPress={() => router.push('/home_pages/gerenciar_equip')}
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
    backgroundColor: '#dc3545',
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scannerContainer: {
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  resultsContainer: {
    flex: 1,
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
