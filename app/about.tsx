import { View, Text, ScrollView } from 'react-native'
import styles from '../components/styles'
import api from '../helpers/axios'
import { useEffect, useState } from 'react'
import Logo from '../components/handle-images/logo'

export default function About() {

    interface IAbout {
        id: number
        line: string
    }

    const [about, setAbout] = useState<IAbout[]>([])

    function atualizar() {
        const fetchEquipment = async () => {
            try {
                const response = await api.get('/about')
                setAbout(response.data)
            }
            catch (e) {
                console.log("Erro: " + e)
            }
        }

        fetchEquipment()
    }
    useEffect(() => {
        atualizar()
    }, []);

    return (
        <View style={styles.container}>
            <Logo />
            <ScrollView style={[styles.homeMenu, {marginBottom: 50}]}>
                <View style={{ marginBottom: 15, marginLeft: 5, padding: 5 }}>
                {about.map((ab) => (
                    <Text key={ab.id} style={{ fontSize: 20, color: 'white' }}>
                        {ab.line ? ab.line : '\u200B'}
                    </Text>
                ))}
                </View>
            </ScrollView>
        </View>
    )
}