import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de ter instalado o pacote correto
import styles from '../components/styles';
import api from '../helpers/axios';
import { EquipmentGet, EquipmentPut } from '../components/interfaces/equipment'; // Importando ambos os tipos
import { useLocalSearchParams } from 'expo-router';

export default function ConsultarEquipUpdate() {
    const [equipment, setEquipment] = useState<EquipmentGet>();
    const { equipId } = useLocalSearchParams();
    const [selectedStatus, setSelectedStatus] = useState<string>(''); // Estado para o status selecionado

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
                setEquipment(response.data);
                setSelectedStatus(response.data.status); // Define o status inicial da lista suspensa
            });
    }, []);

    const updateEquipmentStatus = () => {
        const equipmentUpdate: EquipmentPut = { status: selectedStatus }; // Criando um objeto apenas com o status

        api.put(`/equipment/${equipId}`, equipmentUpdate) // Fazendo a requisição para atualizar
            .then(response => {
                console.log("Status atualizado com sucesso:", response.data);
                // Atualizando o estado do equipamento mantendo os outros atributos
                setEquipment(prev => {
                    if (prev) { // Verifica se 'prev' não é undefined
                        return {
                            ...prev, // Mantém todas as propriedades anteriores
                            status: selectedStatus, // Atualiza apenas a propriedade status
                        };
                    }
                    return prev; // Retorna 'prev' se for undefined
                });
            })
            .catch(error => {
                console.error("Erro ao atualizar o status:", error);
            });
    };

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
                    <Text style={[localStyles.text, { color: getStatusColor(equipment?.status) }]}>
                        {equipment?.status.charAt(0).toUpperCase()}{equipment?.status.slice(1).toLowerCase()}
                    </Text>
                </View>
                <Text style={localStyles.text}>Data de Registro: {equipment?.dataEntrada}</Text>
                <Text style={localStyles.text}>QrCode: {equipment?.qrCodeData}</Text>
                
                {/* Lista suspensa para alterar o status */}
                <View style={{ marginVertical: 20 }}>
                    <Text style={localStyles.text}>Alterar Status:</Text>
                    <Picker
                        selectedValue={selectedStatus}
                        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                        style={{ height: 50, width: '100%', backgroundColor: 'white' }} // Estilo do Picker
                    >
                        <Picker.Item label="Ativo" value="ativo" />
                        <Picker.Item label="Inativo" value="inativo" />
                        <Picker.Item label="Emprestado" value="emprestado" />
                    </Picker>
                </View>

                {/* Botão para salvar as alterações */}
                <Button title="Salvar Alterações" onPress={updateEquipmentStatus} color="#104861" />
            </ScrollView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white',
        marginBottom: 5,
    }
});
