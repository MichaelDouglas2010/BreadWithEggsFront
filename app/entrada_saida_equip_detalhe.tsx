import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { router, useLocalSearchParams } from 'expo-router'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/auth'
import { UsageRecordGet } from '../components/interfaces/usage-record'
import { TextInputMask } from 'react-native-masked-text';

export default function EntradaSaidaEquipDetalhe() {
  const { user } = useAuth()
  const [equipment, setEquipment] = useState<EquipmentGet>()
  const [usage, setUsage] = useState<UsageRecordGet>()
  const [activity, setActivity] = useState<string>('')
  const [timeIn, setTimeIn] = useState<string[]>([''])
  const [timeOut, setTimeOut] = useState<string[]>([''])
  const { equipId } = useLocalSearchParams()

  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)

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
    api.get('/equipment/' + equipId).then((response) => {
      setEquipment(response.data)
    })
  }, [])

  const handleDateInChange = async (index: number, text: string) => {
    const updatedDate = [...timeIn]
    updatedDate[index] = text
    setTimeIn(updatedDate)
  }

  const handleDateOutChange = async (index: number, text: string) => {
    const updatedDate = [...timeOut]
    updatedDate[index] = text
    setTimeOut(updatedDate)
  }

  const handleCreate = async () => {
    if (!equipment) return

    try {
      const date1 = new Date(`${timeIn[0]}T${timeIn[1]}`)
      const date2 = new Date(`${timeOut[0]}T${timeOut[1]}`)
      if (isNaN(date1.getTime()) || isNaN(date2.getTime())) { Alert.alert('Erro', 'Data ou horário não reconhecidos') }
      else if(date1.getTime() > date2.getTime()){Alert.alert('Erro', 'Data de retirada mais recente que data de devolução!')}
      else if(activity == ''){Alert.alert('Erro', 'Descreva a atividade!')}
      else {
        await api.post(`/usage/`, {
          equipmentId: equipment._id.toString(),
          userId: user._id,
          activity: activity,
          startTime: date1,
          endTime: date2,
          totalHours: ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60)).toFixed(1)
        })
        Alert.alert('Sucesso', 'Registro criado com sucesso!')
        router.push('/entrada_saida_equip')
      }
    } catch (e) {
      console.log("Erro ao atualizar equipamento: " + e)
      Alert.alert('Erro', 'Não foi possível alterar o equipamento.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pageTitleBox}>
        <Text style={styles.pageTitleLabel}>Registrar Uso</Text>
      </View>
      <ScrollView style={[styles.consEquipMenu, { marginBottom: 10 }]}>
        <Text style={[localStyles.text, { marginTop: 20 }]}>Descrição: {equipment?.description}</Text>
        <Text style={localStyles.text}>Marca: {equipment?.marca}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={localStyles.text}>Status: </Text>
          <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>
            {equipment?.status.charAt(0).toUpperCase()}
            {equipment?.status.slice(1).toLowerCase()}
          </Text>
        </View>

        <View style={styles.pageContextBox}>
          <Text style={[localStyles.text, { fontSize: 10 }]}>Funcionário: {user?.name}</Text>
          <Text style={[localStyles.text, { fontSize: 10 }]}>Setor: {user?.team}</Text>
        </View>

        <View>
          <Text style={{ color: 'white' }}>Atividade:</Text>
          <TextInput
            style={styles.searchInput}
            placeholder='Descreva a atividade realizada'
            onChangeText={(text) => setActivity(text)}
          />
          <Text style={{ color: 'white' }}>Data de Retirada:</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'YYYY-MM-DD',
            }}
            value={timeIn[0]}
            onChangeText={(text) => handleDateInChange(0, text)}
            placeholder="YYYY-MM-DD"
            style={styles.searchInput}
            keyboardType="numeric"
          />
          <Text style={{ color: 'white' }}>Horário de Retirada:</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:MM:SS',
            }}
            value={timeIn[1]}
            onChangeText={(text) => handleDateInChange(1, text)}
            placeholder="HH:MM:SS"
            style={styles.searchInput}
            keyboardType="numeric"
          />

          <Text style={{ color: 'white' }}>Data de Devolução:</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'YYYY-MM-DD',
            }}
            value={timeOut[0]}
            onChangeText={(text) => handleDateOutChange(0, text)}
            placeholder="YYYY-MM-DD"
            style={styles.searchInput}
            keyboardType="numeric"
          />
          <Text style={{ color: 'white' }}>Horário de Devolução:</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:MM:SS',
            }}
            value={timeOut[1]}
            onChangeText={(text) => handleDateOutChange(1, text)}
            placeholder="HH:MM:SS"
            style={styles.searchInput}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button mode="contained" style={[styles.searchButton,]} onPress={() => router.push('/entrada_saida_equip')}>
          Voltar
        </Button>
        <Button mode="contained" style={[styles.searchButton, { marginLeft: 40 }]} onPress={handleCreate}>
          Registrar
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

// Estilo personalizado para o Picker
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // To ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
})
