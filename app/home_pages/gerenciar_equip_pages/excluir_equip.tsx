import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/auth';
import styles from '../../../components/styles';
import { Button } from 'react-native-paper';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import api from '../../../helpers/axios';
import { EquipmentGet } from '../../../components/interfaces/equipment';
import axios from 'axios';
import EquipmentTable from '../../../components/tabelas/Equipment_table_delete';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function ExcluirEquip() {
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

  const handleQRCodeScanned = (result: BarcodeScanningResult) => {
    if (result.data) {
      setSearchQuery(result.data);
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.pageTitleBox]}>
        <Text style={styles.pageTitleLabel}>Excluir Equipamento</Text>
      </View>

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
            <Ionicons name="qr-code-outline" size={30} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
          Buscar
        </Button>
      </View>

      {isScanning && permission?.granted && (
        <CameraView
          style={{ width: '100%', height: 300 }}
          onBarcodeScanned={handleQRCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
      )}

      <ScrollView horizontal style={[styles.consEquipMenu, { marginBottom: 10 }]}>
        <View style={{ marginBottom: 5 }} />
        <EquipmentTable equipments={filter} />
      </ScrollView>
      <Button mode="contained" style={[styles.searchButton, { width: '100%' }]} onPress={() => router.push('/home_pages/gerenciar_equip')}>
          Voltar
      </Button>
    </View>
  );
}
