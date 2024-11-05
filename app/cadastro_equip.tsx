import { useState } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import api from '../helpers/axios'

export default function CadastrarEquip() {
  const { user } = useAuth()
  const [description, setDescription] = useState('') // Descrição do equipamento
  const [brand, setBrand] = useState('') // Marca do equipamento
  const [status, setStatus] = useState('') // Status do equipamento

  const handleRegister = async () => {
    try {
      const response = await api.post('/equipment', {
        description,
        brand,
        status,
      })
      console.log('Equipamento cadastrado com sucesso:', response.data)
      // Limpa os campos após o cadastro
      setDescription('')
      setBrand('')
      setStatus('')
    } catch (e) {
      console.log("Erro ao cadastrar equipamento: " + e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Cadastrar Equipamento</Text>
      </View>

      {/* Formulário de Cadastro */}
      <ScrollView style={[styles.consEquipMenu]}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Descrição</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a descrição do equipamento"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Marca</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira a marca do equipamento"
            value={brand}
            onChangeText={setBrand}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Status</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Insira o status do equipamento"
            value={status}
            onChangeText={setStatus}
          />
        </View>

        {/* Botão de Cadastrar */}
        <Button mode="contained" style={styles.searchButton} onPress={handleRegister}>
          Cadastrar
        </Button>

        <Button mode="contained" style={styles.searchButton} onPress={() => router.push('/selec_equip')}>
          Voltar
        </Button>
      </ScrollView>
    </View>
  )
}
