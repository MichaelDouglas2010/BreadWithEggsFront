import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import api from '../helpers/axios'
import { EquipmentGet } from '../components/interfaces/equipment'
import { useLocalSearchParams } from 'expo-router';

export default function ConsultarEquipDetalhe() {

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
    }, [equipId])

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
                    <Text style={[localStyles.value, { color: getStatusColor(equipment?.status), fontWeight: 'bold'}]}>
                        {equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}
                    </Text>
                </View>
                <Text style={localStyles.label}>Data de Registro:</Text>
                <Text style={localStyles.value}>{equipment ? formatDate(equipment?.dataEntrada) : ''}</Text>
                <Text style={localStyles.label}>QrCode:</Text>
                <Text style={localStyles.value}>{equipment?.qrCodeData}</Text>
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
        color: '#222',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#444',
        marginTop: 10,
        fontWeight: '600',
    },
    value: {
        fontSize: 18,
        color: '#111',
        marginBottom: 5,
    },
});