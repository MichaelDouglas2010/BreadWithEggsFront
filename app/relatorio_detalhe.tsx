import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { router, useLocalSearchParams } from 'expo-router'
import { UsageRecordGet } from '../components/interfaces/usage-record'
import { Button } from 'react-native-paper'

export default function RelatorioDetalhe() {
  function formatDate(dateString: string) {
    if (!dateString) return ''
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}, ${hours}:${minutes}`
  }

  const [equipment, setEquipment] = useState<EquipmentGet>()
  const [users, setUsers] = useState<string[]>([])
  const [list, setList] = useState<UsageRecordGet[]>([])
  const { equipId } = useLocalSearchParams()

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ativo':
        return '#388e3c'
      case 'inativo':
        return '#d32f2f'
      case 'emprestado':
        return '#fbc02d'
      default:
        return '#757575'
    }
  }

  useEffect(() => {
    api.get('/equipment/' + equipId)
      .then((response) => {
        setEquipment(response.data)
      })

    api.get('/usage/all/' + equipId)
      .then((response) => {
        setList(response.data)
      })
  }, [])

  useEffect(() => {
    if (list.length > 0) {
      const userPromises = list.map((fa) =>
        api.get('/user/' + fa.userId).then((response) => response.data.name)
      )

      Promise.all(userPromises).then((userNames) => {
        setUsers(userNames)
      })
    }
  }, [list])

  return (
    <View style={localStyles.container}>
      <View style={localStyles.headerBox}>
        <Text style={localStyles.headerTitle}>{equipment?.description}</Text>
      </View>
      <ScrollView style={localStyles.scrollArea} contentContainerStyle={{ padding: 16 }}>
        <View style={localStyles.infoCard}>
          <Text style={localStyles.label}>Descrição:</Text>
          <Text style={localStyles.value}>{equipment?.description}</Text>
          <Text style={localStyles.label}>Marca:</Text>
          <Text style={localStyles.value}>{equipment?.marca}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={localStyles.label}>Status: </Text>
            <Text style={[localStyles.value, { color: getStatusColor(equipment?.status), fontWeight: 'bold' }]}>
              {equipment?.status?.charAt(0).toUpperCase()}
              {equipment?.status?.slice(1).toLowerCase()}
            </Text>
          </View>
          <Text style={localStyles.label}>Data de Registro:</Text>
          <Text style={localStyles.value}>{equipment ? formatDate(equipment?.dataEntrada) : ''}</Text>
          <Text style={localStyles.label}>QrCode:</Text>
          <Text style={localStyles.value}>{equipment?.qrCodeData}</Text>
            <Text style={[localStyles.label, { marginTop: 15 }]}>
            Tempo total: <Text style={localStyles.value}>{list.reduce((acumulador, valorAtual) => acumulador + valorAtual.totalHours, 0).toFixed(2)} horas</Text>
            </Text>
        </View>
        <Text style={[localStyles.sectionTitle, { marginTop: 24 }]}>Histórico de Uso</Text>
        {list.map((us, index) => (
          <View
            key={index}
            style={localStyles.usageCard}
          >
            <Text style={localStyles.usageLabel}>Atividade: <Text style={localStyles.usageValue}>{us.activity}</Text></Text>
            <Text style={localStyles.usageLabel}>Usuário: <Text style={localStyles.usageValue}>{users[index] || 'Não definido'}</Text></Text>
            <Text style={localStyles.usageLabel}>Horário de Início: <Text style={localStyles.usageValue}>{formatDate(us.startTime) }</Text></Text>
            <Text style={localStyles.usageLabel}>Horário de Devolução: <Text style={localStyles.usageValue}>{formatDate(us.endTime)}</Text></Text>
            <Text style={localStyles.usageLabel}>Tempo: <Text style={localStyles.usageValue}>{us.totalHours.toFixed(2)}h</Text></Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16 }}>
        <Button
          mode="contained"
          style={styles.searchButton}
          onPress={() => router.push('/home_pages/relatorio')}
        >
          Voltar
        </Button>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerBox: {
    backgroundColor: '#E3EAF2',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#111',
    marginBottom: 8,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 2,
  },
  usageCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  usageLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  usageValue: {
    fontWeight: '400',
    color: '#111',
  },
  backButton: {
    backgroundColor: '#007B83',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 6,
    alignSelf: 'center',
    elevation: 2,
  },
})