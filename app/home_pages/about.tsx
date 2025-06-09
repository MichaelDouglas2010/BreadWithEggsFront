import { View, Text, ScrollView } from 'react-native'
import styles from '../../components/styles'
import api from '../../helpers/axios'
import { useEffect, useState } from 'react'
import Logo from '../../components/handle-images/logo'

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
            <ScrollView style={[styles.homeMenu, { marginBottom: 50 }]}>
                <View style={{ marginBottom: 15, marginLeft: 5, padding: 5 }}>
                    {/* Texto institucional do projeto */}
                    <Text style={{ fontSize: 22, color: '#FFD700', fontWeight: 'bold', marginBottom: 10 }}>
                        Sobre o Projeto
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: 'black',
                            marginBottom: 15,
                            fontWeight: 'bold',
                            textAlign: 'left',
                        }}
                    >
                        • Aplicativo: Gestão de Ferramentas{'\n'}
                        • Desenvolvedores: Michael Douglas e Diego Cruz{'\n'}
                        • Objetivo: Facilitar e otimizar o dia a dia na obra{'\n'}
                        • Foco: Organização, controle e praticidade para equipes de construção civil{'\n'}
                        • Benefício: Gestão de equipamentos eficiente e segura
                    </Text>
                    <Text style={{ fontSize: 40, textAlign: 'center', marginBottom: 10 }}>🛠️🚧</Text>
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