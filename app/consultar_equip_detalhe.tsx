import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { useLocalSearchParams } from 'expo-router';


export default function ConsultarEquipDetalhe() {

    const [equipment, setEquipment] = useState<EquipmentGet>()
    const { equipId } = useLocalSearchParams()
    const getStatusColor = (status?: string) => {
        switch (status) {
          case 'ativo':
            return 'green';
          case 'inativo':
            return 'red';
          case 'emprestado':
            return 'yellow';
          default:
            return 'gray';
        }
      };

    useEffect(() => {
        api.get('/equipment/' + equipId)
            .then((response) => {
                setEquipment(response.data)
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.pageTitleBox}>
                <Text style={styles.pageTitleLabel}>{equipment?.description}</Text>
            </View>
            <ScrollView style={[styles.consEquipMenu]}>
                <Text style={[localStyles.text, { marginTop: 20 }]}>Descrição: {equipment?.description}</Text>
                <Text style={localStyles.text}>Marca: {equipment?.marca}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={localStyles.text}>Status: </Text>
                    <Text style={[localStyles.text, {color: getStatusColor(equipment?.status)}]}>{equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}</Text>
                </View>
                <Text style={localStyles.text}>Data de Registro: {equipment?.dataEntrada}</Text>
                <Text style={localStyles.text}>QrCode: {equipment?.qrCodeData}</Text>
            </ScrollView>
        </View>
    )
}

const localStyles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white',
        marginBottom: 5,
    }
})