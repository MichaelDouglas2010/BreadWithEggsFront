import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import api from '../helpers/axios'
import { Equipment } from '../components/interfaces/equipment'
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

    const [equipment, setEquipment] = useState<Equipment>()
    const { id } = useLocalSearchParams() // <-- use 'id' e não 'equipId'

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
        api.get('/equipment/' + id)
            .then((response) => {
                setEquipment(response.data)
            })
    }, [id])

    const handleDelete = async () => {
        Alert.alert(
          'Confirmar Exclusão',
          'Tem certeza que deseja excluir este equipamento?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Excluir',
              style: 'destructive',
              onPress: async () => {
                try {
                  await api.delete(`/equipment/${id}`) // <-- use 'id'
                  Alert.alert('Sucesso', 'Equipamento excluído com sucesso!')
                  router.push('/home_pages/gerenciar_equip')
                } catch (e) {
                  Alert.alert('Erro', 'Não foi possível excluir o equipamento.')
                  router.push('/home_pages/gerenciar_equip')
                }
              }
            }
          ]
        );
      }

    return (
        <View style={localStyles.container}>
            <View style={localStyles.card}>
                <Text style={localStyles.title}>{equipment?.description}</Text>
                <Text style={localStyles.label}>Descrição:</Text>
                <Text style={localStyles.value}>{equipment?.description}</Text>
                <Text style={localStyles.label}>Marca:</Text>
                <Text style={localStyles.value}>{equipment?.marca}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={localStyles.label}>Status: </Text>
                    <Text style={[localStyles.value, { color: getStatusColor(equipment?.status), fontWeight: 'bold' }]}>
                      {equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}
                    </Text>
                </View>
                <Text style={localStyles.label}>Data de Registro:</Text>
                <Text style={localStyles.value}>{equipment ? formatDate(equipment?.dataEntrada) : ''}</Text>
                <Text style={localStyles.label}>QrCode:</Text>
                <Text style={localStyles.value}>{equipment?.qrCodeData}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <Button
                    mode="contained"
                    style={[localStyles.button, { backgroundColor: '#ccc' }]}
                    labelStyle={{ color: '#222' }}
                    onPress={() => router.push('/home_pages/gerenciar_equip')}
                >
                    Cancelar
                </Button>
                <Button
                    mode="contained"
                    style={[localStyles.button, { backgroundColor: '#007B83' }]}
                    labelStyle={{ color: '#fff' }}
                    onPress={handleDelete}
                >
                    Excluir
                </Button>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111', 
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#111', // preto
        marginTop: 10,
        fontWeight: '600',
    },
    value: {
        fontSize: 18,
        color: '#111', // preto
        marginBottom: 5,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        paddingVertical: 8,
    },
})