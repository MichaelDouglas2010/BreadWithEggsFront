import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from 'react-native-paper'


export default function ConsultarEquipDetalhe() {

    const [equipment, setEquipment] = useState<EquipmentGet>()
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
    }, [])

    // Função para atualizar os dados de um equipamento
    const handleUpdate = async () => {
        if (!equipment) return

        try {
            await api.put(`/equipment/${equipment._id}`, {
                description: equipment.description,
                marca: equipment.marca,
                status: equipment.status,
            })
            Alert.alert('Sucesso', 'Equipamento alterado com sucesso!')
            router.push('/alterar_equip')
        } catch (e) {
            console.log("Erro ao atualizar equipamento: " + e)
            Alert.alert('Erro', 'Não foi possível alterar o equipamento.')
        }
    }

    useEffect(() => {
        api.get('/equipment/' + equipId)
            .then((response) => {
                setEquipment(response.data)
            })
    }, [])

    return (
        <View style={styles.container}>
            {equipment && (
                <View>
                    <View style={[styles.pageTitleBox, {backgroundColor:'#C1B851'}]}>
                        <Text style={styles.pageTitleLabel}>{equipment?.description}</Text>
                    </View>
                    <ScrollView style={[styles.consEquipMenu, { marginBottom: 10 }]}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ color: 'white' }}>Descrição</Text>
                            <TextInput
                                style={styles.searchInput}
                                value={equipment?.description}
                                onChangeText={(text) => setEquipment({ ...equipment, description: text })}
                            />
                            <Text style={{ color: 'white' }}>Marca</Text>
                            <TextInput
                                style={styles.searchInput}
                                value={equipment?.marca}
                                onChangeText={(text) => setEquipment({ ...equipment, marca: text })}
                            />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={localStyles.text}>Status: </Text>
                                <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>{equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Button mode="contained" style={[styles.searchButton,]} onPress={() => router.push('/alterar_equip')}>
                            Cancelar
                        </Button>
                        <Button mode="contained" style={[styles.searchButton, { marginLeft: 40, backgroundColor: '#C1B851' }]} onPress={handleUpdate}>
                            Alterar
                        </Button>

                    </View>
                </View>
            )}
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