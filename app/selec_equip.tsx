import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import styles from '../components/styles'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={[styles.pageTitleLabel, { fontSize: 24, marginBottom: 20, textAlign: 'center' }]}>
        Gerenciar Equipamentos
      </Text>

      {/* Botão para Cadastrar Equipamento */}
      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/cadastro_equip')}
      >
        Inserir Equipamento
      </Button>

      {/* Botão para Alterar Equipamento */}

      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/alterar_equip')}
      >
        Alterar Equipamento
      </Button>

      {/* Botão para Excluir Equipamento */}
      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/excluir_equip')}
      >
        Excluir Equipamento
      </Button>

      <Button mode="contained" style={[styles.searchButton, { width: '100%' }]} onPress={() => router.push('/home')}>
          Voltar
        </Button>
    </View>
  )
}
