import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
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

export default function ExcluirEquip() {
  const { user } = useAuth()
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]) // Lista de equipamentos

  // Função para buscar a lista de equipamentos
  const fetchEquipment = async () => {
    try {
      const response = await api.get('/equipment')
      setEquipmentList(response.data)
    } catch (e) {
      console.log("Erro ao buscar equipamentos: " + e)
    }
  }

  // Função para excluir um equipamento por ID
  const handleDelete = async (equipmentId: string) => {
    try {
      await api.delete(`/equipment/${equipmentId}`)
      Alert.alert('Sucesso', 'Equipamento excluído com sucesso!')
      // Atualiza a lista após a exclusão
      setEquipmentList(equipmentList.filter(equip => equip._id !== equipmentId))
    } catch (e) {
      console.log("Erro ao excluir equipamento: " + e)
      Alert.alert('Erro', 'Não foi possível excluir o equipamento.')
    }
  }

  useEffect(() => {
    fetchEquipment() // Carrega a lista ao montar a tela
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Excluir Equipamento</Text>
      </View>

      {/* Lista de Equipamentos */}
      <ScrollView style={[styles.consEquipMenu]}>
        {equipmentList.map((equip) => (
          <View key={equip._id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: 'white' }}>
            <Text style={{ color: 'white' }}>{equip.description} - {equip.brand}</Text>
            <Button mode="contained" color="red" onPress={() => handleDelete(equip._id)}>
              Excluir
            </Button>
          </View>
        ))}
      </ScrollView>

      <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/selec_equip')}>
        Voltar
      </Button>
    </View>
  )
}
