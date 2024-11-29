import { View, Text, ScrollView } from 'react-native'
import { useAuth } from '../context/auth'
import styles from '../components/styles'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import ProfileImage from '../components/handle-images/profile-image'

export default function Home() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <ProfileImage/>
        <View>
        <Text style={styles.profileLabel}>{user.name}</Text>
        <Text style={styles.profileLabel}>{user.team}</Text>
        </View>
      </View>
      <ScrollView style={styles.homeMenu}>
        <View style={{ marginBottom: 15 }} />

        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/consultar_equip')}>Consultar Equipamento</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/entrada_saida_equip')}>Registrar Uso de Equipamento</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/selec_equip')}>Gerenciar Equipamentos</Button>
        {/* <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/selec_equip')}>Manutenção</Button> */}
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/relatorio')}>Relatórios</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/camera')}>Camera</Button>
        <Button mode="contained" style={styles.homeButton} onPress={() => router.push('/about')}>Sobre</Button>

      </ScrollView>
    </View>
  )
}