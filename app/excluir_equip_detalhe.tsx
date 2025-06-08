import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper'


export default function ExcluirEquipDetalhe() {

    function formatDate(dateString: string) {
        if (!dateString) return '';
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}, ${hours}:${minutes}`;
    }

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

    const handleDelete = async () => {
        try {
          await api.delete(`/equipment/${equipId}`)
          Alert.alert('Sucesso', 'Equipamento excluído com sucesso!')
          router.push('/home_pages/gerenciar_equip')
        } catch (e) {
          console.log("Erro ao excluir equipamento: " + e)
          Alert.alert('Erro', 'Não foi possível excluir o equipamento.')
          router.push('/home_pages/gerenciar_equip')
        }
      }

    return (
        <View style={styles.container}>
            <View style={[styles.pageTitleBox, { backgroundColor: '#75181D' }]}>
                <Text style={styles.pageTitleLabel}>{equipment?.description}</Text>
            </View>
            <ScrollView style={[styles.consEquipMenu]}>
                <Text style={[localStyles.text, { marginTop: 20 }]}>Descrição: {equipment?.description}</Text>
                <Text style={localStyles.text}>Marca: {equipment?.marca}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={localStyles.text}>Status: </Text>
                    <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>{equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}</Text>
                </View>
                <Text style={localStyles.text}>Data de Registro: {equipment ? formatDate(equipment?.dataEntrada) : ''}</Text>
                <Text style={localStyles.text}>QrCode: {equipment?.qrCodeData}</Text>
            </ScrollView>
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button mode="contained" style={[styles.searchButton,]} onPress={() => router.push('/home_pages/gerenciar_equip')}>
                Cancelar
            </Button>
            <Button mode="contained" style={[styles.searchButton, { marginLeft: 40, backgroundColor: '#75181D' }]} onPress={()=>handleDelete()}>
                Excluir
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
    }
})