import { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import ProfileImage from '../components/handle-images/profile-image'

export default function Home() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('') // Estado para controlar a pesquisa

  const handleSearch = () => {
    // Lógica de busca de equipamentos aqui
    console.log('Buscar por:', searchQuery)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <ProfileImage />
        <View>
          <Text style={styles.profileLabel}>{user.name}</Text>
          <Text style={styles.profileLabel}>{user.team}</Text>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
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

      <View style={styles.homeMenu}>
        <View style={{ marginBottom: 15 }} />

        {/* Botões ou outros conteúdos */}
      </View>
    </View>
  )
}

