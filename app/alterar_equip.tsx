import { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, Alert } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import api from '../helpers/axios'
import { router } from 'expo-router'

interface Equipment {
  _id: string
  description: string
  brand: string
  status: string
}

export default function AlterarEquip() {
  const { user } = useAuth()
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]) // Lista de equipamentos
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null) // Equipamento selecionado para edição

  // Função para buscar a lista de equipamentos
  const fetchEquipment = async () => {
    try {
      const response = await api.get('/equipment')
      setEquipmentList(response.data)
    } catch (e) {
      console.log("Erro ao buscar equipamentos: " + e)
    }
  }

  // Função para atualizar os dados de um equipamento
  const handleUpdate = async () => {
    if (!selectedEquipment) return

    try {
      await api.put(`/equipment/${selectedEquipment._id}`, {
        description: selectedEquipment.description,
        brand: selectedEquipment.brand,
        status: selectedEquipment.status,
      })
      Alert.alert('Sucesso', 'Equipamento alterado com sucesso!')
      fetchEquipment() // Atualiza a lista de equipamentos
      setSelectedEquipment(null) // Limpa o equipamento selecionado após a atualização
    } catch (e) {
      console.log("Erro ao atualizar equipamento: " + e)
      Alert.alert('Erro', 'Não foi possível alterar o equipamento.')
    }
  }

  // Função para selecionar o equipamento para edição
  const selectEquipmentForEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
  }

  useEffect(() => {
    fetchEquipment() // Carrega a lista ao montar a tela
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Alterar Equipamento</Text>
      </View>

      {/* Lista de Equipamentos */}
      <ScrollView style={[styles.consEquipMenu]}>
        {equipmentList.map((equip) => (
          <View key={equip._id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: 'white' }}>
            <Text style={{ color: 'white' }}>{equip.description} - {equip.brand}</Text>
            <Button mode="contained" color="blue" onPress={() => selectEquipmentForEdit(equip)}>
              Alterar
            </Button>
          </View>
        ))}
      </ScrollView>

      {/* Formulário de Edição */}
      {selectedEquipment && (
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white' }}>Descrição</Text>
          <TextInput
            style={[styles.searchInput, { color: 'white', backgroundColor: '#333' }]}
            value={selectedEquipment.description}
            onChangeText={(text) => setSelectedEquipment({ ...selectedEquipment, description: text })}
          />
          <Text style={{ color: 'white' }}>Marca</Text>
          <TextInput
            style={[styles.searchInput, { color: 'white', backgroundColor: '#333' }]}
            value={selectedEquipment.brand}
            onChangeText={(text) => setSelectedEquipment({ ...selectedEquipment, brand: text })}
          />
          <Text style={{ color: 'white' }}>Status</Text>
          <TextInput
            style={[styles.searchInput, { color: 'white', backgroundColor: '#333' }]}
            value={selectedEquipment.status}
            onChangeText={(text) => setSelectedEquipment({ ...selectedEquipment, status: text })}
          />
          <Button mode="contained" style={styles.searchButton} onPress={handleUpdate}>
            Salvar Alterações
          </Button>
          <Button mode="outlined" style={{ marginTop: 10 }} onPress={() => setSelectedEquipment(null)}>
            Cancelar
          </Button>
        </View>
      )}

      <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/selec_equip')}>
        Voltar
      </Button>
    </View>
  )
}
