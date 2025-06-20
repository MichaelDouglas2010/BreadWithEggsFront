import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../components/styles';
import api from '../../helpers/axios';
import { EquipmentGet } from '../../components/interfaces/equipment';
import axios from 'axios';
import EquipmentTable from '../../components/tabelas/Equipament_registro';
import { router } from 'expo-router';
import QRCodeScanner from '../../components/sensor/QRCodeScanner';

export default function EntradaSaidaEquip() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filter, setFilter] = useState<EquipmentGet[]>([]);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isScanning, setIsScanning] = useState(false); 
  const [permission, requestPermission] = useCameraPermissions(); 

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

  const handleQRCodeScanned = (result: { data: string }) => {
    if (result.data) {
      setSearchQuery(result.data);
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Registrar Uso dos Equipamentos</Text>
      </View>

      {/* Barra de Pesquisa */}
      <View>
        <Text style={{ fontSize: 16, color: 'white' }}>Descrição</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.searchInput, { flex: 1 }]}
            placeholder="Insira a descrição ou ID do equip"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Campo de busca de equipamento"
          />
          <TouchableOpacity onPress={() => setIsScanning(true)}>
            <Ionicons name="qr-code-outline" size={30} color="#FF6F00" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
          Buscar
        </Button>
      </View>

      {/* Leitor de QR Code */}
      {isScanning && permission?.granted && (
        <View style={{ marginTop: 20 }}>
          <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />
          <Button
            mode="contained" 
            style={[styles.searchButton, { marginTop: 10 }]} 
            onPress={() => setIsScanning(false)}
          >
            Fechar
          </Button>
        </View>
      )}

      {/* Mensagem de erro */}
      {errorMessage ? (
        <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>{errorMessage}</Text>
      ) : null}

      {/* Lista de equipamentos */}
      <ScrollView horizontal style={[styles.consEquipMenu, { marginBottom: 10 }]}>
        <View style={{ marginBottom: 5 }} />
        <EquipmentTable equipments={filter} />
      </ScrollView>

      <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/home')}>
        Voltar
      </Button>
    </View>
  );
}