import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import styles from '../../components/styles'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Gerenciar Equipamentos</Text>
      </View>

      {/* Botão para Cadastrar Equipamento */}
      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/home_pages/gerenciar_equip_pages/cadastro_equip')}
      >
        Cadastrar Equipamento
      </Button>

      {/* Botão para Alterar Equipamento */}

      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/home_pages/gerenciar_equip_pages/alterar_equip')}
      >
        Alterar Equipamento
      </Button>

      {/* Botão para Excluir Equipamento */}
      <Button
        mode="contained"
        style={[styles.searchButton, { width: '100%' }]}
        onPress={() => router.push('/home_pages/gerenciar_equip_pages/excluir_equip')}
      >
        Excluir Equipamento
      </Button>
      <Button mode="contained" style={[styles.searchButton, { width: '100%' }]} onPress={() => router.push('/home')}>
          Voltar
        </Button>
    </View>
  )
}
