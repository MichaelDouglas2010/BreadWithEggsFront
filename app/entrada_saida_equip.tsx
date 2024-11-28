import { useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import axios from 'axios'
import EquipmentTable from '../components/tabelas/Equipament_table'
import { router } from 'expo-router'

export default function EntradaSaidaEquip() {

  const [searchQuery, setSearchQuery] = useState('') // Estado para controlar a pesquisa

  const [filter, setFilter] = useState<EquipmentGet[]>([])

  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      let response: { data: EquipmentGet[] }
      if (searchQuery) {
        response = await api.get(`/equipment?search=${searchQuery}`)
        if (response.data.length > 0) {
          setFilter(response.data)
          setErrorMessage('')
        } else {
          setFilter([])
          setErrorMessage('Equipamento inexistente')
        }
      } else {
        response = await api.get('/equipment')
        setFilter(response.data)
        setErrorMessage('')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response)
        setErrorMessage(`Erro: ${error.response.data.message || 'Erro ao buscar equipamentos'}`)
      } else {
        console.error('Erro na busca: ', error)
        setErrorMessage('Erro ao buscar equipamentos')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Entrada e Saída de Equipamentos</Text>
      </View>

      {/* Barra de Pesquisa */}
      <View >
        <Text style={{ fontSize: 16, color: 'white' }}>Descrição</Text>
        <TextInput
        style={styles.searchInput}
        placeholder="Insira a descrição ou ID do equip"
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityLabel="Campo de busca de equipamento"
      />

        <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
          Buscar
        </Button>
      </View>

      <ScrollView horizontal style={[styles.consEquipMenu, {marginBottom:10}]}>
        <View style={{ marginBottom: 5}} />
            <EquipmentTable equipments={filter}/>
      </ScrollView>
      <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/home')}>
        Voltar
      </Button>
    </View>
  )
}

