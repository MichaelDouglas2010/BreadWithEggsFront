import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import styles from '../components/styles'
import RNPickerSelect from 'react-native-picker-select'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from 'react-native-paper'


export default function AlterarEquipDetalhe() {
  const [equipment, setEquipment] = useState<EquipmentGet>()
  const [isLoading, setIsLoading] = useState(false)
  const { equipId } = useLocalSearchParams()

  useEffect(() => {
    setIsLoading(true)
    api.get('/equipment/' + equipId)
      .then((response) => setEquipment(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar o equipamento.'))
      .finally(() => setIsLoading(false))
  }, [equipId])

  const handleUpdate = async () => {
    if (!equipment) return
    setIsLoading(true)
    try {
      await api.put(`/equipment/${equipment._id}`, {
        description: equipment.description,
        marca: equipment.marca,
        status: equipment.status,
        dataEntrada: equipment.dataEntrada,
        qrCodeData: equipment.qrCodeData
      })
      Alert.alert('Sucesso', 'Equipamento alterado com sucesso!')
      router.push('/home_pages/gerenciar_equip')
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível alterar o equipamento.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={localStyles.container}>
      <View style={localStyles.card}>
        <Text style={localStyles.title}>Alterar Equipamento</Text>
        {!equipment || isLoading ? (
          <ActivityIndicator size="large" color="#C1B851" style={{ marginTop: 40 }} />
        ) : (
          <>
            <Text style={localStyles.label}>ID (não editável)</Text>
            <TextInput
              style={[localStyles.input, { backgroundColor: '#e0e0e0', color: '#888' }]}
              value={equipment._id?.toString() || ''}
              editable={false}
              selectTextOnFocus={false}
            />
            <Text style={localStyles.label}>QRCode (não editável)</Text>
            <TextInput
              style={[localStyles.input, { backgroundColor: '#e0e0e0', color: '#888' }]}
              value={equipment.qrCodeData || ''}
              editable={false}
              selectTextOnFocus={false}
            />
            <Text style={localStyles.label}>Descrição</Text>
            <TextInput
              style={localStyles.input}
              placeholder="Insira a descrição do equipamento"
              placeholderTextColor="#CCCCCC"
              value={equipment.description || ''}
              onChangeText={text => setEquipment({ ...equipment, description: text })}
              accessibilityLabel="Campo de descrição do equipamento"
            />
            <Text style={localStyles.label}>Marca</Text>
            <TextInput
              style={localStyles.input}
              placeholder="Insira a marca do equipamento"
              placeholderTextColor="#CCCCCC"
              value={equipment.marca || ''}
              onChangeText={text => setEquipment({ ...equipment, marca: text })}
              accessibilityLabel="Campo de marca do equipamento"
            />
            <Text style={localStyles.label}>Data de Entrada (não editável)</Text>
            <TextInput
              style={[localStyles.input, { backgroundColor: '#e0e0e0', color: '#888' }]}
              value={equipment.dataEntrada || ''}
              editable={false}
              selectTextOnFocus={false}
              accessibilityLabel="Campo de data de entrada do equipamento"
            />
            <Text style={localStyles.label}>Status</Text>
            <RNPickerSelect
              onValueChange={value => setEquipment({ ...equipment, status: value })}
              items={[
                { label: 'Ativo', value: 'ativo' },
                { label: 'Inativo', value: 'inativo' },
                { label: 'Emprestado', value: 'emprestado' },
                { label: 'Em Manutenção', value: 'em manutenção' },
              ]}
              value={equipment.status || ''}
              style={pickerSelectStyles}
              placeholder={{ label: 'Selecione um status', value: null }}
              useNativeAndroidPickerStyle={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
              <Button
                mode="contained"
                style={[localStyles.button, { backgroundColor: '#ccc' }]}
                labelStyle={{ color: '#222' }}
                onPress={() => router.push('/home_pages/gerenciar_equip')}
                disabled={isLoading}
              >
                Voltar
              </Button>
              <Button
                mode="contained"
                style={[localStyles.button, { backgroundColor: '#007B83' }]}
                labelStyle={{ color: '#222' }}
                onPress={handleUpdate}
                loading={isLoading}
                disabled={isLoading}
              >
                Alterar
              </Button>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    color: '#111',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 8,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    width: "100%",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    fontSize: 18,
    marginBottom: 10,
    color: "#111",
  },
  inputAndroid: {
    height: 60,
    width: "100%",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    fontSize: 18,
    marginBottom: 10,
    color: "#111",
  },
});