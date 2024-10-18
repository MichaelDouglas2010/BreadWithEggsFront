import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import ProfileImage from '../components/handle-images/profile-image'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'

export default function ConsultarEquip() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('') // Estado para controlar a pesquisa

  const [equipment, setEquipment] = useState<EquipmentGet[]>([])
  const [filter, setFilter] = useState<EquipmentGet[]>([])

  function atualizar() {
    const fetchEquipment = async () => {
      try {
        const response = await api.get('/equipment')
        setEquipment(response.data)
        setFilter(response.data)
      }
      catch (e) {
        console.log("Erro: " + e)
      }
    }

    fetchEquipment()
  }
  useEffect(() => {
    atualizar()
  }, []);


  const handleSearch = () => {
    // Lógica de busca de equipamentos aqui
    console.log('Buscar por:', searchQuery)
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Consultar Equipamento</Text>
      </View>

      {/* Barra de Pesquisa */}
      <View >
        <Text style={{fontSize: 16, color: 'white'}}>Descrição</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Insira a descrição do equipamento"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {/* Botão Buscar */}
        <Button mode="contained" style={styles.searchButton} onPress={handleSearch}>
          Buscar
        </Button>
      </View>

      <ScrollView style={[styles.consEquipMenu]}>
        <View style={{ marginBottom: 5}} />
        {filter.map((equip) => (
          <Button key={equip._id.toString()} mode="contained" style={[styles.homeButton, {}]} onPress={() => console.log(`Apertou ${equip.description}`)}>
            {equip.description} - {equip.marca} - {equip.status}
          </Button>
        ))}
        {/* Botões ou outros conteúdos */}
      </ScrollView>
    </View>
  )
}

