import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import styles from '../../components/styles'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: '#fff', padding: 24 }]}>
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerTitle}>Gerenciar Equipamentos</Text>
        <Text style={localStyles.headerSubtitle}>
          Gerencie o cadastro, alteração e exclusão dos equipamentos de forma rápida e segura.
        </Text>
      </View>

      <View style={localStyles.buttonGroup}>
        <Button
          mode="contained"
          style={localStyles.button}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/gerenciar_equip_pages/cadastro_equip')}
          accessibilityLabel="Cadastrar novo equipamento"
        >
          Cadastrar Equipamento
        </Button>

        <Button
          mode="contained"
          style={localStyles.button}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/gerenciar_equip_pages/alterar_equip')}
          accessibilityLabel="Alterar dados de equipamento"
        >
          Alterar Equipamento
        </Button>

        <Button
          mode="contained"
          style={localStyles.button}
          labelStyle={localStyles.buttonLabel}
          onPress={() => router.push('/home_pages/gerenciar_equip_pages/excluir_equip')}
          accessibilityLabel="Excluir equipamento"
        >
          Excluir Equipamento
        </Button>

        <Button
          mode="contained"
          style={[localStyles.button, localStyles.backButton]}
          labelStyle={[localStyles.buttonLabel, { color: '#fff' }]}
          onPress={() => router.push('/home')}
          accessibilityLabel="Voltar para o início"
        >
          Voltar
        </Button>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  headerBox: {
    marginBottom: 32,
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  buttonGroup: {
    width: '100%',
    marginTop: 8,
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 0,
    elevation: 2,
    backgroundColor: '#FF6F00'
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    
  },
  backButton: {
    marginTop: 8,
    backgroundColor: '#FF6F00'
    // mantém o mesmo padrão visual dos outros botões
  },
})
