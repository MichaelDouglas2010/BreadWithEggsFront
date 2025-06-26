import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import api from '../../helpers/axios';
import { EquipmentGet } from '../../components/interfaces/equipment';
import EquipmentTable2 from '../../components/tabelas/Equipament_consultar';
import QRCodeScanner from '../../components/sensor/QRCodeScanner';

export default function ConsultarEquip() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<EquipmentGet[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleSearch = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = searchQuery.trim() ? `/equipment?search=${searchQuery.trim()}` : '/equipment';
      const response = await api.get(endpoint);

      if (response.data && response.data.length > 0) {
        setFilter(response.data);
      } else {
        setFilter([]);
        setErrorMessage(searchQuery.trim() ? 'Equipamento não encontrado.' : 'Nenhum equipamento cadastrado.');
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

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    if (result.data) {
      setSearchQuery(result.data);
      setIsScanning(false);
      handleSearch();
    }
  };

  const handleQRCodeButtonPress = async () => {
    const response = await requestPermission();
    if (!response.granted) {
      setErrorMessage('Permissão da câmera é necessária para escanear QR Code');
      return;
    }
    setIsScanning(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={localStyles.container}
    >
      {/* O ScrollView principal foi removido para evitar o erro de aninhamento */}
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerTitle}>Consultar Equipamento</Text>
      </View>

      <View style={localStyles.searchCard}>
        <Text style={localStyles.inputLabel}>Descrição ou ID</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[localStyles.searchInput, { flex: 1 }]}
            placeholder="Digite aqui para buscar..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleQRCodeButtonPress}>
            <Ionicons name="qr-code-outline" size={30} color="#FF6F00" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
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

      {isScanning && (
        <View style={localStyles.scannerContainer}>
          <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />
          <Button mode="outlined" style={{ marginTop: 10 }} onPress={() => setIsScanning(false)}>
            Fechar Câmera
          </Button>
        </View>
      )}
      
      {/* A área de resultados agora ocupa o espaço restante */}
      <View style={localStyles.resultsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF6F00" />
        ) : errorMessage ? (
          <Text style={localStyles.errorText}>{errorMessage}</Text>
        ) : (
          // A tabela agora pode rolar livremente dentro deste container
          <EquipmentTable2 equipments={filter} />
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
    fontSize: 26,
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
    backgroundColor: '#FF6F00'
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
    flex: 1, // CRÍTICO: Faz esta área ocupar o espaço restante
    paddingHorizontal: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#d32f2f'
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
