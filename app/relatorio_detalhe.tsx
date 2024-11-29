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
        return 'green'
      case 'inativo':
        return 'red'
      case 'emprestado':
        return 'yellow'
      default:
        return 'gray'
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
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>{equipment?.description}</Text>
      </View>
      <ScrollView style={[styles.consEquipMenu]}>
        <Text style={[localStyles.text, { marginTop: 20 }]}>
          Descrição: {equipment?.description}
        </Text>
        <Text style={localStyles.text}>Marca: {equipment?.marca}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={localStyles.text}>Status: </Text>
          <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>
            {equipment?.status.charAt(0).toUpperCase()}
            {equipment?.status.slice(1).toLowerCase()}
          </Text>
        </View>
        <Text style={localStyles.text}>
          Data de Registro: {equipment ? formatDate(equipment?.dataEntrada) : ''}
        </Text>
        <Text style={localStyles.text}>QrCode: {equipment?.qrCodeData}</Text>
        <Text style={[localStyles.text,{marginTop:15}]}>Tempo total: {list. reduce((acumulador, valorAtual) => acumulador + valorAtual.totalHours, 0)} horas</Text>
        {list.map((us, index) => (
          <View
            key={index}
            style={{ borderWidth: 1, borderColor: 'white', marginBottom: 5, marginTop: 5 }}
          >
            <Text style={localStyles.text}>Atividade: {us.activity}</Text>
            <Text style={[localStyles.text, { marginTop: 5, fontSize:15 }]}>
              Usuário: {users[index] || 'Carregando...'}
            </Text>
            <Text style={[localStyles.text, {fontSize:15}]}>Horário de Início: {formatDate(us.startTime)}</Text>
            <Text style={[localStyles.text, {fontSize:15}]}>Horário de Devolução: {formatDate(us.endTime)}</Text>
            <Text style={[localStyles.text, {fontSize:15}]}>Tempo: {us.totalHours}h</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button mode="contained" style={[styles.searchButton,]} onPress={() => router.push('/relatorio')}>
          Voltar
        </Button>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
})
